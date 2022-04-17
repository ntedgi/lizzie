
module.exports = (app,
  onError = (mw, err, req, res) => {
    /*...monitor,log,notify,....*/
  },
  errorMessage = (mw, err) => {
    const message = `${mw} failed to parse request --> ${err.message}`
    console.log(message)
    return `${mw} failed to parse request --> ${err.message}`
  }) => {
  return async function (...args) {
    args.forEach(element => {
      const mw = element.name;
      console.log(mw);
      app.use(element)
      app.use((err, req, res, next) => {
        if (err) {
          onError(err, req, res)
          res.status(err.status)
          res.send({ message: errorMessage(mw, err) })
        } else next(err)
      })
    });
  }
}