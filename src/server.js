const express = require("express");

const  routes  = require("./routes")

const app = express();


// Rota params = sao obrigatorios para poder fazer o get
// na busca seria EX: http://localhost:3333/message/id/user
app.get("/message/:id/:user", (request, response) =>{
    const {id, user} = request.params;

    response.send(`
    id da mensagem: ${id}.
    Prara o usuario : ${user}.
    `);
} )

app.use(routes)


// Rota query = sao parametos opcionais 
// na busca seria EX: http://localhost:3333/users?page=1&limit=10000
app.get("/users",(request, response)=> {
    const {page,limit} = request.query;

    response.send(` Página : ${page}
        Mostrar : ${limit}
    `)

})


// Rota post serve para enviar dados do usuario para o banco de dados 


const PORT = 3333;

app.listen(PORT, () => 
    console.log(`Server listening on port ${PORT}`))