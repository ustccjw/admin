import React from 'react'
import HeaderNav from '../header-nav'

import './style'

import { navMapping } from '../../constant'

const App = props => {
	const { children, location, modalName } = props
	const { pathname } = location
	const links = Object.keys(navMapping).map(key => ({ title: navMapping[key], href: key }))
	const title = navMapping[pathname] || '登录'
	const cloneChildren = React.Children.map(children, child => {
		const childProps = {
			modalName,
			children: child.props.children,
		}
		return React.cloneElement(child, childProps)
	})
	return (
		<admin-app>
			<HeaderNav title={title} links={links} modalName={modalName} />
			<article>{cloneChildren}</article>
		</admin-app>
	)
}

App.propTypes = {
	children: React.PropTypes.any.isRequired,
	location: React.PropTypes.object.isRequired,
	modalName: React.PropTypes.string.isRequired,
}

export default App
