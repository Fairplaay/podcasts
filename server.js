// server.js
const next = require('next')
const routes = require('./routes')
const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app)

const {createServer} = require('http')
const PORT = process.env.PORT || 3000
app.prepare().then(() => {
  createServer(handler).listen(PORT)
})
