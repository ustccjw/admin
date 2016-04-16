import React from 'react'
import ActionDelete from 'material-ui/lib/svg-icons/action/delete'
import ContentCreate from 'material-ui/lib/svg-icons/content/create'
import swal from 'sweetalert'
import { warmUpDateType, warmUpLevel } from '../../constant'

import './style'

import { updateRule, removeRule, resortRule } from '../../action/greeting'

const Operator = ({ id, name, removeable }) => (
	<div data-operator>
		<a href="javascript:void(0);" onClick={() => updateRule(id)}>
			<ContentCreate color="#4298BA" />
		</a>
		{removeable && (
			<a href="javascript:void(0);" onClick={() => {
				swal({
					title: 'Are you sure?',
					text: `确认要删除规则 "${name}" 吗？`,
					type: 'warning',
					showCancelButton: true,
					cancelButtonText: '取消',
					confirmButtonText: '确认删除',
					closeOnConfirm: false,
				}, async () => {
					try {
						await removeRule(id)
						swal('Good job!', '规则删除成功', 'success')
					} catch (err) {
						swal('Oops...', err.message, 'error')
					}
				})
			}}>
				<ActionDelete color="#4298BA" />
			</a>
		)}
	</div>
)
Operator.propTypes = {
	id: React.PropTypes.number.isRequired,
	name: React.PropTypes.string.isRequired,
	removeable: React.PropTypes.bool.isRequired,
}

const Msg = ({ msg }) => <div data-msg>{msg}</div>
Msg.propTypes = {
	msg: React.PropTypes.string.isRequired,
}

const Restrict = ({ rule, isAll }) => {
	const { name, daysOfWeek, startTime, endTime, startDate, endDate, dateType } = rule
	const isWeek = warmUpDateType[dateType] === 'DAYS_OF_WEEK'
	const isDate = warmUpDateType[dateType] === 'INTERVAL_DATE'
	const isNone = warmUpDateType[dateType] === 'NONE'

	let repeatDate = null
	if (isWeek) {
		repeatDate = ['一', '二', '三', '四', '五', '六', '日'].
			filter((value, key) => daysOfWeek.includes(String(key + 1))).
			join('、')
	} else if (isDate) {
		repeatDate = `${startDate} - ${endDate}`
	} else if (isNone) {
		repeatDate = '所有日期'
	}
	let timeRange = '所以时间'
	if (!isAll) {
		timeRange = `${startTime} - ${endTime}`
	}
	return (
		<div data-restrict>
			<span>{name}</span>
			<span>{timeRange}</span>
			<span>{repeatDate}</span>
		</div>
	)
}
Restrict.propTypes = {
	rule: React.PropTypes.object.isRequired,
	isAll: React.PropTypes.bool.isRequired,
}

const GreetingRule = props => {
	const { rule, draggable } = props
	const { id, name, level, msg, isCurrent } = rule
	const isDefaultOnline = warmUpLevel[level] === 'DEFAULT_ONLINE'
	const isDefaultOffline = warmUpLevel[level] === 'DEFAULT_OFFLINE'
	const isPreferenceOnline = warmUpLevel[level] === 'PREFERENCE_ONLINE'
	const isPreferenceOffline = warmUpLevel[level] === 'PREFERENCE_OFFLINE'
	const isOnline = isDefaultOnline || isPreferenceOnline
	const isOffline = isDefaultOffline || isPreferenceOffline
	const isDefault = isDefaultOnline || isDefaultOffline

	let dragProps = {}
	if (draggable) {
		dragProps = {
			onDragStart(e) {
				const node = e.target
				node.setAttribute('data-drag', true)
				e.dataTransfer.effectAllowed = 'move' // eslint-disable-line no-param-reassign
				const data = { dragId: id }
				e.dataTransfer.setData('text/plain', JSON.stringify(data))
			},
			onDragEnd(e) {
				const node = e.target
				node.removeAttribute('data-drag')
			},
			onDragEnter(e) {
				e.stopPropagation()
				const node = e.currentTarget
				if (!node.dataset.counter) {
					node.dataset.counter = 0
				}
				node.dataset.counter++
				node.setAttribute('data-dragover', true)
			},
			onDragLeave(e) {
				e.stopPropagation()
				const node = e.currentTarget
				node.dataset.counter--
				if (+node.dataset.counter === 0) {
					node.removeAttribute('data-dragover')
				}
			},
			onDragOver(e) {
				e.preventDefault()
				e.dataTransfer.dropEffect = 'move' // eslint-disable-line no-param-reassign
			},
			async onDrop(e) {
				e.stopPropagation()
				e.preventDefault()
				;[...document.querySelectorAll('admin-greeting-rule')].forEach(node => {
					node.dataset.counter = 0 // eslint-disable-line no-param-reassign
					node.removeAttribute('data-dragover')
				})

				const data = e.dataTransfer.getData('text/plain')
				const { dragId } = JSON.parse(data)
				if (dragId !== id) {
					try {
						await resortRule(dragId, id)
					} catch (err) {
						swal('Oops...', err.message, 'error')
					}
				}
			},
		}
	}
	return (
		<admin-greeting-rule data-current={isCurrent} data-online={isOnline} data-offline={isOffline}
			draggable={draggable}
			{...dragProps}>
			<Restrict rule={rule} isAll={isDefault} />
			<Msg msg={msg} />
			<Operator id={id} name={name} removeable={!isDefault} />
		</admin-greeting-rule>
	)
}
GreetingRule.propTypes = {
	rule: React.PropTypes.object.isRequired,
	draggable: React.PropTypes.bool,
}
GreetingRule.defaultProps = {
	draggable: false,
}

export default GreetingRule
