import React, { useState } from 'react'
import TaskRow from './components/TaskRow'

function App() {
	const [userName, setUserName] = useState('fazt')
	const [taskItems, setTaskItems] = useState([
		{ name: 'Task One', done: false },
		{ name: 'Task Two', done: true },
		{ name: 'Task Three', done: true },
		{ name: 'Task Four', done: false },
	])

	const toggleTask = task =>
		setTaskItems(
			taskItems.map(t => (t.name === task.name ? { ...t, done: !t.done } : t)),
		)

	const taskTableRows = () =>
		taskItems.map(task => (
			<TaskRow task={task} key={task.name} toggleTask={toggleTask} />
		))

	return (
		<>
			<table className="table table-striped table-border">
				<thead>
					<tr>
						<th>Description</th>
						<th>Done</th>
					</tr>
				</thead>
				<tbody>{taskTableRows()}</tbody>
			</table>
		</>
	)
}

export default App
