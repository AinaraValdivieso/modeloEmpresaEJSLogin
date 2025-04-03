import express from "express";
import fs, { read } from "fs";


const router = express.Router();

const readDataNot = () => {
    try {
        const data = fs.readFileSync("./notificaciones.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

const writeNoti =(data)=>{
    try{
        fs.writeFileSync("",JSON.stringify(data));

    }catch(error){
        console.log(error);
    }
};


router.get('/', (req, res) => {
    const user={name:"Ainara"}
    const htmlMessage = `
    <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
    <a href="https://www.example.com">Notificaciones Ejemplo</a>`;
    const data = readDataNot();
    res.render("notificaciones",{user, data, htmlMessage})
});

router.get("/:id",(req,res)=>{
    const data=readDataNot();
    const user={name:"Ainara"};
    const id=parseInt(req.params.id);
    const notificacion =data.notificacions.find((notificacion)=>notificacion.id_noti===id);
    res.render("notificacionDetalle", {notificacion, user});
});


export default router;