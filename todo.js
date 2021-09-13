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

  if (input.value.trim().length > 0) {
    ul.append(li);
    input.value = '';
  }
}

const updateClassValue = (elem1, elem2, elem3) => {
  elem1.classList.add('selected');
  elem2.classList.remove('selected');
  elem3.classList.remove('selected');
  
}

const updateElements = () => {
  const li = document.getElementsByTagName('li');

  if (!ul.hasChildNodes()) {
    createElement();
  }

  for (let i = 0; i < li.length; i++) {
    li[i].style.display = 'block';
  }
}

const filterElements = (val1, val2) => {
  const li = document.getElementsByTagName('li');

  for (let i = 0; i < li.length; i++) {
    if (li[i].className === 'checked') {
      li[i].style.display = val1;
    }
    else {
      li[i].style.display = val2;
    }
  }
}

const deleteElement = () => {
  const deleteBtn = document.querySelectorAll('.deleteBtn');
  deleteBtn.forEach((el) => el.onclick = () => el.parentElement.remove());
}

deleteElement();

add.onclick = () => {
  createElement();
  deleteElement();
}

ul.addEventListener('click', (ev) => {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
  if (completed.className === 'filter selected') {
    filterElements('block', 'none');
  }
  else if (inProgress.className === 'filter selected') {
    filterElements('none', 'block');
  } 
});

all.onclick = () => {
  updateElements();
  updateClassValue(allOptions, inProgress, completed);
}

progress.onclick = () => {
  filterElements('none', 'block');
  updateClassValue(inProgress, allOptions, completed);
}

completed.onclick = () => {
  filterElements('block', 'none');
  updateClassValue(completed, allOptions, inProgress);
}

clear.onclick = () => {
  const deleteBtn = document.querySelectorAll('.deleteBtn');
  console.log(deleteBtn.length);
  deleteBtn.forEach((el) => el.parentElement.remove());
}

document.addEventListener('keydown', (event) => {
  if (event.code == 'Enter') {
    createElement();
    deleteElement();
  }
});
