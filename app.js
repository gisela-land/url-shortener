const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

/*
const wordbag = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
  'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
]

function test() {
  let d = Date.now();
  console.log('***', d)
  return 'xxxxx'.replace(/x/g, function (c) {
    const r = (d + Math.random() * wordbag.length) % wordbag.length | 0;
    console.log(r)
    d = Math.floor(d / wordbag.length);
    console.log(d)
    console.log(wordbag[r])
    return wordbag[r]
  })
}
*/

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
