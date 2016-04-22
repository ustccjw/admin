import { uiModel, dataModel } from '../model'

export const loadProps = async () => {
	const modalName = await uiModel.getValue(['app', 'modalName'])
	return { modalName }
}

export const setModal = async (name = '') => {
	await uiModel.setValue(['app', 'modalName'], name)
	return global.reload('app: setModal', name)
}

export const signout = async () => {
	await dataModel.call(['account', 'signout'])
	return global.reload('app: signout')
}
