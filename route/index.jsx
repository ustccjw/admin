import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import AppContainer from '../container/app'
import GreetingContainer from '../container/greeting'
import SigninContainer from '../container/signin'

const routes = (
	<Route path="/" component={AppContainer}>
		<IndexRedirect to="greeting/" />
		<Route path="greeting/" component={GreetingContainer} />
		<Route path="signin/" component={SigninContainer} />
	</Route>
)

export default routes
