/* eslint-disable no-undef */

import { uiModel } from './model'
import './index'

import { signin } from './action/signin'

const context = require.context('./test', true, /-test\.js$/)
context.keys().forEach(context)

before(async function (done) {
	this.timeout(5000)

	const json = {
		signin: {
			username: 'admin',
			password: 'admin',
		},
	}
	await uiModel.set({ json })
	await signin()
	done()
})
