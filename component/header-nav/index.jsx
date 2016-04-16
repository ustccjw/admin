import React from 'react'
import { hashHistory as history } from 'react-router'
import AppBar from 'material-ui/lib/app-bar'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import FlatButton from 'material-ui/lib/flat-button'

import './style'

import { setModal, signout } from '../../action/app'

const Header = ({ title }) => {
	const icon = title !== '登录' ? (
		<FlatButton label="注销" onClick={async () => {
			await signout()
			history.push('/signin/')
		}} />
	) : null
	return (
		<header>
			<AppBar title={title} iconElementRight={icon}
				onLeftIconButtonTouchTap={() => setModal('nav')} />
		</header>
	)
}
Header.propTypes = {
	title: React.PropTypes.string.isRequired,
}

const Nav = ({ modalName, links }) => {
	const linkList = links.map(({ title, href }) =>
		<MenuItem key={title} onTouchTap={async () => {
			await setModal()
			history.push(href)
		}}>{title}</MenuItem>
	)
	return (
		<nav>
			<LeftNav docked={false} width={250} open={modalName === 'nav'}
				onRequestChange={open => open ? setModal('nav') : setModal() }>
				<AppBar data-appbar title="维尼控制台" showMenuIconButton={false} />
				{linkList}
			</LeftNav>
		</nav>
	)
}
Nav.propTypes = {
	modalName: React.PropTypes.string.isRequired,
	links: React.PropTypes.array.isRequired,
}

const HeaderNav = props => {
	const { title, links, modalName } = props
	return (
		<admin-header-nav>
			<Header title={title} />
			<Nav links={links} modalName={modalName} />
		</admin-header-nav>
	)
}
HeaderNav.propTypes = {
	title: React.PropTypes.string.isRequired,
	links: React.PropTypes.array.isRequired,
	modalName: React.PropTypes.string.isRequired,
}

export default HeaderNav
