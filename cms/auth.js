const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pug = require('pug');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

module.exports = function(app) {

    app.set('view engine', 'pug');

    mongoose.connect(process.env.DB, { useNewUrlParser: true });

    const user = new Schema ({
        username: { type: String, required: true }, 
        password: { type: String, required: true }
    }, { collection: 'users' });

    const User = mongoose.model('User', user);

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, data) => {
            if(err)
                console.log(err);
            done(null, data);
        });
    });

    passport.use(new LocalStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            console.log('User '+ username +' attempted to log in.');
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
            if (!bcrypt.compareSync(password, user.password)) { return done(null, false, { message: 'Incorrect password.' }); }
            return done(null, user);
        });
    }));

    //Create New User
    app.route('/api/cms/newuser')
        .get((req,res) => {
            let html = pug.renderFile('./cms/newuser.pug', { message: req.flash('message') });
            res.send(html);
        })
        .post((req, res) => {
            User.findOne({ username: req.body.username}, (err, user) => {
                if (err) {
                    next(err);
                } else if (user) {
                    req.flash('message', 'Username already in use.');
                    res.redirect('/api/cms/newuser');
                } else {
                    let hash = bcrypt.hashSync(req.body.password, 12);
                    let newUserEntry = new User({
                        username: req.body.username, 
                        password: hash,
                    });
                          
                    newUserEntry.save((err, data) => {
                        if (err)
                            console.log(err);
                        res.send(data);
                    });
                }
            });
        })
    
    //Login
    app.route('/api/cms/login')
        .get((req,res) => {
            let html = pug.renderFile('./cms/login.pug', { message: req.flash('error') }); 
            res.send(html);
        })
        .post(passport.authenticate('local', { successRedirect: '/api/cms/tlentries', failureRedirect:'/api/cms/login', failureFlash: true }));

    //Logout
    app.route('/logout')
        .get((req, res) => {
            req.logout();
            req.flash('error', 'You\'ve been logged out');
            res.redirect('/api/cms/login');
    });
}