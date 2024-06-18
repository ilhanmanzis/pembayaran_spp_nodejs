import express  from "express";
import session from "express-session";
import auth from "./src/session/session.js";
import mongoose from "mongoose";
import methodOverride from "method-override";
import routersBackend from "./src/routers/backend.js";
import routersFrontend from "./src/routers/frontend.js";
import ErrorHandler from "./src/routers/handler/error/ErrorHandler.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 8000;
const app = express();


// connect database
mongoose.connect(`${process.env.DB_DIALECT}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`).then((result)=>{
    console.log('connected database');
}).catch((err)=>{
    console.log(err);
});


// sett to ejs
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use(session({
    secret: 'pembayaranspp',
    resave: false,
    saveUninitialized: false
}));


export default function wrapAsync(fn){
    return function(req,res,next){
        fn(req,res,next).catch(err=> next(err.message))
    }
}



// router express 
    // frontend
        app.use(routersFrontend);
    // backend
        app.use(routersBackend)




app.get('/404',auth,(req,res)=>{
    const dataUsername = req.session.username;
    res.status(404).render('error/404',{dataUsername});
});

app.use((req,res)=>{
    res.status(404).render('error/notfound')
})


app.use((err,req,res,next)=>{
    console.dir(err);
    if(err.name === 'ValidationError'){
        err.status = 400;
        err.message = Object.values(err.errors.map(item => item.message));
    }
    if(err.name === 'CastError'){
        err.status = 404;
        err.message = 'product tidak ditemukan';
    }
    next(err);
})

app.use((err,req,res,next)=>{
    const {status=500} = err;
    res.status(status).render('error/500')
})

app.listen(port,()=>{
    console.log(`server run is http://localhost:${port}`);
})
