import queryString from 'query-string'
import { dataModel, uiModel } from '../model'

export const loadProps = async (params: Object, location: Object) => {
	const response = await uiModel.get(['signin', ['username', 'password']])
	const { username, password } = response.json.signin
	const query = queryString.parse(location.search)
	const { redirect = '/' } = query
	return { username, password, redirect: decodeURIComponent(redirect) }
}

export const handleChange = async (key: string, value: string) => {
	await uiModel.setValue(['signin', key], value)
	return global.reload('signin: handleChange', key, value)
}

export const signin = async () => {
	const response = await uiModel.get(['signin', ['username', 'password']])
	const { username, password } = response.json.signin

	await dataModel.call(['account', 'signin'], [username, password])
	return global.reload('signin: signin')
}
