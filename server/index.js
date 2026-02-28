const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
