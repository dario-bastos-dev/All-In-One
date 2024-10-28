import express from "express"
const app = express()
import path from "path";

// Database


// Iniciando servidor
const port = process.env.PORT || 8080
app.listen(port, ()=> {
          console.log("Servidor on-line!")
})

// Static
app.use(express.static(path.join(__dirname, "public")))

// Body-Parser
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Middlewars