const Article = require('../database/models/article')

module.exports = async (req,res) => {
    if (req.session.userId) {
        const article = await Article.findById(req.params.id)
        return res.render('edit', {article: article})
    }
    res.redirect('/user/login')
}