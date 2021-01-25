const mongoose = require('mongoose');
const Article = require('./database/models/article');


mongoose.connect('mongodb://localhost:27017/blog-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });



/*Article.findByIdAndUpdate("6006d9b23050d16b43992134", (error,post) => {
    {title: "avengers"}
}, (error,post) => {
    console.log(error,post);
})*/


/*Article.findById("6006d9b23050d16b43992134", (error, articles) => {
    console.log(error,articles);
})*/



/*Article.find({
    title: "SpiderMan"
}, (error, articles) => {
    console.log(error, articles);
})*/

/*Article.create({
    title: "Avengers Endgame",
    content: "Critique sur le film"

}, (error, post) => {
    console.log(error,post);
})*/