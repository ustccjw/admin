import Router from 'falcor-router'
import account from './account'
import scene from './scene'
import greeting from './greeting'

const BaseRouter = Router.createClass([...account, ...scene, ...greeting])

export default class DataRouter extends BaseRouter {
	constructor(key) {
		super()
		this.key = key
	}
}
