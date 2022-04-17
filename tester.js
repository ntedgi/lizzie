const express = require('express')
const app = express()
const port = 3000
const lizzie = require("./index")(app)

function error(err, req, res, next) {
  res.status(500);
  res.send('Internal Server Error');
}

lizzie(express.json({ limit: '250kb' }), express.urlencoded({ extended: false, limit: '250kb' }))

app.post('/', (req, res) => {
  console.log(req.x)
  res.send('Hello World!')

})

app.use(error);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})