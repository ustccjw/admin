import falcor from 'falcor'
import DataRouter from './data-router'
import * as uiRouter from './ui-router'

// dataModel 按对象实体划分
export const dataModel = new falcor.Model({
	source: new DataRouter(),
})

// uiModel 按 route component 划分
export const uiModel = new falcor.Model({
	cache: uiRouter,
})
