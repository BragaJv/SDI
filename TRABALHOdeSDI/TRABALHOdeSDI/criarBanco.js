let conexao = require('./bdConectaBanco')
let http = require('http')
let fs = require('fs')
let formidable = require('formidable')


http.createServer(
    function(req, res) {
      let form = new formidable.IncomingForm()
  
      form.parse(req,
        function(erro, campos, arquivos) {
           conexao.connect(
            function(erro) {
              if(erro)
                throw erro
              else {
                console.log('Conexão estabelecida com sucesso!')
          
                let operacao = `CREATE DATABASE ${campos.nome}`
          
                conexao.query(operacao,
                  function(erro) {
                    if(erro)
                      throw erro
                    else
                      console.log('Banco de dados criado com sucesso!')
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