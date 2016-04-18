import React from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Select from 'react-select'
import swal from 'sweetalert'

import './style'

import { handleSceneChange, saveScene } from '../../action/greeting'
import { setModal } from '../../action/app'

const Id = ({ id }) => (
	<div data-id>
		<label>
			<strong>场景 ID</strong>
			<TextField name="id" required defaultValue={id}
				onChange={e => handleSceneChange('symbol', e.target.value)} />
		</label>
	</div>
)

const Name = ({ name }) => (
	<div data-name>
		<label>
			<strong>场景名称</strong>
			<TextField name="name" required defaultValue={name}
				onChange={e => handleSceneChange('name', e.target.value)} />
		</label>
	</div>
)

const Role = ({ allRoles, role }) => {
	const options = allRoles.map(({ name: label, key: value }) => ({ label, value }))
	const select = (
		<label data-role>
			<strong>响应团队</strong>
			<Select value={role} options={options} multi
				onChange={array => {
					const role1 = array.map(({ value }) => value).join(',')
					handleSceneChange('role', role1)
				}} />
		</label>
	)
	return <div>{select}</div>
}

const Submit = () => (
	<div data-submit>
		<label>
			<FlatButton label="取消" onClick={() => setModal()} />
		</label>
		<label>
			<FlatButton label="保存" primary type="submit" />
		</label>
	</div>
)

const SceneSetting = props => {
	const { scene, allRoles } = props
	const { symbol: id, name, role, isAdd } = scene
	return (
		<admin-scene-setting>
			<form onSubmit={async e => {
				e.preventDefault()
				try {
					await saveScene()
					swal('Good job!', '规则保存成功', 'success')
				} catch (err) {
					swal('Oops...', err.message, 'error')
				}
			}}>
				{isAdd && <Id id={id} />}
				<Name name={name} />
				<Role allRoles={allRoles} role={role} />
				<Submit />
			</form>
		</admin-scene-setting>
	)
}

SceneSetting.propTypes = {
	scene: React.PropTypes.object,
	allRoles: React.PropTypes.array.isRequired,
}

export default SceneSetting
