import Task from './task.js';

const oneSecond = 1000
const runInOneSecond = new Date(Date.now() + oneSecond)
const runInTwoSeconds = new Date(Date.now() + oneSecond * 2)
const runInThreeSeconds = new Date(Date.now() + oneSecond * 3)

const task = new Task()
task.save({
  name: 'task1',
  dueAt: runInOneSecond,
  fn: ()=> console.log('executed task1'), 
})
task.save({
  name: 'task2',
  dueAt: runInTwoSeconds,
  fn: ()=> console.log('executed task2'), 
})
task.save({
  name: 'task3',
  dueAt: runInThreeSeconds,
  fn: ()=> console.log('executed task3'), 
})

task.run(oneSecond)