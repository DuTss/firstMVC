const User = require('../database/models/user')

module.exports = (req,res,next) => {
    // Connecte toi dans la base de données
    User.findById(req.session.userId, (error, user) => {
        if (error || !user) {
            return res.redirect('/user/login')
        }
        next()
    })
    // Vérifie l'utilisateur

    // Si il est dans le base de donnée

    // Sinon tu le rediriges
}