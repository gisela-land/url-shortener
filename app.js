const express = require('express')
const exphbs = require('express-handlebars')
require('./config/mongoose.js')
const ShortUrl = require('./models/url.js')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use('/public', express.static('./public'))

const wordbag = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
  'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
]

function getShortenWords() {
  let d = Date.now();
  console.log('***', d)
  return 'xxxxx'.replace(/x/g, function (c) {
    const r = (d + Math.random() * wordbag.length) % wordbag.length | 0;
    // console.log(r)
    d = Math.floor(d / wordbag.length);
    // console.log(d)
    // console.log(wordbag[r])
    return wordbag[r]
  })
}

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/shorten', (req, res) => {
  const oriUrl = req.query.originUrl.toLowerCase()
  const host = req.headers.host
  let shortUrl = ''
  return ShortUrl.find({ url: oriUrl })
    .lean()
    .then((urls) => {
      if (urls.length === 0) {
        shortUrl = getShortenWords()
        ShortUrl.create({
          url: oriUrl,
          shorten: shortUrl
        })
      } else {
        shortUrl = urls[0].shorten
      }
      console.log('--- ', shortUrl)
    })
    .then(() => {
      return res.render('show', { originUrl: oriUrl, host: host, shorten: shortUrl })
    })
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
