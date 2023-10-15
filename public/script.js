const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");

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
					<button type="button" class="delete-btn" data-id="${_id}">
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

formDOM.addEventListener("submit", async (event) => {
	event.preventDefault();
	const name = taskInputDOM.value;

	try {
		await axios.post("/api/v1/tasks", {name: name})
		showTasks();
		taskInputDOM.value = "";
	} catch (error) {
		console.log(error);
	}
})

tasksDOM.addEventListener("click", async (event) => {
	const element = event.target;
	if (element.parentElement.classList.contains("delete-btn")) {
		const id = element.parentElement.dataset.id;
		try {
			await axios.delete(`/api/v1/tasks/${id}`)
			showTasks();
		} catch (error) {
			console.log(error);
		}
	}
})