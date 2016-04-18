import React from 'react'
import { hashHistory as history } from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import swal from 'sweetalert'

import './style'

import { signin, handleChange } from '../../action/signin'

const Username = ({ username }) => (
	<div data-username>
		<label>
			<strong>用户名</strong>
			<TextField name="username" defaultValue={username} required autoFocus
				onChange={e => handleChange('username', e.target.value)} />
		</label>
	</div>
)

const Password = ({ password }) => (
	<div data-password>
		<label>
			<strong>密码</strong>
			<TextField name="password" type="password" defaultValue={password} required
				onChange={e => handleChange('password', e.target.value)} />
		</label>
	</div>
)

const Submit = () => (
	<div data-submit>
		<label>
			<RaisedButton label="登录" primary type="submit" />
		</label>
	</div>
)

const Signin = props => {
	const { username, password, redirect } = props
	return (
		<admin-signin>
			<form onSubmit={async e => {
				e.preventDefault()
				try {
					await signin()
					history.push(redirect)
				} catch (err) {
					swal('Oops...', err.message, 'error')
				}
			}}>
				<Username username={username} />
				<Password password={password} />
				<Submit />
			</form>
		</admin-signin>
	)
}

Signin.propTypes = {
	username: React.PropTypes.string.isRequired,
	password: React.PropTypes.string.isRequired,
	redirect: React.PropTypes.string.isRequired,
}

export default Signin
