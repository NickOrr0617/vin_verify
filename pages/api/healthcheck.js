export default (req, res) => {

    const request = require('request')
    let url = 'https://vpic.nhtsa.dot.gov/api/'

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')

    request(url, (err, result, body) => {
        if (err || (result && result.statusCode != 200)) {
            res.end(JSON.stringify({ server: 'ok', nhtsa: "error" }))
        }
        res.end(JSON.stringify({ server: 'ok', nhtsa: "ok" }))
    })
  }