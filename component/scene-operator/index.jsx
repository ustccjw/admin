import React from 'react'
import MenuItem from 'material-ui/lib/menus/menu-item'
import swal from 'sweetalert'

import './style'

import { addScene, updateScene, removeScene } from '../../action/greeting'

const SceneOperator = props => {
	const { name } = props
	return (
		<admin-scene-operator>
			<MenuItem primaryText="添加场景" onClick={addScene} />
			<MenuItem primaryText="修改场景" onClick={updateScene} />
			<MenuItem primaryText="删除场景" onClick={() => {
				swal({
					title: 'Are you sure?',
					text: `确认要删除场景 "${name}" 吗？`,
					type: 'warning',
					showCancelButton: true,
					cancelButtonText: '取消',
					confirmButtonText: '确认删除',
					closeOnConfirm: false,
				}, async () => {
					try {
						await removeScene()
						swal('Good job!', '场景删除成功', 'success')
					} catch (err) {
						swal('Oops...', err.message, 'error')
					}
				})
			}} />
		</admin-scene-operator>
	)
}

SceneOperator.propTypes = {
	name: React.PropTypes.string.isRequired,
}

export default SceneOperator
