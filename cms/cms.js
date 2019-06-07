const pug = require('pug');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CONNECTION_STRING = process.env.DB;

module.exports = function(app) {

    app.set('view engine', 'pug');

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
    });

    app.route('/api/cms/newtlentry')
        .get((req,res) => {
            var html = pug.renderFile('./cms/newtlentry.pug');
            res.send(html);
        })
        .post((req, res) => {
            const TLEntry = mongoose.model('TLEntry', newTL, 'timeline');
            
            var newTLEntry = new TLEntry({
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
        })
};