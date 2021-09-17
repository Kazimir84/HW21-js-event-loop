let dispList = document.getElementById('list');
let ul = document.getElementById('posts');
let url = new URL('http://localhost:3000/todos');


// =============================GET==============================
async function getToDo() {
  let responsegetToDo = await fetch('http://localhost:3000/todos')
  let resaultgetToDo = await responsegetToDo.json();
  dispList.innerHTML = resaultgetToDo.map((data) => {
    if(data.completed === true)
    return `<li class="toDo" value="${data.id}" id="${data.id}" data-id="${data.id}" data-title="${data.title}" data-completed="${data.completed}"> Id: ${data.id} Title: ${data.title}. Completed: ${data.completed}</li>`;
    else {    
      return `In progress<li class="toggle toDo" value="${data.id}" id="${data.id}" data-id="${data.id}" data-title="${data.title}" data-completed="${data.completed}">Id: ${data.id} Title: ${data.title}. Completed: ${data.completed} - Status In progress </li>`;
    }
  }).join('');
};
getToDo();
// =========================POST==============================
async function createToDo(url, titleInput) {
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
      window.location.href = window.location.href;
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
  createToDo(url, getFormData(form))        
        .then(() => ul.innerHTML = getFormData)
        .catch(error => console.log('Возникла ошибка:', error))
});
// ==================PATCH==========================================
// async function chengeToDo(id, completedStatus) {
// let response = await fetch(`http://localhost:3000/todos/${id}`, {
//     method: 'PATCH',
//     headers: {
//         'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify({completed: completedStatus})
// });
// }

// dispList.addEventListener('click', (e) => {
//   if( e.target.tagName === 'LI') {
//     let togl = e.target.classList; 
//     togl.toggle('toggle');  
//     let id = e.target.value; 
    
//     chengeToDo(id);
//   } else if (e.target.getAttribute('data-completed') === true) {
//     e.target.getAttribute('data-completed') === false;
//   } else {
//     e.target.getAttribute('data-completed') === true;
//   }  
// });
// ==================PUT==========================================
function getStatus(completedStatus, elemTitle) {
  if (completedStatus === 'true') {
      return {
          'title': elemTitle,
          'completed': false
      }
  } else if (completedStatus === 'false') {
      return {
          'title': elemTitle,
          'completed': true
      }
  };
}

async function chengeToDo(id, completedStatus, title) {
  let response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(getStatus(completedStatus, title))
  });
  window.location.href = window.location.href;
}

dispList.addEventListener('click', (e) => {
  let togl = e.target.classList; 
  let id = e.target.value; 
  e.target.getAttribute('data-completed');
  chengeToDo(+id, e.target.getAttribute('data-completed'), e.target.getAttribute('data-title'));
  if( e.target.tagName === 'LI' && e.target.getAttribute('data-completed') === true) {    
    togl.toggle('toggle');  
    e.target.setAttribute('data-completed', false);
  } else {
    e.target.getAttribute('data-completed');
    e.target.setAttribute('data-completed', true);   
    togl.toggle('toggle');     
  }     
});

// ========================DELETE==================================
async function deleteToDo(id) {
  await fetch(`http://localhost:3000/todos/${id}`, {
    method: 'DELETE'
  });
  window.location.href = window.location.href;
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
