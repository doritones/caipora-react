const pug = require('pug');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CONNECTION_STRING = process.env.DB;

module.exports = function(app) {

    app.set('view engine', 'pug');

    let ensureAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/api/cms/login');
    };

    mongoose.connect(process.env.DB, { useNewUrlParser: true });
  
    const newTL = new Schema ({
        date_of_the_news: { type: String, required: true }, 
        text_of_timeline: { type: String, required: true },
        source: { type: String, required: true },
        link_news: { type: String, required: true },
        tags: { type: String, required: true },
        author: { type: String, required: true },
        created_on: { type: Date, default: Date.now }, 
        updated_on: { type: Date, default: Date.now }, 
    }, { collection: 'timeline' });

    const TLEntry = mongoose.model('TLEntry', newTL);

    const newTag = new Schema ({
        tags: [String]
    }, { collection: 'specs' });

    const TagEntry = mongoose.model('TagEntry', newTag);

    //Timeline listing
    app.route('/api/cms/tlentries')
        .get(ensureAuthenticated, (req,res) => {
            TLEntry.find().lean()
                .then(data => {
                    let tlData = [];
                    data.map(dt =>{
                        let tlItem = {
                            id: dt._id,
                            date: dt.date_of_the_news,
                            text: dt.text_of_timeline.slice(0, 60) + '...',
                            source: dt.source
                        }
                        tlData.push(tlItem);
                    })
                    let html = pug.renderFile('./cms/tlentries.pug', { username: req.user.username, data: tlData });
                    res.send(html);
                })
                .catch(err => console.log(err));
    })

    //Timeline edit
    app.route('/api/cms/tledit/:id')
        .get(ensureAuthenticated, (req, res) => {
            TLEntry.findById(req.params.id, (err,data) => {
                if (err) {
                    console.log(err);
                }
                console.log(data);
                let html = pug.renderFile('./cms/tledit.pug', { username: req.user.username, data: data });
                res.send(html);
            })
        })

    //New timeline entry
    app.route('/api/cms/newtlentry')
        .get(ensureAuthenticated, (req,res) => {
            let html = pug.renderFile('./cms/newtlentry.pug', { username: req.user.username });
            res.send(html);
        })
        .post((req, res) => {
            
            let newTLEntry = new TLEntry({
                date_of_the_news: req.body.date_of_the_news, 
                text_of_timeline: req.body.text_of_timeline,
                source: req.body.source,
                link_news: req.body.link_news,
                tags: req.body.tags,
                author: req.body.author
            });
                  
            newTLEntry.save((err, data) => {
                if (err)
                    console.log(err);
                res.send(data);
            });
        });
    
    //New timeline entry
    app.route('/api/cms/newtag')
        .get(ensureAuthenticated, (req,res) => {
            TagEntry.find().lean()
            .then(data => {
                let html = pug.renderFile('./cms/newtag.pug', { username: req.user.username, tags: data[0].tags, message: req.flash('message') });
                res.send(html);
            })
            .catch(err => console.log(err));
        })
        .post((req, res) => {
            TagEntry.findById('5cffe58afb6fc00e79a791ca' , (err, data) => {
                if (err) {
                    console.log(err);
                }
                data.tags.push(req.body.new_tag);
                data.save((err, data) => {
                    if (err) {
                        console.log(err);
                    }
                    req.flash('message', 'Tag successfully added.');
                    res.redirect('/api/cms/newtag');   
                });            
            });
        });

};