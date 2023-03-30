const connectToMongo = require('./db')
const express = require('express')
const app = express()
const port = 5000
var cors = require('cors')
app.use(cors())
app.use(express.json())

connectToMongo();

app.use(express.json())


app.use('/api/auth', require("./routes/auth"))
app.use('/api/todos', require("./routes/todo"))

app.get('/', (req, res) => {
    res.send('Hello Vishnu')
})

app.listen(port, () => {
    console.log(`iNotebook backend listening on port ${port}`)
})