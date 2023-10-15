const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

const showTasks = async () => {
	try {
		const { data: tasks } = await axios.get("/api/v1/tasks");

		if (!tasks.length) {
			return tasksDOM.innerHTML = `<h5 class="empty-list">タスクが存在しません</h5>`;
		}

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

let alertTimeout;

formDOM.addEventListener("submit", async (event) => {
	event.preventDefault();
	const name = taskInputDOM.value;

	try {
		await axios.post("/api/v1/tasks", {name: name})
		showTasks();
		taskInputDOM.value = "";
		formAlertDOM.style.display = "block";
		formAlertDOM.textContent = "タスクを追加しました";
		formAlertDOM.classList.add("text-success")
	} catch (error) {
		console.log(error);
		formAlertDOM.style.display = "block";
		formAlertDOM.innerHTML = "20文字以下にしてください"
	}
	if (alertTimeout)
		clearTimeout(alertTimeout);
	alertTimeout = setTimeout(() => {
		formAlertDOM.style.display = "none";
		formAlertDOM.classList.remove("text-success")
	}, 3000);
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