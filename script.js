const mysql = require("mysql");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json()); // ler em node
app.use(cors());

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

app.post("/cadastrar", (req, res) =>{
    const {nome, senha} = req.body;
    const sql = "INSERT INTO cadastro_professor (`Nome`, `Senha`) VALUES(?, ?)";
    connection.query(sql, [nome, senha], (err) => {
        if(err){ 
            console.error(err)
            return res.status(500).json({mensagem: "usuario ja existente"});
        }
        res.json({mensagem: "professor cadastrado"});
    })
})

app.post("/login", (req, res) => {
    const { usuario, senha} = req.body
    const sql = "SELECT * FROM cadastro_professor WHERE `Nome` = ? AND `Senha` = ?"
    connection.query(sql, [usuario, senha], (err, results) => {
        if (results.length > 0) {
            res.json({mensagem: "aprovado"})
        }
        else{
            res.status(401).json({mensagem:"incorreto"})
        }
    })
})

app.post("/registrar-ocorrencia", (req, res) =>{
    const { aluno, turma, professor, data, motivo} = req.body;

    const sql = "INSERT INTO `ocorrências` (motivo, aluno_envolvido,professor_envolvido, data_ocorrencia,turma ) VALUES(?,?,?,?,?) ";

    connection.query(sql, [motivo, aluno,professor, data,turma ], (err, result) =>{
        if(err){
            console.error(err);
            return res.status(500).send("erro ao salvar");

        }
        res.send({mensagem:"ocorrencia salva"})
    })
})

app.post("/registrar-aluno", (req, res) => {

    const {nome, senha, turma} = req.body;
    const sql = "INSERT INTO `cadastro_aluno` (`Nome`, `Senha`, `Turma`) VALUES(?,?,?)";

    const { nome, senha, turma } = req.body;
    const query = "INSERT INTO `cadastro_aluno` (`Nome`, `Senha`, `Turma`) VALUES(?,?,?)";

    connection.query(sql, [nome, senha, turma], (err, result) => {
        if(err) {
            console.log(err)
            return res.status(500).json({mensagem: "usuario ja existente"});
        }
        res.json({mensagem: "aluno cadastrado"});

    })

})

app.listen(1200, () => console.log("sv porta 1200"))


    connection.query(sql, [nome, senha, turma], (err, result) => {
        if(err) {
            console.log(err)
            return res.status(500).json({mensagem: "usuario ja existente"});
        }
        res.json({mensagem: "aluno cadastrado"});

    })


app.post("/logar-aluno", (req, res) => {
    const {nome, senha} = req.body;
    const sql = "SELECT * FROM `cadastro_aluno` WHERE `Nome` = ? AND  `Senha` = ?"

    connection.query(sql, [nome, senha], (err, result ) => { // instruções para NJS -> BB
        if(err){
            console.error(err)
            return res.status(500).json({mensagem: "ERRO SV"}); // erro SV / return -> parar
        }

        if (result.length > 0 ) {
            res.json({mensagem: "aprovado"})
        }
        else{
            res.status(401).json({mensagem: "INCORRETA"}) //nao autorizado
        }
    })
})
app.listen(1200, () => console.log("sv porta 1200"));
