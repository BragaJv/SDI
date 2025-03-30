let conexao = require('./bdConectaPetshop')
let http = require('http')
let fs = require('fs')
let formidable = require('formidable')

http.createServer(
  function(req, res) {
    let form = new formidable.IncomingForm()

    form.parse(req,
      function(erro, campos, arquivos) {
        //res.writeHead(200, {'Content-Type':'text/html; charset=UTF-8'})
        //res.write(`<p>Nome: ${campos.nome}</p>`)
        //res.write(`<p>Espécie: ${campos.especie}</p>`)
        //res.write(`<p>Raça: ${campos.raca}</p>`)

        conexao.connect(
          function(erro) {
            if(erro)
              throw erro
            else {
              console.log('Conexão estabelecida com sucesso!')
        
              let operacao = `INSERT INTO animal(nome, especie, raca) VALUES ('${campos.nome}', '${campos.especie}', '${campos.raca}')`
        
              conexao.query(operacao,
                function(erro) {
                  if(erro)
                    throw erro
                  else
                    console.log('Animal cadastro com sucesso!')
                }
              )
            }
          }
        )

        fs.readFile('bdResposta.html',
          function(erro, pagina) {
            res.writeHead(200, {'Content-Type':'text/html; charset=UTF-8'})
            res.write(pagina)
            res.end()
          }
        )

        //res.end()
      }
    )
  }
).listen(3000)

console.log('Servidor iniciado na porta 3000. Pressione Ctrl + C para derrubar.')