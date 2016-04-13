import falcor from 'falcor'
import { toCamelcase, reverseCamelcase } from 'object-keys-mapping'
import { weini } from '../../lib/client'

const { atom: $atom } = falcor.Model

const greeting = [{
	route: 'greeting.rules[{keys:ids}]',
	get: async pathset => {
		const query = { sceneId: pathset.ids[0] }
		const rules = await weini.get('/manager/warm_up/index').
			query(reverseCamelcase(query)).
			json().
			then(body => toCamelcase(body.result))
		return {
			path: pathset,
			value: $atom(rules),
		}
	},
}, {
	route: 'greeting.saveRule',
	call: async (callPath, args) => {
		const [rule] = args
		const { id } = rule
		if (id) {
			await weini.post('/manager/warm_up/edit').
				send(reverseCamelcase({ ...rule, ruleId: id })).
				json()
		} else {
			await weini.post('/manager/warm_up/add').
				send(reverseCamelcase(rule)).
				json()
		}
	},
}, {
	route: 'greeting.removeRule',
	call: async (callPath, args) => {
		const [ruleId] = args
		await weini.delete('/manager/warm_up/index').
			send(reverseCamelcase({ ruleId })).
			json()
	},
}, {
	route: 'greeting.resortRule',
	call: async (callPath, args) => {
		const [ruleId, positionRuleId] = args
		await weini.post('/manager/warm_up/sort').
			send(reverseCamelcase({ ruleId, positionRuleId })).
			json()
	},
}]

export default greeting
