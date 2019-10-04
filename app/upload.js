const IncomingForm = require('formidable').IncomingForm

module.exports = function upload(req, res) {
  const form = new IncomingForm()

  form.on('file', (field, file) => {
    console.log(file)
  })

  form.on('end', () => {
    res.json()
  })

  form.parse(req)
}
