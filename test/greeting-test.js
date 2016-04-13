/* eslint-disable no-undef, prefer-arrow-callback */

import expect from 'expect'
import { hashHistory as history } from 'react-router'
import { Simulate } from 'react-addons-test-utils'

describe('greeting', function () {
	let root = document

	before(function (done) {
		history.push('/greeting/')
		setTimeout(() => {
			root = document.querySelector('admin-greeting')
			done()
		}, 1000)
	})

	it('tab default', function () {
		const tab = root.querySelector('div[data-tabs] button[data-selected=true]')
		expect(tab).toExist()
	})

	it('tab select', function (done) {
		const tab = root.querySelector('div[data-tabs] button:nth-child(2)')
		Simulate.touchTap(tab)
		setTimeout(() => {
			expect(tab.getAttribute('data-selected')).toBe('true')
			done()
		}, 800)
	})

	it('show scene operator tooltip', function () {
		const dropdown = root.querySelector('div[data-label] a')
		Simulate.click(dropdown)
		const sceneOperator = document.querySelector('admin-scene-operator')
		expect(sceneOperator).toExist()
	})

	it('show update scene modal', function (done) {
		const updateScene = document.querySelector('admin-scene-operator > div:nth-child(2) > span')
		Simulate.click(updateScene)
		setTimeout(() => {
			const sceceSetting = document.querySelector('admin-scene-setting')
			expect(sceceSetting).toExist()
			done()
		}, 800)
	})

	it('hide update scene modal', function (done) {
		const cancel =
			document.querySelector('admin-scene-setting div[data-submit] button[type=button]')
		Simulate.click(cancel)
		setTimeout(() => {
			const sceceSetting = document.querySelector('admin-scene-setting')
			expect(sceceSetting).toNotExist()
			done()
		}, 800)
	})

	it('show update rule modal', function (done) {
		const updateRule = root.querySelector('admin-greeting-rule div[data-operator] a')
		Simulate.click(updateRule)
		setTimeout(() => {
			const ruleSetting = document.querySelector('admin-rule-setting')
			expect(ruleSetting).toExist()
			done()
		}, 800)
	})

	it('hide update rule modal', function (done) {
		const cancel =
			document.querySelector('admin-rule-setting div[data-submit] button[type=button]')
		Simulate.click(cancel)
		setTimeout(() => {
			const ruleSetting = document.querySelector('admin-rule-setting')
			expect(ruleSetting).toNotExist()
			done()
		}, 800)
	})
})
