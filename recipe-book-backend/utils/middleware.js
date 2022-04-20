const logger = require('./logger')

const tokenGetter = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }
  next()
}

const requestLogger = (req, res, next) => {
  logger.info(`request method: ${req.method}`)
  logger.info(`request path: ${req.path}`)
  logger.info('request body ' + JSON.stringify(req.body))
  logger.info('&&&')
  next()
}

const unknownEndpoint = (req, res, next) => {
  res.status(404).send('<h1>Unknown location</h1>')
  next()
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: error.message })
  }
  next()
}

module.exports = { requestLogger, unknownEndpoint, errorHandler, tokenGetter }
