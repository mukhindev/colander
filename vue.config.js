module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/colander/'
    : '/',
  transpileDependencies: [
    'vuetify'
  ]
}
