module.exports = {
  url: 'http: //localhost',
  port: process.env.PORT || 3030,
  originUrl: 'http://localhost:3000',
  mongoUrl: 'mongodb://localhost:27017/chat-app',
  ISDEV: process.env.NODE_ENV !== 'production'
}