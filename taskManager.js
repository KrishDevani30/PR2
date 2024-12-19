export const tasks = [];

export function addTask(title, dueTime, priority) {
  try {
    if (!title || !dueTime || !priority) {
      throw new Error('All fields are required!');
    }
    if (typeof dueTime !== 'number' || typeof priority !== 'number') {
      throw new Error('Due time and priority must be numbers!');
    }
    if (priority < 1 || priority > 5) {
      throw new Error('Priority must be between 1 and 5!');
    }

    const newTask = {
      title,
      dueTime,
      priority,
      createdAt: new Date(),
    };

    tasks.push(newTask);
    console.log('Task added:', newTask);
  } catch (error) {
    console.error('Error adding task:', error.message);
  }
}

export function sortTasksByPriority() {
  tasks.sort((a, b) => a.priority - b.priority);
}

export function getTasksDueWithin(timeframe) {
  const currentTime = Date.now();
  return tasks.filter(task => task.dueTime <= timeframe);
}

export function sendReminder(task) {
  setTimeout(() => {
    console.log(`Reminder: Task "${task.title}" is due in ${task.dueTime} minutes!`);
  }, task.dueTime * 60000); 
}

export async function handleReminders() {
  try {
    for (const task of tasks) {
      await new Promise((resolve) => {
        setTimeout(() => {
          sendReminder(task);
          resolve();
        }, task.dueTime * 60000);
      });
    }
  } catch (error) {
    console.error('Error handling reminders:', error.message);
  }
}
