import { miqi } from '../../lib/client'

const account = [{
	route: 'account.signin',
	call: async (callPath, args) => {
		const [username, password] = args
		await miqi.post('/session').
			send({ username, password }).
			json()
	},
}, {
	route: 'account.signout',
	call: async () => {
		await miqi.get('/account/logout').json()
	},
}]

export default account
