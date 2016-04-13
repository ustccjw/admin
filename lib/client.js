import { hashHistory as history } from 'react-router'
import Fetch from 'fetch.io'

const isPro = location.host.startsWith('s4y.baixing.com.cn')
const miqiApiPrefix = !isPro ? '/api/v1' : 'http://sales.baixing.com.cn/api/v1'

function handleResponse(body) {
	const { msg, desc } = body
	const pathname = global.pathname
	if (msg === 'login first' && pathname !== '/signin/') {
		history.push({
			pathname: '/signin/',
			query: { redirect: encodeURIComponent(pathname) },
		})
	}
	if (msg !== 'success') {
		throw new Error(`${msg}: ${desc}`)
	}
}

export const weini = new Fetch({
	prefix: '/weini/api/public/v2',
	afterJSON: handleResponse,
})

export const miqi = new Fetch({
	credentials: 'include',
	mode: 'cors',
	prefix: miqiApiPrefix,
	afterJSON: handleResponse,
})
