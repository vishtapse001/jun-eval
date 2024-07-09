const taskList = document.getElementById("task-list");
const paginationContainer = document.getElementById("pagination");

const apiUrl = "http://localhost:3000/tasks"; // Replace with your JSON-server URL

let currentPage = 1;
const perPage = 5; // Number of tasks per page

// Fetch tasks from JSON-server
async function fetchTasks() {
  try {
    const response = await fetch(
      `${apiUrl}?_page=${currentPage}&_limit=${perPage}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    const tasks = await response.json();
    displayTasks(tasks);
    setupPagination();
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
  }
}

// Display tasks in the UI
function displayTasks(tasks) {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");
    const priority = calculatePriority(task.dueDate);
    taskCard.innerHTML = `
      <h2>${task.title}</h2>
      <p>Description: ${task.description}</p>
      <p>Status: ${task.status}</p>
      <p>Due Date: ${task.dueDate}</p>
      <p>Priority: <span class="priority">${priority}</span></p>
      <button onclick="editTask(${task.id})">Edit</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(taskCard);
  });
}

// Calculate priority based on due date
function calculatePriority(dueDate) {
  const now = new Date();
  const due = new Date(dueDate);
  const diffMs = due - now;
  const diffMins = Math.ceil(diffMs / (1000 * 60));
  if (diffMins <= 2) {
    return "High";
  } else if (diffMins <= 3) {
    return "Medium";
  } else {
    return "Low";
  }
}

// Pagination setup
function setupPagination() {
  paginationContainer.innerHTML = "";
  const prevButton = document.createElement("button");
  prevButton.innerText = "Previous";
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchTasks();
    }
  });
  paginationContainer.appendChild(prevButton);

  const nextButton = document.createElement("button");
  nextButton.innerText = "Next";
  nextButton.addEventListener("click", () => {
    currentPage++;
    fetchTasks();
  });
  paginationContainer.appendChild(nextButton);
}

// Initialize page
fetchTasks();

// Implement CRUD operations: create, edit, delete tasks
function editTask(id) {
  // Implement edit task functionality
  console.log(`Editing task with id ${id}`);
}

function deleteTask(id) {
  // Implement delete task functionality
  console.log(`Deleting task with id ${id}`);
}
