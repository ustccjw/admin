import { uiModel, dataModel } from '../model'

export const loadProps = async () => {
	const response = await uiModel.get(['app', ['navOpen', 'modalName']])
	const { navOpen, modalName } = response.json.app
	return { navOpen, modalName }
}

export const setModal = async (name = '') => {
	await uiModel.setValue(['app', 'modalName'], name)
	return global.reload('app: setModal', name)
}

export const signout = async () => {
	await dataModel.call(['account', 'signout'])
	return global.reload('app: signout')
}
