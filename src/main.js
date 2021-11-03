const app = require('./app')

const { APP_PORT } = require('./config/config.default')

app.listen(APP_PORT, () => {
  console.log(`server running on port ${APP_PORT}`)
})
