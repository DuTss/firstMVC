const express = require('express');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const path = require('path');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const connectFlash = require('connect-flash');
const {stripTags} = require('./helpers/hbs')

// Controller
// Article
const articleSingleController = require('./controllers/articleSingle')
const articlePostController = require('./controllers/articlePost')
const createArticleController = require('./controllers/articleAdd');
const articleEditController = require('./controllers/articleEdit')
const homePage = require('./controllers/homePage');
// User
const userCreate = require('./controllers/userCreate')
const userRegister = require('./controllers/userRegister')
const userLogin = require('./controllers/userLogin')
const userLoginAuth = require('./controllers/userLoginAuth')
const userLogout = require('./controllers/userLogout')

const app = express();
mongoose.connect('mongodb://localhost:27017/blog-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const mongoStore = new MongoStore(expressSession)

app.use(connectFlash())

app.use(expressSession({
    secret: 'securite',
    resave: false,
    saveUninitialized: false,
    name:'biscuit',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileupload())

const auth = require('./middleware/auth');
const redirectAuthSuccess = require('./middleware/redirectAuthSuccess');

// Handlebars Moment
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

app.use(express.static('public'));

// Route
app.engine("handlebars",exphbs({handlebars: allowInsecurePrototypeAccess(Handlebars), helpers: {stripTags: stripTags}}));
app.set('view engine', 'handlebars');
app.use('*', (req,res,next) => {
    res.locals.user = req.session.userId;
    console.log(res.locals.user);
    next()
})


// Middleware
const articleValidPost = require('./middleware/articleValidPost');
app.use("/articles/post", articleValidPost)


// GET
// Articles
app.get('/', homePage)
app.get('/articles/add', auth, createArticleController)
app.get('/articles/:id', articleSingleController)
app.post('/articles/post', auth, articleValidPost, articlePostController)// Enregistrez un Jpeg
app.get('/edit/:id', auth, articleEditController)
app.put('/articles/put', auth, articleValidPost)



// User
app.get('/user/create', redirectAuthSuccess, userCreate)
app.post('/user/register', redirectAuthSuccess, userRegister)
app.get('/user/login', redirectAuthSuccess, userLogin)
app.post('/user/loginAuth', redirectAuthSuccess, userLoginAuth)
app.get('/user/logout', userLogout)




// Contact
app.get('/contact', (req,res) => {
    res.render('contact')
})

app.use((req,res) => {
    res.render('error404')
})

app.listen(2002, function() {
    console.log("Le serveur toune sur le port 2002");
})