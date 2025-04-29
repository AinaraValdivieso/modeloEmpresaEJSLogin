import express from "express";
import bodyParser from "body-parser";

import recursoRoutes from "./routes/recursoRoutes.js";
import reservaRoutes from "./routes/reservaRoutes.js";
import usuarioRoutes from "./routes/usuariosRoutes.js";
import notifacionRoutes from "./routes/notificacionesRoutes.js";
import { PORT, SECRET_JWT_KEY } from "./config.js";
import { UserRepository } from './user-repository.js';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public"));//carpeta publica pel css
//inicio middleware
app.use((req,res,next)=>{
    const token =req.cookies.access_token
    req.session={user: null}
    try{
        const data=jwt.verify(token,SECRET_JWT_KEY)
        req.session.user=data
    }catch(error){
        req.session.user=null
    }
    next() 
})
app.set('view engine','ejs');//Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs


app.use('/recursos', recursoRoutes);
app.use('/reservas', reservaRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/notificaciones', notifacionRoutes);

//Enpoint para que al abrir la web salga el login en caso de no haber iniciado sessión
//En caso de que sí, se abra el panel principal
app.get('/',(req, res)=>{
    const {user}= req.session
    res.render('login/index', user)
})
//Endpoint que permite al usuario iniciar sessión
app.post('/login', async (req,res)=>{
    try{
        const {username,password}=req.body
        console.log("llego aqui")
        const user = await UserRepository.login({username,password})
        console.log("llego aqui 1")
        const token = jwt.sign(
            {id: user._id, username: user.username},
            SECRET_JWT_KEY, 
            {
            expiresIn:'1h'
            })
            console.log("llego aqui 2")
        res
        .cookie('access_token',token,{
            httpOnly:true, //la cookie solo se puede acceder en el servidor, no podrem fer un document.cookie
            //secure:true, //la cookie solo funciona en https
            secure: process.env.NODE_ENV==='production',
            sameSite:'strict', //la cookie es pot accedir dins del domini
            maxAge:1000*60*60 //la cookie te un temps de validesa d'una hora
        })
        .send({ user,token })
    }catch (error){
        //401 = no autorització
        res.status(401).send(error.message)
    }
});

app.post('/register', async (req,res)=>{
    //aqui el body es el cuerpo de la petición
    const {username,password}=req.body
    console.log(req.body)
    try{
        const id= await UserRepository.create({username,password});
        res.send({id})
    }catch(error){
        //No es buena idea mandar el error del repositorio
        res.status(400).send(error.message)
    }
});

app.post('/logout',(req,res)=>{
    res
    .clearCookie('access_token')
    //He cambiado esta parte del código para hacer que el código redirija a la página de login al darle a cerrar sesión en la home
    res.redirect('/');
});
app.get('/protected',(req,res)=>{
    const {user}=req.session
    if (!user) return res.status(403).send('acceso no autorizado')
    res.render('login/protected',user)
});

app.get('/home', (req, res)=>{
    const { user } = req.session;
    if (!user) return res.redirect('/');
    res.render('home', { username: user.username });
});




//PARA ESCUCHAR
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
}); 