import express from "express";
import bodyParser from "body-parser";

import recursoRoutes from "./routes/recursoRoutes.js";
import reservaRoutes from "./routes/reservaRoutes.js";
import usuarioRoutes from "./routes/usuariosRoutes.js";
import notifacionRoutes from "./routes/notificacionesRoutes.js";

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));//carpeta publica pel css
app.set('view engine','ejs');//Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs


app.use('/recursos', recursoRoutes);
app.use('/reservas', reservaRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/notificaciones', notifacionRoutes);


app.get('/', (req, res)=>{
    res.render("home")
});


//PARA ESCUCHAR
app.listen(3001,()=>{
    console.log("Server listing on port 3001");
}); 