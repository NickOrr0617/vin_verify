export default (req, res) => {
    const {
      query: { vin },
    } = req
  
    const request = require('request')
    let url = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`

    console.log('URL: ' + url)

    request(url, (err, result, body) => {
        if (err) {
            console.error(err)
        }
        console.log('Body: ', body)
        res.end(body)
    })
  }