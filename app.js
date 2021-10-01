const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];



(function(arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce( (acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

//Обьект с имена тем, каждая тема хранит свои переменные
  const themes = {
    default: {
      '--base-text-color': '#212529',
      '--header-bg': '#007bff',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#007bff',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#0069d9',
      '--default-btn-border-color': '#0069d9',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },
    dark: {
      '--base-text-color': '#212529',
      '--header-bg': '#343a40',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
    light: {
      '--base-text-color': '#212529',
      '--header-bg': '#fff',
      '--header-text-color': '#212529',
      '--default-btn-bg': '#fff',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#e8e7e7',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#f1b5bb',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
  };
  let lastSelectedTheme = 'default';

 // Элемент UI
 const listContainer = document.querySelector('.tasks-list-section .list-group')
 const form = document.forms['addTask'];
 const inputTitle = form.elements['title'];
 const inputBody = form.elements['body'];
 const messageNoTaskHtml = document.querySelector('.task');
 let showSortTask = false;
 const themeSelect = document.getElementById('themeSelect');


// Events
  renderAlltasks(objOfTasks);
  form.addEventListener('submit', onFormSubmitHandler);
  listContainer.addEventListener('click', onDeleteHandler);
  listContainer.addEventListener('click', onCompletedHandler);
  themeSelect.addEventListener('change', onThemeSelectHadler);



// Добавление tasks в listContainer
  function renderAlltasks(tasksList) {
      if (!tasksList) {
        console.error('Передайте список задач!')
        return;
      }

      const fragment = document.createDocumentFragment();
      Object.values(tasksList).forEach(task => {
        const li = listItemTempleta(task);
        fragment.appendChild(li);
      });

      listContainer.appendChild(fragment)
  }

// Создание разметки
  function listItemTempleta( { _id, title , body, completed} = {}) {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');
    li.setAttribute('data-task-id', _id)


    const span = document.createElement('span');
    span.classList.add('title');
    span.textContent = title;
    span.style.fontWeight = 'bold';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn')
    deleteBtn.textContent = 'Delete task'

    const completedBtn = document.createElement('button')
    completedBtn.classList.add('completed-btn')
    completedBtn.textContent = 'Completed'
    if (completed) {
      li.classList.add('color')
    }

    const article = document.createElement('p');
    article.classList.add('mt-2', 'w-100')
    article.textContent = body;

    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(article);
    li.appendChild(completedBtn);


    return li;
  }

//Объект событыия для form
  function onFormSubmitHandler (e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!titleValue || !bodyValue) {
      alert('Пожалуйста введите Task title и Task body')
        return;
    }
    const task = createNewTask(titleValue, bodyValue)
    const listItem = listItemTempleta(task);
    listContainer.insertAdjacentElement('afterbegin', listItem)
    messageNoTask()
    form.reset();
  }

// Создаёт task
  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`,
    };

    objOfTasks[newTask._id] = newTask;

    return { ...newTask };
  }

//Объект событыия (удаление task) для listContainer
  function onDeleteHandler({target}) {
    if (target.classList.contains('delete-btn')) {
      const parent = target.closest('[data-task-id]')
      const id = parent.dataset.taskId;
      const confirmed =  returnsConfirm(id);
      deleteTaskFormHtml(confirmed, parent)
      messageNoTask()

    }
  }

// Удаляет task
  function deleteTaskFormHtml (confirmed,el) {
    if (!confirmed) return;
    el.remove();
  }

// возвращает Confirm
  function returnsConfirm(id) {
    const {title} = objOfTasks[id];
    const isConfirm = confirm(`Вы точно хотите удалчить задачу: ${title}`)
    if (!isConfirm) return isConfirm;
    delete objOfTasks[id];
    return isConfirm;
  }

//Если нет ни одно задачи появляеться плашка
 function messageNoTask() {
   if (Array.from(listContainer.children).length != 0) {
    messageNoTaskHtml.classList.remove('task-block')
   } else {
    messageNoTaskHtml.classList.add('task-block')
   }
 }

//Объект событыия (завершение task) для listContainer
function onCompletedHandler( {target}) {
  if (target.classList.contains('completed-btn')) {
    const parent = target.closest('[data-task-id]')
    const id = parent.dataset.taskId;
    parent.classList.toggle('color')

    if(objOfTasks[id].completed === true) {
      objOfTasks[id].completed = false
    } else {
      objOfTasks[id].completed = true;
    }
  }
  sortcompletedTask();
}


//All tasks фильтр
const allBtn = document.querySelector('.all-btn');
allBtn.addEventListener('click', () => {
  let arr = Array.from(listContainer.children)
  arr.forEach(item => {
    item.classList.remove('displayNone');
  })
  allBtn.classList.add('all-btn--active')
  noCompletedBtn.classList.remove('nocompleted-btn--active')
  document.querySelector('.nocompleted-task').classList.remove('nocompleted-block')
  showSortTask  = false
})

//No Completed tasks фильтр
const noCompletedBtn = document.querySelector('.nocompleted-btn');
noCompletedBtn.addEventListener('click', () => {
  allBtn.classList.remove('all-btn--active')
  noCompletedBtn.classList.add('nocompleted-btn--active')
  completedTask();
  let arr = Array.from(listContainer.children);
  let arrFilter = arr.filter(item => !item.classList.contains('displayNone'))
  if (!arrFilter.length) {
      document.querySelector('.nocompleted-task').classList.add('nocompleted-block')
  }

})

function completedTask () {
  let arr = Array.from(listContainer.children)
  let sortList = arr.filter(item => {
    return objOfTasks[item.dataset.taskId].completed === true
  });
  sortList.forEach(item => {
    item.classList.add('displayNone')
  })
  showSortTask = true;
}

//Сортирует элементы на завершёные и незавершнные
function sortcompletedTask() {
  let arr = Array.from(listContainer.children);
  let sortList = arr.sort( (a,b) => {
    return objOfTasks[a.dataset.taskId].completed > objOfTasks[b.dataset.taskId].completed ? 1 : -1;
  })
  arr.forEach(item => item.remove())
  sortList.forEach(item => listContainer.appendChild(item))
}
sortcompletedTask();


//обработчик события изменение select
function onThemeSelectHadler (e) {
   const selectedTheme = themeSelect.value;
   const isConfirmed = confirm(`Вы действительно хотите выбрать тему: ${selectedTheme}`)
   if(!isConfirmed) {
    themeSelect.value = lastSelectedTheme;
    return;
   };
   setTheme(selectedTheme);
   lastSelectedTheme = selectedTheme;
}

//Устанавливает тему
function setTheme(name) {
  const selectedThemeObj = themes[name];
  Object.entries(selectedThemeObj).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value)
  })
}

})(tasks);







