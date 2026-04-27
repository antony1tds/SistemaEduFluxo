const mysql = require("mysql");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
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

    const query = "INSERT INTO `ocorrências` (motivo, aluno_envolvido,professor_envolvido, data_ocorrencia,turma ) VALUES(?,?,?,?,?) ";

    connection.query(query, [motivo, aluno,professor, data,turma ], (err, result) =>{
        if(err){
            console.error(err);
            return res.status(500).send("erro ao salvar");

        }
        res.send({mensagem:"ocorrencia salva"})
    })
})

app.listen(1200, () => console.log("sv porta 1200"))

