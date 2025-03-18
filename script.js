document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const newTaskBtn = document.getElementById("newTask");
    const taskList = document.querySelector(".task-list");
    const progress = document.getElementById("progress");
    const numbers = document.getElementById("numbers");

    let tasks = [];

    // Function to update progress
    function updateProgress() {
        const completedTasks = tasks.filter(task => task.completed).length;
        const totalTasks = tasks.length;
        const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        
        progress.style.width = `${percentage}%`;
        numbers.textContent = `${completedTasks} / ${totalTasks}`;

        // If all tasks are completed, show confetti
        if (completedTasks === totalTasks && totalTasks > 0) {
            launchConfetti();
        }
    }

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.classList.add("task-item");
            if (task.completed) li.classList.add("completed");

            li.innerHTML = `
                <input type="checkbox" ${task.completed ? "checked" : ""} data-index="${index}">
                <span>${task.text}</span>
                <button class="delete-btn" data-index="${index}">🗑</button>
            `;

            taskList.appendChild(li);
        });

        updateProgress();
    }

    // Function to add a new task
    newTaskBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        tasks.push({ text: taskText, completed: false });
        taskInput.value = "";
        renderTasks();
    });

    // Function to handle checkbox and delete button clicks
    taskList.addEventListener("click", (event) => {
        const index = event.target.dataset.index;

        if (event.target.type === "checkbox") {
            tasks[index].completed = event.target.checked;
        } else if (event.target.classList.contains("delete-btn")) {
            tasks.splice(index, 1);
        }

        renderTasks();
    });

    // Confetti effect
    function launchConfetti() {
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        function frame() {
            confetti({
                particleCount: 5,
                spread: 80
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }

        frame();
    }

    renderTasks();
});



