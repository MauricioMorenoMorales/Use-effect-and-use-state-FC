import React, { useState, useEffect } from 'react'
import TaskRow from './components/TaskRow'

import TaskBanner from './components/TaskBanner'
import TaskCreator from './components/TaskCreator'
import VisibilityControl from './components/VisibilityControl'

const App = () => {
	const [userName, setUserName] = useState('fazt')
	const [taskItems, setTaskItems] = useState([
		{ name: 'Task One', done: false },
		{ name: 'Task Two', done: true },
		{ name: 'Task Three', done: true },
		{ name: 'Task Four', done: false },
	])
	const [showCompleted, setShowCompleted] = useState(true)

	useEffect(() => {
		let data = localStorage.getItem('tasks')
		if (data != null) {
			setTaskItems(JSON.parse(data))
		} else {
			setUserName('Fazt')
			setTaskItems([
				{ name: 'Task One', done: false },
				{ name: 'Task Two', done: true },
				{ name: 'Task Three', done: true },
				{ name: 'Task Four', done: false },
			])
			setShowCompleted(true)
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(taskItems))
	}, [taskItems])

	const createNewTask = taskName =>
		!taskItems.find(t => t.name === taskName) &&
		setTaskItems([...taskItems, { name: taskName, done: false }])

	const toggleTask = task =>
		setTaskItems(
			taskItems.map(t => (t.name === task.name ? { ...t, done: !t.done } : t)),
		)

	const taskTableRows = doneValue =>
		taskItems
			.filter(task => task.done === doneValue)
			.map(task => (
				<TaskRow task={task} key={task.name} toggleTask={toggleTask} />
			))

	return (
		<>
			<TaskBanner userName={userName} taskItems={taskItems} />
			<TaskCreator callback={createNewTask} />
			<table className="table table-striped table-border">
				<thead>
					<tr>
						<th>Description</th>
						<th>Done</th>
					</tr>
				</thead>
				<tbody>{taskTableRows(false)}</tbody>
			</table>
			<div className="text-center pd-4">
				<VisibilityControl
					description="Completed Tasks"
					isChecked={showCompleted}
					callback={checked => setShowCompleted(checked)}
				/>
			</div>
			{showCompleted && (
				<table className="table table-striped table-bordered">
					<thead>
						<tr>
							<th>Description</th>
							<th>Done</th>
						</tr>
					</thead>
					<tbody>{taskTableRows(true)}</tbody>
				</table>
			)}
		</>
	)
}

export default App
