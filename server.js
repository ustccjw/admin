const webpack = require('webpack')
const Express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config.development')

const app = new Express()
const port = 3000

const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath,
}))
app.use(webpackHotMiddleware(compiler))

app.get('/weini/admin/', (req, res) => {
	res.sendFile(`${__dirname}/view/index.html`)
})

app.listen(port, error => {
	if (error) {
		console.error(error) // eslint-disable-line no-console
	} else {
		const msg = '==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.'
		console.info(msg, port, port) // eslint-disable-line no-console
	}
})
