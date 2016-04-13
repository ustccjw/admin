import React from 'react'
import Signin from '../../component/signin'

import { loadProps } from '../../action/signin'

const SigninContainer = props => <Signin {...props} />
SigninContainer.loadProps = loadProps
export default SigninContainer
