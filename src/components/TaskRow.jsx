import React from 'react'

const TaskRow = props => {
	return (
		<tr key={props.task.name}>
			<td>{props.task.name}</td>
			<td>
				<input
					type="checkbox"
					name=""
					id=""
					checked={props.task.done}
					onChange={() => props.toggleTask(props.task)}
				/>
			</td>
		</tr>
	)
}

export default TaskRow
