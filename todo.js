const allOptions = document.querySelector('#all');
const inProgress = document.querySelector('#progress');
const completed = document.querySelector('#completed');
const input = document.querySelector('#input');
const ul = document.querySelector('#toDos');

const createElement = () => {
  const li = document.createElement('li');
  const text = document.createTextNode(input.value);
  li.append(text);
  li.insertAdjacentHTML('beforeend', '<button class="deleteBtn">❌</button>');

  if (completed.classList.contains('selected')) {
    li.style.display = 'none';
  } else {
    li.style.display = 'block';
  }

  if (input.value.trim().length > 0) {
    ul.append(li);
    input.value = '';
  }
  deleteHandler();
}

const updateElements = () => {
  const li = document.querySelectorAll('li');
  li.forEach((el) => el.style.display = 'block');
}

const filterElements = (isCompleted) => {
  const li = document.querySelectorAll('li');
  
  li.forEach((el) => {
    if (isCompleted) {
      el.style.display = el.className === 'checked' ? 'block' : 'none';
    }
    else {
      el.style.display = el.className !== 'checked' ? 'block' : 'none';;
    }
  });
}

const deleteHandler = () => {
  const deleteBtn = document.querySelectorAll('.deleteBtn');
  deleteBtn.forEach((el) => el.onclick = () => el.parentElement.remove());
}

add.onclick = () => {
  createElement();
}

ul.addEventListener('click', (ev) => {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
  if (completed.classList.contains('selected')) {
    filterElements(true);
  }
  else if (inProgress.classList.contains('selected')) {
    filterElements(false);
  } 
});

all.onclick = () => {
  updateElements();
  allOptions.classList.add('selected');
  completed.classList.remove('selected');
  inProgress.classList.remove('selected');
}

progress.onclick = () => {
  filterElements(false);
  inProgress.classList.add('selected');
  completed.classList.remove('selected');
  allOptions.classList.remove('selected');
  
}

completed.onclick = () => {
  filterElements(true);
  completed.classList.add('selected');
  allOptions.classList.remove('selected');
  inProgress.classList.remove('selected');
}

clear.onclick = () => {
  const deleteBtn = document.querySelectorAll('.deleteBtn');
  console.log(deleteBtn.length);
  deleteBtn.forEach((el) => el.parentElement.remove());
}

document.addEventListener('keydown', (event) => {
  if (event.code == 'Enter') {
    createElement();
  }
});
