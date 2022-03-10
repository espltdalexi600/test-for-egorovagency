import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import multer from 'multer'
import database from './database.js'

const upload = multer()
const __dirname = path.resolve()
const PORT = process.env.PORT ?? 3000
const app = express()

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(upload.array())

app.post('/email', (req, res) => {
  let email = req.body.email
  try {
    let newEmail = database.addEmail(email)
    res.status(201).json(newEmail)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`)
})
