import express from "express";
import fs, { read } from "fs";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));//carpeta publica pel css
app.set('view engine','ejs');//Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs

const readDataRec = () => {
    try {
        const data = fs.readFileSync("./recurs.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

const readDataRes = () => {
    try {
        const data = fs.readFileSync("./reserva.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};


const writeData=(data)=>{
    try{
        fs.writeFileSync("",JSON.stringify(data));

    }catch(error){
        console.log(error);
    }
};

app.get('/', (req, res)=>{
    res.render("home")
});

app.get('/recursos', (req, res) => {
    const user={name:"Ainara"}
    const htmlMessage = `
    <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
    <a href="https://www.example.com">Recursos Example</a>`;
    const data = readDataRec();
    res.render("recurso",{user, data, htmlMessage})
});

app.get('/reservas', (req, res) => {
    const user={name:"Ainara"}
    const htmlMessage = `
    <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
    <a href="https://www.example.com">Reservas Ejemplo</a>`;
    const data = readDataRes();
    res.render("reservas",{user, data, htmlMessage})
});


//PARA ESCUCHAR
app.listen(3001,()=>{
    console.log("Server listing on port 3001");
}); 