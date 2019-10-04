const express = require('express')
const cors = require('cors')
const path = require('path')
const upload = require('./upload')

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

const server = express()
const PORT = process.env.PORT || 3001

server.use(cors(corsOptions))
server.use(express.static(path.join(__dirname, 'client/build')))

server.post('/upload', upload)
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

server.listen(PORT, () => {
  console.log('server is listening')
})
