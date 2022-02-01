const errorHandler = function errorHandler (error, responseStream) {
  console.error(error)
  if (responseStream) {
    let message
    let code
    switch (error.name) {
      case 'CustomError':
        message = error.message
        code = error.code
        break
      case 'CastError':
        message = 'Wrong ID'
        code = 400
        break
      default:
        message = 'Something went wrong'
        code = 500
    }
    return responseStream.status(code).json({ ok: false, message })
  }
}

module.exports = errorHandler
