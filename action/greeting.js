import falcor from 'falcor'
import { dataModel, uiModel } from '../model'
import { warmUpDateType } from '../constant'

const { atom: $atom } = falcor.Model

function checkRule(rule) {
	const { startTime, endTime, startDate, endDate, dateType, daysOfWeek } = rule
	const isWeek = warmUpDateType[dateType] === 'DAYS_OF_WEEK'
	const isDate = warmUpDateType[dateType] === 'INTERVAL_DATE'
	if (startTime > endTime) {
		throw new Error('生效时间不能大于终止时间')
	}
	if (isDate && startDate > endDate) {
		throw new Error('开始日期不能大于结束日期')
	}
	if (isWeek && (!daysOfWeek || daysOfWeek.length === 0)) {
		throw new Error('重复日期不能为空')
	}
}

function checkScene(scene) {
	const { role } = scene
	if (!role) {
		throw new Error('响应团队不能为空')
	}
}

export const loadProps = async () => {
	let response = await uiModel.get(['greeting', ['sceneId', 'rule', 'scene']])
	const { rule, scene } = response.json.greeting
	let { sceneId } = response.json.greeting

	response = await dataModel.get(['scene', ['all', 'roles']])
	const { all: scenes, roles: allRoles } = response.json.scene
	if (sceneId === '') {
		sceneId = scenes[0].symbol
		await uiModel.setValue(['greeting', 'sceneId'], sceneId)
	}
	const rules = await dataModel.getValue(['greeting', 'rules', sceneId])
	return { sceneId, rule, scene, scenes, allRoles, rules }
}

export const setSceneId = async sceneId => {
	await uiModel.setValue(['greeting', 'sceneId'], sceneId)
	return global.reload('greeting: setSceneId', sceneId)
}

export const updateRule = async id => {
	const sceneId = await uiModel.getValue(['greeting', 'sceneId'])
	const response = await dataModel.get(['greeting', 'rules', sceneId])
	const { [sceneId]: rules } = response.json.greeting.rules
	const rule = rules.filter(rule1 => rule1.id === id).pop()

	await uiModel.set({
		json: {
			app: {
				modalName: 'rule-setting',
			},
			greeting: {
				rule: $atom(rule),
			},
		},
	})
	return global.reload('greeting: updateRule', id)
}

export const addRule = async type => {
	const level = type === 'online' ? 0 : 1
	await uiModel.set({
		json: {
			app: {
				modalName: 'rule-setting',
			},
			greeting: {
				rule: $atom({ level, dateType: 0 }),
			},
		},
	})
	return global.reload('greeting: addRule', type)
}

export const handleRuleChange = async (key, value) => {
	const rule = await uiModel.getValue(['greeting', 'rule'])

	await uiModel.setValue(['greeting', 'rule'], { ...rule, [key]: value })
	return global.reload('greeting: handleRuleChange', key, value)
}

export const saveRule = async () => {
	const response = await uiModel.get(['greeting', ['rule', 'sceneId']])
	const { rule, sceneId } = response.json.greeting
	checkRule(rule)

	await dataModel.call(['greeting', 'saveRule'], [{ ...rule, sceneId }])
	await uiModel.setValue(['app', 'modalName'], '')
	dataModel.invalidate(['greeting', 'rules', sceneId])
	return global.reload('greeting: saveRule')
}

export const removeRule = async id => {
	const sceneId = await uiModel.getValue(['greeting', 'sceneId'])

	await dataModel.call(['greeting', 'removeRule'], [id])
	dataModel.invalidate(['greeting', 'rules', sceneId])
	return global.reload('greeting: removeRule', id)
}

export const resortRule = async (dragId, id) => {
	const sceneId = await uiModel.getValue(['greeting', 'sceneId'])

	await dataModel.call(['greeting', 'resortRule'], [dragId, id])
	dataModel.invalidate(['greeting', 'rules', sceneId])
	return global.reload('greeting: resortRule', dragId, id)
}

export const updateScene = async () => {
	const sceneId = await uiModel.getValue(['greeting', 'sceneId'])
	const scenes = await dataModel.getValue(['scene', 'all'])
	let scene = null
	scenes.every(scene1 => {
		if (sceneId === scene1.symbol) {
			// https://github.com/Netflix/falcor/issues/768
			const role = scene1.roles.map(({ roleSign }) => roleSign).join(',')
			scene = { ...scene1, role, isAdd: false }
			return false
		}
		return true
	})

	await uiModel.set({
		json: {
			app: {
				modalName: 'scene-setting',
			},
			greeting: {
				scene: $atom(scene),
			},
		},
	})
	return global.reload('greeting: updateScene')
}

export const addScene = async () => {
	const scene = { symbol: '', role: '', name: '', isAdd: true }
	await uiModel.set({
		json: {
			app: {
				modalName: 'scene-setting',
			},
			greeting: {
				scene: $atom(scene),
			},
		},
	})
	return global.reload('greeting: addScene')
}

export const handleSceneChange = async (key, value) => {
	const scene = await uiModel.getValue(['greeting', 'scene'])

	await uiModel.setValue(['greeting', 'scene'], { ...scene, [key]: value })
	return global.reload('greeting: handleSceneChange', key, value)
}

export const saveScene = async () => {
	const scene = await uiModel.getValue(['greeting', 'scene'])
	checkScene(scene)

	await dataModel.call(['scene', 'save'], [scene])
	await uiModel.setValue(['app', 'modalName'], '')
	dataModel.invalidate(['scene', 'all'])
	return global.reload('greeting: saveScene')
}

export const removeScene = async () => {
	const sceneId = await uiModel.getValue(['greeting', 'sceneId'])

	await dataModel.call(['scene', 'remove'], [sceneId])
	await uiModel.setValue(['greeting', 'sceneId'], '')
	dataModel.invalidate(['scene', 'all'])
	return global.reload('greeting: removeScene')
}
