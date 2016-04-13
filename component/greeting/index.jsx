import React from 'react'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'
import Dialog from 'material-ui/lib/dialog'
import RaisedButton from 'material-ui/lib/raised-button'
import NavigationArrowDropDown from 'material-ui/lib/svg-icons/navigation/arrow-drop-down'
import Tooltip from 'rc-tooltip'
import GreetingRule from '../greeting-rule'
import RuleSetting from '../rule-setting'
import SceneSetting from '../scene-setting'
import SceneOperator from '../scene-operator'

import './style'

import { setSceneId, addRule } from '../../action/greeting'
import { setModal } from '../../action/app'

const Label = ({ name }) => {
	const overlay = <SceneOperator name={name} />
	return (
		<div data-label>
			<span>{name}</span>
			<Tooltip placement="rightTop" trigger={['click']} overlay={overlay}>
				<a href="javascript:void(0)">
					<NavigationArrowDropDown color="#fff" />
				</a>
			</Tooltip>
		</div>
	)
}

const Topbar = ({ role }) => (
	<div data-topbar>
		<span>问候语规则（优先级顺序降序排序，可拖拽实现排序）</span>
		<span>{`响应团队：${role}`}</span>
		<div>
			<RaisedButton key="online" label="新建在线规则" onClick={() => addRule('online')} />
			<RaisedButton key="offline" label="新建离线规则" onClick={() => addRule('offline')} />
		</div>
	</div>
)

const RuleList = ({ rules }) => {
	const preferenceRuleList = rules.slice(0, -2).map(rule => <GreetingRule key={rule.id} rule={rule}
		draggable />)
	const defaultRuleList = rules.slice(-2).map(rule => <GreetingRule key={rule.id} rule={rule} />)
	return (
		<div data-rulelist>
			<div>{preferenceRuleList}</div>
			<div>{defaultRuleList}</div>
		</div>
	)
}

const Greeting = props => {
	const { modalName, sceneId, rule, scene, scenes, allRoles, rules } = props
	const tabList = scenes.map(({ symbol: id, name, roles }) => {
		const label = id === sceneId ? <Label name={name} /> : name
		const role = roles.map(({ roleName }) => roleName).join(',')
		return (
			<Tab key={id} label={label} value={id} data-selected={id === sceneId}>
				<Topbar role={role} />
				<RuleList rules={rules} />
			</Tab>
		)
	})
	return (
		<admin-greeting>
			<Tabs value={sceneId} onChange={setSceneId} data-tabs>
				{tabList}
			</Tabs>
			<Dialog title="规则设置" open={modalName === 'rule-setting'} autoScrollBodyContent
				onRequestClose={open => open ? setModal('rule-setting') : setModal()}>
				<RuleSetting rule={rule} />
			</Dialog>
			<Dialog title="场景设置" open={modalName === 'scene-setting'} autoScrollBodyContent
				onRequestClose={open => open ? setModal('scene-setting') : setModal()}>
				<SceneSetting scene={scene} allRoles={allRoles} />
			</Dialog>
		</admin-greeting>
	)
}

Greeting.propTypes = {
	modalName: React.PropTypes.string.isRequired,
	sceneId: React.PropTypes.string.isRequired,
	rule: React.PropTypes.object,
	scene: React.PropTypes.object,

	scenes: React.PropTypes.array.isRequired,
	allRoles: React.PropTypes.array.isRequired,
	rules: React.PropTypes.array.isRequired,
}

export default Greeting
