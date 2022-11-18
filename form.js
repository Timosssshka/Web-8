let button = document.querySelector('button');
let form = document.querySelector('#forma');
let popup = document.querySelector('.popup');

let names = document.getElementById('name');
let email = document.getElementById('e-mail');
let massage = document.getElementById('information');
let checkbx = document.getElementById('checkb');

function save() {
  localStorage.setItem('Имя', names.value);
  localStorage.setItem('Почта', email.value);
  localStorage.setItem('Сообщение', massage.value);
  if (checkbx.checked) {
    localStorage.setItem('Чекбокс', 1);
  } else {
    localStorage.setItem('Чекбокс', 0);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  names.value = localStorage.getItem('Имя');
  email.value = localStorage.getItem('Почта');
  massage.value = localStorage.getItem('Сообщение');
  let checkBox = localStorage.getItem('Чекбокс');
  if (checkBox == 1) {
    checkbx.checked = true;
  } else if (checkBox == 0) {
    checkbx.checked = false;
  }

  names.oninput = save;
  email.oninput = save;
  massage.oninput = save;
  checkbx.oninput = save;
  
    button.addEventListener('click', (event) => {
        event.preventDefault();
      window.onpopstate = function () {
        window.history.back();
        form.classList.remove('active');
        popup.classList.remove('active');
      };
      history.pushState({ page: 1 }, '', '?next');
      form.classList.add('open');
      popup.classList.add('popup_open');
    });
    document.addEventListener('click', (e) => {
      if (e.target === form) {
        window.history.back();
        form.classList.remove('active');
        popup.classList.remove('active');
      }
    });
    $(function(){
      $(".forms").submit(function(e){
          e.preventDefault();
          $.ajax({
              type: "POST",
              dataType: "json",
              url: "https://formcarry.com/s/8T9POKyZ9",
              data: $(this).serialize(),
              success: function (response) {
                if (response.status == 'success') {
                  alert('Успешно!');
                  localStorage.removeItem('Имя');
                  localStorage.removeItem('Почта');
                  localStorage.removeItem('Сообщение');
                 localStorage.removeItem('Чекбокс');
                 names.value = localStorage.getItem('Имя');
                email.value = localStorage.getItem('Почта');
                massage.value = localStorage.getItem('Сообщение');
                checkbx.checked = false;
                }
              },
              error: function (jqxhr, status, errorMsg) {
                alert('Ошибка!');
              },
            });
          });
        });
      });
