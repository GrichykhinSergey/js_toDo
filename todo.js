const allOptions = document.getElementById('all');
const inProgress = document.getElementById('progress');
const completed = document.getElementById('completed');
const input = document.getElementById('myInput');
const ul = document.getElementById('myUL');
const deleteBtn = document.getElementsByClassName('delete-btn');

const updateElements = function() {
  const li = document.getElementsByTagName('li');

  for (let i = 0; i < li.length; i++) {
    li[i].style.display = 'block';
  }
}

const updateColors = function(all_val, completed_val, inProgress_val) {
  allOptions.style.backgroundColor = all_val;
  inProgress.style.backgroundColor = completed_val;
  completed.style.backgroundColor = inProgress_val;
}

const filterElements = function(val1, val2){
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

const deleteElement = function() {
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].onclick = function() {
      const li_el = this.parentElement;
      li_el.remove();
    }
  }
}

deleteElement();

add.onclick = function() {
  const li_new = document.createElement('li');
  const text = document.createTextNode(input.value);
  li_new.append(text);
  li_new.insertAdjacentHTML('beforeend', '<button class="delete-btn">❌</button>');

  if (input.value.trim().length > 0) {
    document.getElementById('myUL').append(li_new);
    input.value = '';
  }
  deleteElement();
}

ul.addEventListener('click', function(ev) {
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

all.onclick = function() {
  updateColors('greenyellow', '#eee', '#eee');
  updateElements();
  inProgress.className = 'filter';
  completed.className = 'filter';
}

progress.onclick = function() {
  updateColors('#eee', 'greenyellow', '#eee');
  filterElements('none', 'block');
  inProgress.className = 'filter selected';
  completed.className = 'filter';
}

completed.onclick = function() {
  updateColors('#eee', '#eee', 'greenyellow');
  filterElements('block', 'none');
  completed.className = 'filter selected';
  inProgress.className = 'filter';
}

clear.onclick = function() {
  while (deleteBtn.length > 0) {
    deleteBtn[0].parentElement.remove();
  }
}
