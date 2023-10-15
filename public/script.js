const tasksDOM = document.querySelector(".tasks");

const showTasks = async () => {
	try {
		const { data: tasks } = await axios.get("/api/v1/tasks");
		const allTasks = tasks.map((task) => {
			const { completed, name, _id } = task;
			return `
			<div class="single-task">
				<h5>
					<span>
						<i class="fas fa-check-circle"></i>
					</span>
					${name}
				</h5>
				<div class="task-links">
					<a href="#" class="edit-link">
						<i class="fas fa-edit"></i>
					</a>
					<button type="button" class="delete-btn">
						<i class="fas fa-trash"></i>
					</button>
				</div>
			</div>
			`
		}).join("");
		tasksDOM.innerHTML = allTasks;
	} catch (err) {
		console.log(err);
	}
}

showTasks();