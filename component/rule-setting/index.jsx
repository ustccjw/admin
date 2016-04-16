import React from 'react'
import TimePicker from 'material-ui/lib/time-picker/time-picker'
import TextField from 'material-ui/lib/text-field'
import RadioButton from 'material-ui/lib/radio-button'
import RadioButtonGroup from 'material-ui/lib/radio-button-group'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'
import DatePicker from 'material-ui/lib/date-picker/date-picker'
import moment from 'moment'
import swal from 'sweetalert'
import { warmUpDateType, warmUpLevel } from '../../constant'
import { toggleArray } from '../../util'

import './style'

import { handleRuleChange, saveRule } from '../../action/greeting'
import { setModal } from '../../action/app'

const StartEnd = ({ startTime, endTime }) => (
	<div data-startend>
		<label>
			<strong>生效时间</strong>
			<TimePicker name="startTime" required format="24hr"
				value={startTime && moment(startTime, 'HH:mm').toDate()}
				onChange={(err, date) => handleRuleChange('startTime', moment(date).format('HH:mm'))} />
		</label>
		<label>
			<strong>终止时间</strong>
			<TimePicker name="endTime" required format="24hr"
				value={endTime && moment(endTime, 'HH:mm').toDate()}
				onChange={(err, date) => handleRuleChange('endTime', moment(date).format('HH:mm'))} />
		</label>
	</div>
)
StartEnd.propTypes = {
	startTime: React.PropTypes.string.isRequired,
	endTime: React.PropTypes.string.isRequired,
}

const RepeatType = ({ dateType }) => (
	<div data-repeattype>
		<label>
			<strong>日期重复</strong>
			<RadioButtonGroup name="dateType" valueSelected={String(dateType)} onChange={e => {
				const value = e.target.value
				handleRuleChange('dateType', +value)
			}}>
				<RadioButton value="0" label="按星期" />
				<RadioButton value="1" label="按日期" />
			</RadioButtonGroup>
		</label>
	</div>
)
RepeatType.propTypes = {
	dateType: React.PropTypes.number.isRequired,
}

const RepeatWeek = ({ daysOfWeek }) => {
	const week = ['一', '二', '三', '四', '五', '六', '日']
	const weekList = week.map((day, i) =>
		<RaisedButton key={i} label={day} primary={daysOfWeek.includes(String(i + 1))}
			onClick={() => handleRuleChange('daysOfWeek', toggleArray(daysOfWeek, String(i + 1)))} />
	)
	return (
		<div data-repeatweek>
			<label>
				<strong>选择星期</strong>
				<div>{weekList}</div>
			</label>
		</div>
	)
}
RepeatWeek.propTypes = {
	daysOfWeek: React.PropTypes.array.isRequired,
}

const RepeatDate = ({ startDate, endDate }) => {
	const dateList = [
		<DatePicker key="startDate" hintText="开始日期" required
			value={startDate && moment(startDate, 'YYYYMMDD').toDate()}
			onChange={(e, date) => handleRuleChange('startDate', moment(date).format('YYYYMMDD'))} />,
		<DatePicker key="endDate" hintText="结束日期" required
			value={endDate && moment(endDate, 'YYYYMMDD').toDate()}
			onChange={(e, date) => handleRuleChange('endDate', moment(date).format('YYYYMMDD'))} />,
	]
	return (
		<div data-repeatdate>
			<label>
				<strong>选择日期</strong>
				<div>{dateList}</div>
			</label>
		</div>
	)
}
RepeatDate.propTypes = {
	startDate: React.PropTypes.string.isRequired,
	endDate: React.PropTypes.string.isRequired,
}

const Name = ({ name, disabled }) => (
	<div data-name>
		<label>
			<strong>规则名称</strong>
			<TextField name="name" required defaultValue={name} disabled={disabled}
				onChange={e => handleRuleChange('name', e.target.value)} />
		</label>
	</div>
)
Name.propTypes = {
	name: React.PropTypes.string.isRequired,
	disabled: React.PropTypes.bool.isRequired,
}

const Msg = ({ msg }) => (
	<div data-msg>
		<label>
			<strong>问候语</strong>
			<TextField name="msg" required multiLine defaultValue={msg}
				onChange={e => handleRuleChange('msg', e.target.value)} />
		</label>
	</div>
)
Msg.propTypes = {
	msg: React.PropTypes.string.isRequired,
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

const RuleSetting = props => {
	const { rule } = props
	const { dateType, level, startTime = null, endTime = null, startDate = null, endDate = null,
		name = null, msg = null } = rule
	const daysOfWeek = Array.isArray(rule.daysOfWeek) ? rule.daysOfWeek : []
	const isDefaultOnline = warmUpLevel[level] === 'DEFAULT_ONLINE'
	const isDefaultOffline = warmUpLevel[level] === 'DEFAULT_OFFLINE'
	const isDefault = isDefaultOffline || isDefaultOnline
	const isWeek = warmUpDateType[dateType] === 'DAYS_OF_WEEK'

	return (
		<admin-rule-setting>
			<form onSubmit={async e => {
				e.preventDefault()
				try {
					await saveRule()
					swal('Good job!', '规则保存成功', 'success')
				} catch (err) {
					swal('Oops...', err.message, 'error')
				}
			}}>
				{!isDefaultOffline && <StartEnd startTime={startTime} endTime={endTime} />}
				{!isDefault && <RepeatType dateType={dateType} />}
				{!isDefaultOffline && (
					isWeek ? <RepeatWeek daysOfWeek={daysOfWeek} /> :
						<RepeatDate startDate={startDate} endDate={endDate} />
				)}
				<Name name={name} disabled={isDefault} />
				<Msg msg={msg} />
				<Submit />
			</form>
		</admin-rule-setting>
	)
}
RuleSetting.propTypes = {
	rule: React.PropTypes.object,
}

export default RuleSetting
