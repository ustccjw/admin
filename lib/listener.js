import { hashHistory as history } from 'react-router'
import { dataModel } from '../model'

history.listen(location => {
	global.pathname = location.pathname

	// location 改变，重新刷新数据
	dataModel.setCache(null)
})
