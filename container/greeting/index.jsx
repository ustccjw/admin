import React from 'react'
import Greeting from '../../component/greeting'

import { loadProps } from '../../action/greeting'

const GreetingContainer = props => <Greeting {...props} />
GreetingContainer.loadProps = loadProps
export default GreetingContainer
