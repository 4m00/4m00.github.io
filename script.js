// Определяем объект базы данных
let database = {
  processes: [],
  materials: [],
  equipment: [],
  qualityChecks: [],
  costs: [],
  orders: []
};

// Обработчик события для навигационных ссылок
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', handleNavLinkClick);
});

function handleNavLinkClick(event) {
  event.preventDefault();
  const linkId = event.target.dataset.link;
  showSection(linkId);
}

// Функция для отображения раздела приложения
const sections = {
  'current-processes': document.getElementById('process-section'),
  'add-process': document.getElementById('add-process-section'),
  'all-processes': document.getElementById('process-section'),
  'materials': document.getElementById('materials-section'),
  'equipment': document.getElementById('equipment-section'),
  'quality-control': document.getElementById('quality-control-section'),
  'cost-management': document.getElementById('cost-management-section'),
  'process-visualization': document.getElementById('process-visualization-section'),
  'orders': document.getElementById('orders-section')
};

function showSection(sectionId) {
  Object.values(sections).forEach(section => {
    section.style.display = 'none';
  });

  const selectedSection = sections[sectionId];
  if (selectedSection) {
    selectedSection.style.display = 'block';
    switch (sectionId) {
      case 'current-processes':
      case 'all-processes':
        renderProcessList();
        break;
      case 'materials':
        renderMaterialsList();
        break;
      case 'equipment':
        renderEquipmentList();
        break;
      case 'quality-control':
        renderQualityChecksList();
        break;
      case 'cost-management':
        renderCostsList();
        break;
      case 'orders':
        renderOrdersList();
        break;
      default:
        break;
    }
  }
}

// Функция для отображения списка процессов
const processList = document.getElementById('process-list');

function renderProcessList() {
  processList.innerHTML = '';
  database.processes.forEach((process, index) => {
    const listItem = document.createElement('li');
    const removeButton = document.createElement('button');
    const editButton = document.createElement('button');
    removeButton.textContent = 'Удалить';
    editButton.textContent = 'Редактировать';
    removeButton.addEventListener('click', () => removeProcess(index));
    editButton.addEventListener('click', () => editProcess(index));
    listItem.textContent = `${process.name} (${process.startDate} - ${process.endDate || 'Открытая'})`;
    listItem.appendChild(removeButton);
    listItem.appendChild(editButton);
    processList.appendChild(listItem);
  });
}

// Функции для работы с материалами
const materialsList = document.getElementById('materials-list');

function renderMaterialsList() {
  materialsList.innerHTML = '';
  database.materials.forEach((material, index) => {
    const listItem = document.createElement('li');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Удалить';
    removeButton.addEventListener('click', () => removeMaterial(index));
    listItem.textContent = `${material.name} (${material.quantity} ${material.unit})`;
    listItem.appendChild(removeButton);
    materialsList.appendChild(listItem);
  });
}

function removeMaterial(index) {
  database.materials.splice(index, 1);
  renderMaterialsList();
}

const materialForm = document.getElementById('material-form');
materialForm.addEventListener('submit', handleAddMaterial);

function handleAddMaterial(event) {
  event.preventDefault();
  const materialName = document.getElementById('material-name').value.trim();
  const materialQuantity = document.getElementById('material-quantity').value;
  const materialUnit = document.getElementById('material-unit').value.trim();

  if (materialName && materialQuantity && materialUnit) {
    const newMaterial = {
      name: materialName,
      quantity: materialQuantity,
      unit: materialUnit
    };
    database.materials.push(newMaterial);
    renderMaterialsList();
    materialForm.reset();
  } else {
    alert('Заполните все поля формы');
  }
}

// Функции для работы с оборудованием
const equipmentList = document.getElementById('equipment-list');

function renderEquipmentList() {
  equipmentList.innerHTML = '';
  database.equipment.forEach((equipment, index) => {
    const listItem = document.createElement('li');
    const removeButton = document.createElement('button');
    const editButton = document.createElement('button');
    removeButton.textContent = 'Удалить';
    editButton.textContent = 'Редактировать';
    removeButton.addEventListener('click', () => removeEquipment(index));
    editButton.addEventListener('click', () => editEquipment(index));
    listItem.textContent = `${equipment.name} (${equipment.type}, ${equipment.status})`;
    listItem.appendChild(removeButton);
    listItem.appendChild(editButton);
    equipmentList.appendChild(listItem);
  });
}

function removeEquipment(index) {
  database.equipment.splice(index, 1);
  renderEquipmentList();
}

function editEquipment(index) {
  const equipment = database.equipment[index];
  const equipmentForm = document.getElementById('equipment-form');
  equipmentForm['equipment-name'].value = equipment.name;
  equipmentForm['equipment-type'].value = equipment.type;
  equipmentForm['equipment-status'].value = equipment.status;
  // Добавьте здесь код для отображения формы редактирования оборудования
}

const equipmentForm = document.getElementById('equipment-form');
equipmentForm.addEventListener('submit', handleAddEquipment);

function handleAddEquipment(event) {
  event.preventDefault();
  const equipmentName = document.getElementById('equipment-name').value.trim();
  const equipmentType = document.getElementById('equipment-type').value.trim();
  const equipmentStatus = document.getElementById('equipment-status').value;

  if (equipmentName && equipmentType && equipmentStatus) {
    const newEquipment = {
      name: equipmentName,
      type: equipmentType,
      status: equipmentStatus
    };
    database.equipment.push(newEquipment);
    renderEquipmentList();
    equipmentForm.reset();
  } else {
    alert('Заполните все поля формы');
  }
}

// Функции для работы с проверками качества
const qualityChecksList = document.getElementById('quality-checks-list');

function renderQualityChecksList() {
  qualityChecksList.innerHTML = '';
  database.qualityChecks.forEach((check, index) => {
    const listItem = document.createElement('li');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Удалить';
    removeButton.addEventListener('click', () => removeQualityCheck(index));
    listItem.textContent = `${check.product} (${check.date}, ${check.result})`;
    listItem.appendChild(removeButton);
    qualityChecksList.appendChild(listItem);
  });
}

function removeQualityCheck(index) {
  database.qualityChecks.splice(index, 1);
  renderQualityChecksList();
}

const qualityCheckForm = document.getElementById('quality-check-form');
qualityCheckForm.addEventListener('submit', handleAddQualityCheck);

function handleAddQualityCheck(event) {
  event.preventDefault();
  const product = document.getElementById('quality-check-product').value.trim();
  const date = document.getElementById('quality-check-date').value;
  const result = document.getElementById('quality-check-result').value;
  const notes = document.getElementById('quality-check-notes').value.trim();

  if (product && date && result) {
    const newCheck = {
      product,
      date,
      result,
      notes
    };
        database.qualityChecks.push(newCheck);
    renderQualityChecksList();
    qualityCheckForm.reset();
  } else {
    alert('Заполните все обязательные поля');
  }
}

// Функции для работы со статьями расходов
const costsList = document.getElementById('costs-list');

function renderCostsList() {
  costsList.innerHTML = '';
  database.costs.forEach((cost, index) => {
    const listItem = document.createElement('li');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Удалить';
    removeButton.addEventListener('click', () => removeCost(index));
    listItem.textContent = `${cost.name} (${cost.amount}, ${cost.date})`;
    listItem.appendChild(removeButton);
    costsList.appendChild(listItem);
  });
}

function removeCost(index) {
  database.costs.splice(index, 1);
  renderCostsList();
}

const costForm = document.getElementById('cost-form');
costForm.addEventListener('submit', handleAddCost);

function handleAddCost(event) {
  event.preventDefault();
  const costName = document.getElementById('cost-name').value.trim();
  const costAmount = document.getElementById('cost-amount').value;
  const costDate = document.getElementById('cost-date').value;

  if (costName && costAmount && costDate) {
    const newCost = {
      name: costName,
      amount: costAmount,
      date: costDate
    };
    database.costs.push(newCost);
    renderCostsList();
    costForm.reset();
  } else {
    alert('Заполните все поля формы');
  }
}

// Функции для работы с заказами
const ordersList = document.getElementById('orders-list');

function renderOrdersList() {
  ordersList.innerHTML = '';
  database.orders.forEach((order, index) => {
    const listItem = document.createElement('li');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Удалить';
    removeButton.addEventListener('click', () => removeOrder(index));
    listItem.textContent = `${order.product} (${order.quantity}, ${order.dueDate})`;
    listItem.appendChild(removeButton);
    ordersList.appendChild(listItem);
  });
}

function removeOrder(index) {
  database.orders.splice(index, 1);
  renderOrdersList();
}

const orderForm = document.getElementById('order-form');
orderForm.addEventListener('submit', handleAddOrder);

function handleAddOrder(event) {
  event.preventDefault();
  const orderProduct = document.getElementById('order-product').value.trim();
  const orderQuantity = document.getElementById('order-quantity').value;
  const orderDueDate = document.getElementById('order-duedate').value;

  if (orderProduct && orderQuantity && orderDueDate) {
    const newOrder = {
      product: orderProduct,
      quantity: orderQuantity,
      dueDate: orderDueDate
    };
    database.orders.push(newOrder);
    renderOrdersList();
    orderForm.reset();
  } else {
    alert('Заполните все поля формы');
  }
}

// Показываем приветственный раздел по умолчанию
showSection('current-processes');
