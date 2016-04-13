import React from 'react'
import NProgress from 'nprogress'
import App from '../../component/app'

import './style'

import { loadProps } from '../../action/app'

export default class AppContainer extends React.Component {
	static propTypes = {
		loading: React.PropTypes.bool.isRequired,
		reload: React.PropTypes.func.isRequired,
	}

	static loadProps = loadProps

	componentWillMount() {
		const { reload } = this.props
		global.reload = reload
	}

	componentWillReceiveProps(nextProps) {
		const { loading } = nextProps
		if (loading) {
			NProgress.start()
		} else {
			NProgress.done()
		}
	}

	shouldComponentUpdate(nextProps) {
		const { loading } = nextProps
		return !loading
	}

	render() {
		return <App {...this.props} />
	}
}
