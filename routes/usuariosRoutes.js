import express from "express";
import fs, { read } from "fs";


const router = express.Router();

const readDataUs = () => {
    try {
        const data = fs.readFileSync("./usuario.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

const writeUsuario =(data)=>{
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
    <a href="https://www.example.com">Usuarios Ejemplo</a>`;
    const data = readDataUs();
    res.render("usuario",{user, data, htmlMessage})
});

router.get("/:id",(req,res)=>{
    const data=readDataUs();
    const user={name:"Ainara"};
    const id=parseInt(req.params.id);
    const usuario =data.usuaris.find((usuario)=>usuario.id===id);
    res.render("usuariosDetalle", {usuario, user});
});


export default router;