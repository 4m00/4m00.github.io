const loginForm = document.getElementById('login-form');
const loginSection = document.getElementById('login-section');
const appSection = document.getElementById('app-section');
const userNameElement = document.getElementById('user-name');
const processList = document.getElementById('process-list');
const processForm = document.getElementById('process-form');

// База данных
const database = {
  users: ['admin', 'user'],
  processes: []
};

// Функция для отображения списка процессов
function renderProcessList() {
  processList.innerHTML = '';
  database.processes.forEach(process => {
    const listItem = document.createElement('li');
    listItem.textContent = `${process.name} (${process.startDate} - ${process.endDate || 'Открытая'})`;
    processList.appendChild(listItem);
  });
}

// Обработчик события для формы входа
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  if (database.users.includes(username)) {
    loginSection.style.display = 'none';
    appSection.style.display = 'block';
    userNameElement.textContent = username;
    renderProcessList();
  } else {
    alert('Неверное имя пользователя');
  }
  loginForm.reset();
});

// Обработчик события для формы добавления процесса
processForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const processName = document.getElementById('process-name').value.trim();
  const processStartDate = document.getElementById('process-start').value;
  const processEndDate = document.getElementById('process-end').value;
  const processTask = document.getElementById('process-task').value.trim();
  const processEmployees = document.getElementById('process-employees').value.trim().split(',');
  if (processName && processStartDate && processTask && processEmployees.length > 0) {
    const newProcess = {
      name: processName,
      startDate: processStartDate,
      endDate: processEndDate || null,
      task: processTask,
      employees: processEmployees
    };
    database.processes.push(newProcess);
    renderProcessList();
    processForm.reset();
  }
});
