import { it, expect, describe, beforeEach, jest } from '@jest/globals'
import Task from '../src/task.js';
import { setTimeout } from "node:timers/promises"

describe('Task test suite', () => {

	let _logMock
	let _task

	beforeEach(() => {

		_logMock = jest.spyOn(
			console,
			console.log.name
		).mockImplementation()

		_task = new Task()
	})

	it.skip('should only run tasks that are due without fake timers (slow)', async () => {
		// A
		const tasks = [
			{
				name: "task-run-5-sec",
				dueAt: new Date(Date.now() + 5000),
				fn: jest.fn()
			},
			{
				name: "task-run-10-sec",
				dueAt: new Date(Date.now() + 10000),
				fn: jest.fn()
			}
		]

		// AA
		_task.save(tasks.at(0))
		_task.save(tasks.at(1))
		_task.run(200)

		await setTimeout(11e3)

		// verificando se as funções foi chamada 
		expect(tasks.at(0).fn).toHaveBeenCalled()
		expect(tasks.at(1).fn).toHaveBeenCalled()
	}, 15e3)

	it('should only run tasks that are due with fake timers (fast)', async () => {

		jest.useFakeTimers()
		// A
		const tasks = [
			{
				name: "task-run-5-sec",
				dueAt: new Date(Date.now() + 5000),
				fn: jest.fn()
			},
			{
				name: "task-run-10-sec",
				dueAt: new Date(Date.now() + 10000),
				fn: jest.fn()
			}
		]

		// AA
		_task.save(tasks.at(0))
		_task.save(tasks.at(1))
		_task.run(200)

		// avançando 4 segundos
		jest.advanceTimersByTime(4000)
		// ninguem deve ser executado ainda 
		expect(tasks.at(0).fn).not.toHaveBeenCalled()
		expect(tasks.at(1).fn).not.toHaveBeenCalled()

		jest.advanceTimersByTime(2000)
		// so a primeira tarefa deve executar
		expect(tasks.at(0).fn).toHaveBeenCalled()
		expect(tasks.at(1).fn).not.toHaveBeenCalled()

		jest.advanceTimersByTime(4000)
		// a segunda tarefa deve executar
		expect(tasks.at(1).fn).toHaveBeenCalled()

		jest.useRealTimers()
	})
})