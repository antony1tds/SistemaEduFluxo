const mysql = require("mysql");

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"edufluxo"
});

connection.connect((Error) => {
    if (Error) {
        console.error("erro ao connectar" , Error);
        return
    }
    console.log("conexao boa");
})

connection.query('SELECT * FROM alunos', (Error, results) =>{
    if(Error) {
        console.log("erro", Error);
        return
    }
    console.log("resultado ", results);
});

connection.end((Error) => {
    if (Error){ 
    console.error("erro ao fechar CX" , Error);
    return;
    }
    console.log("CX fechada");
})