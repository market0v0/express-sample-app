import express from 'express'
const app = express()

app.get('/', (req, res) => {
  res.send('Choo Choo! Welcome to your Express app 🚅')
})

app.get('/ mark', (req, res) => {
  res.send('Choo Choo! Welcome to your Express app 🚅')
})

app.get('/json', (req, res) => {
  res.json({ 'Choo Choo': 'Welcome to your Express app 🚅' })
})

const port = process.env.PORT || 3030

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
