import express from "express";
import fs, { read } from "fs";


const router = express.Router();

const readDataRes = () => {
    try {
        const data = fs.readFileSync("./bbdd/reserva.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

const writeReserva =(data)=>{
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
    <a href="https://www.example.com">Reservas Ejemplo</a>`;
    const data = readDataRes();
    res.render("reservas/reservas",{user, data, htmlMessage})
});

router.get("/:id",(req,res)=>{
    const data=readDataRes();
    const user={name:"Ainara"};
    const id=parseInt(req.params.id);
    const reserva =data.reservas.find((reserva)=>reserva.id===id);
    res.render("reservas/reservaDetalle", {reserva, user});
});

//MODIFICAR || PUT
router.put("/editar/:id", (req, res) => {
    const data = readDataRes();
    const body = req.body;
    const id = parseInt(req.params.id);
    const reservaIndex = data.reservas.findIndex((reserva) => reserva.id === id);
    data.reservas[reservaIndex] = {
        ...data.reservas[reservaIndex],
        ...body,
    };
    writeReserva(data);
    res.json({ message: "Notifiació modificat correctament" });
});

//Crear otro get para llevar a la página de editar/:id
router.get("/editar/:id",(req,res)=>{
    const data=readDataRes();
    const user={name:"Ainara"};
    const id=parseInt(req.params.id);
    const reservas =data.reservas.find((reserva)=>reserva.id===id);
    res.render("reservas/editarReserva", {reservas, user});
});


export default router;