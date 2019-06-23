const bodyParse = require('body-parser')
const express = require('express')
const app = express()

app.use(express.static('.'))
app.use(bodyParse.urlencoded({ extended: true }))
app.use(bodyParse.json())

app.get('/parOuImpar', (req, res) => {
    //req.body
    //req.query
    //req.params
    const par = parseInt(req.query.numero) % 2 === 0
    res.send({
        resultado: par ? 'par' : 'impar'
    })
})

// app.get('/teste', (req, res) => res.send('ok'))
app.listen(8080, () => console.log('Executando..'))