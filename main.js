// let imgList = document.getElementById('imgList')
// let inputTitle = document.getElementById('inputTitle');
// let submit = document.getElementById('submit');
// let formId = document.getElementById('formId');
let dispList = document.getElementById('list');
let ul = document.getElementById('posts');
let url = new URL('http://localhost:3000/todos');

// ===========================================================
async function getToDo() {
  let responsegetToDo = await fetch('http://localhost:3000/todos')
  let resaultgetToDo = await responsegetToDo.json();
  dispList.innerHTML = resaultgetToDo.map((data) => {
    if(data.completed === true)
    return `<li class="toDo" value="${data.id}" id="${data.id}" data-id="${data.id}" data-title="${data.title}" data-completed="${data.completed}"> Id: ${data.id} Title: ${data.title}. Completed: ${data.completed}</li>`;
    else {    
      return `<div>In progress<li class="toggle toDo" value="${data.id}"> Id: ${data.id} Title: ${data.title}. Completed: ${data.completed}</li></div>`;
    }
  }).join('');
};
getToDo();
// =======================================================
async function setToDo(url, titleInput) {
  let post = {
      "title": titleInput,
      "completed": false,
  };
  let response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(post)
  });

  if (response.ok) {
      let json = await response.json();
      console.log(json);
  } else {
      console.log("Ошибка HTTP: " + response.status);
  }
}

let getFormData = function(form) {
  let obj = {};
  let elements = form;

  for(let i = 0; i < elements.length; ++i) {
      let element = elements[i];
      let title = element.title;
      let value = element.value;

      if(title) {
          obj.title = value;
      };
  };
  return obj.title;
};

let form = document.forms.posts;
form.addEventListener('submit', (e) => {
  e.preventDefault(); 
  setToDo(url, getFormData(form))        
        .then(() => ul.innerHTML = getFormData)
        .catch(error => console.log('Возникла ошибка:', error))
});
// ============================================================
async function chengeToDo(id) {
let response = await fetch(`http://localhost:3000/todos/${id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({completed: true})
});
}

dispList.addEventListener('click', (e) => {
  if( e.target.tagName === 'LI') {
    let togl = e.target.classList; 
    togl.toggle('toggle');  
    let id = e.target.value; 
    chengeToDo(id);
  }
});
// ==========================================================

async function deleteToDo(id) {
  await fetch(`http://localhost:3000/todos/${id}`, {
    method: 'DELETE'
  })
}

dispList.addEventListener('contextmenu', (e) => {
  if( e.target.tagName === 'LI') {
    let id = e.target.value
    deleteToDo(id)
  } else {
    console.log('This is not LI')
  }
})
// ============================================================