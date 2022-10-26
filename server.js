const { response } = require("express")
const express = require("express")

const app = express()

const PORT = 8080

const server = app.listen(PORT, ()=>{
    console.log(`Se está escuchando el puerto ${server.address().port}`)
})

const fs = require("fs")
class Contenedor{
    constructor(ruta){
        this.ruta = ruta
    }

    async getById(id){
        try{
            let dataArchivo = await fs.promises.readFile(this.ruta, "utf-8")
            let dataArchivoParse = JSON.parse(dataArchivo)
            let producto = dataArchivoParse.find(producto => producto.id === id)
            if(producto){
                return producto
            } else{
                return null
            }
        } catch(error){
            console.log(error)
        }
    }

    async getAll(){
        try{
            let dataArchivo = await fs.promises.readFile(this.ruta, "utf-8")
            let dataArchivoParse = JSON.parse(dataArchivo)
            if(dataArchivoParse.length){
                return dataArchivoParse
            } else{
                return null
            }

        } catch(error){
            console.log(error)
        }
    }
}

const contenedor = new Contenedor("./productos.txt");

const productosDisponibles = contenedor.getAll();

app.get("/", (request, response)=> {
    response.send("<h1>bienvenido</h1>")
});

app.get("/productos", (request, response) => {
	productosDisponibles.then(productos => {
		response.json(
			productos
		);
	});
});

app.get("/productoRandom", (request, response) => {
	let random = Math.floor(Math.random() * 5) + 1;
	const productoAlAzar = contenedor.getById(random);
	productoAlAzar.then(producto => {
		response.json(
			producto
		);
	});
});