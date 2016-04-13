import falcor from 'falcor'
import { toCamelcase, reverseCamelcase } from 'object-keys-mapping'
import { weini } from '../../lib/client'

const { atom: $atom } = falcor.Model

const scene = [{
	route: 'scene.all',
	get: async pathset => {
		const scenes = await weini.get('/manager/scene').
			json().
			then(body => toCamelcase(body.result))
		return {
			path: pathset,
			value: $atom(scenes),
		}
	},
}, {
	route: 'scene.roles',
	get: async pathset => {
		const roles = await weini.get('/manager/scene/roles').
			json().
			then(body => toCamelcase(body.result))
		return {
			path: pathset,
			value: $atom(roles),
		}
	},
}, {
	route: 'scene.save',
	call: async (callPath, args) => {
		const [scene1] = args
		const { symbol, name, role, isAdd } = scene1
		const roles = role.split(',')
		if (isAdd) {
			await weini.post('/manager/scene/add').
				send(reverseCamelcase({ symbol, name, roles })).
				json()
		} else {
			await weini.post('/manager/scene/edit').
				send(reverseCamelcase({ symbol, name, roles })).
				json()
		}
	},
}, {
	route: 'scene.remove',
	call: async (callPath, args) => {
		const [symbol] = args
		await weini.delete('/manager/scene').
			send(reverseCamelcase({ symbol })).
			json()
	},
}]

export default scene
