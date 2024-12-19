let tasks = [];

document.getElementById('add-task-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const title = document.getElementById('task-title').value;
  const dueTime = parseInt(document.getElementById('task-due-time').value);
  const priority = parseInt(document.getElementById('task-priority').value);

  tasks.push({ title, dueTime, priority });

  this.reset();

  displayTasks();
});

function displayTasks() {
  const tasksOutput = document.getElementById('tasks-output');
  tasksOutput.innerHTML = ''; 
  
  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.textContent = `Title: ${task.title}, Due Time: ${task.dueTime} minutes, Priority: ${task.priority}`;
    tasksOutput.appendChild(taskElement);
  });
}

document.getElementById('filter-tasks-button').addEventListener('click', function() {
  const timeframe = parseInt(document.getElementById('timeframe').value);
  const filteredTasks = tasks.filter(task => task.dueTime <= timeframe);
  
  const filteredTasksOutput = document.getElementById('filtered-tasks-output');
  filteredTasksOutput.innerHTML = ''; 
  
  if (filteredTasks.length === 0) {
    filteredTasksOutput.textContent = 'No tasks due within this timeframe.';
  } else {
    filteredTasks.forEach(task => {
      const taskElement = document.createElement('div');
      taskElement.textContent = `Title: ${task.title}, Due Time: ${task.dueTime} minutes, Priority: ${task.priority}`;
      filteredTasksOutput.appendChild(taskElement);
    });
  }
});