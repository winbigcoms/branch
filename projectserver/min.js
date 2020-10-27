const $todos = document.querySelector('.todos');
const $addTodoSection = document.querySelector('.addTodoSection');
const $addTodoSectionForm = document.querySelector('.addTodoSection > form');
const $addTodoTitle = document.querySelector('.addTodoTitle');

const $checkTodoKeywords = document.querySelector('.checkTodoKeywords');
const $checkTodoKeyword = document.querySelector('.checkTodoKeyword');
const $addTodoKeyword = document.querySelector('.addTodoKeyword');

const $addTodoImportance = document.querySelector('.addTodoImportance');
const $addTodoContents = document.querySelector('.addTodoContents');

const $addTodoYear = document.querySelector('#addTodoYear');
const $addTodoMonth = document.querySelector('#addTodoMonth');
const $addTodoDay = document.querySelector('#addTodoDay');
const $addTodoHour = document.querySelector('#addTodoHour');
const $addTodoMinute = document.querySelector('#addTodoMinute');

const $comfirmDayState = document.querySelector('.comfirmDayState');

const $addTodoBtnWarp = document.querySelector('.addTodoBtnWarp');
const $addTodoBtn = document.querySelector('.addTodoBtnWarp > .addBtn');
const $closePopupBtn = document.querySelector('.addTodoBtnWarp > .closeBtn');
let keywords = [];
let importance = 0;
const settingSelectTime = () => {
  let setTodaytYear = moment().format("YYYY"); 
  let setTodaytMonth = moment().format("MM"); 
  let setTodaytDay = moment().format("DD"); 
  let setTodaytHour = moment().format("HH"); 
  let setTodaytMin = moment().format("mm");
  document.querySelector("#addTodoYear option[value='" + setTodaytYear + "']").selected = true;
  document.querySelector("#addTodoMonth option[value='" + setTodaytMonth + "']").selected = true;
  document.querySelector("#addTodoDay option[value='" + setTodaytDay + "']").selected = true;
  document.querySelector("#addTodoHour option[value='" + setTodaytHour + "']").selected = true;
  document.querySelector("#addTodoMinute option[value='" + setTodaytMin + "']").selected = true;
}
const render = () => {
  if(localStorage.length === 0) {
    $todos.innerHTML =""
    return
  }
  const todosKey = Object.keys(localStorage) // 로컬 스토리지 키들로 이루어진 배열
  const todosObj =todosKey.map( key => {
    return  JSON.parse(localStorage.getItem(key))
  });
  const todosArr = [...todosObj].sort((a, b) => a["todoDeadLine"] > b["todoDeadLine"] ? 1: a["todoDeadLine"] < b["todoDeadLine"] ? -1 : 0);
  let html = '';
  todosArr.forEach( todos => {
    html += `
      <li class="todo ${todos.todoCompleted? "completed":todos.todoDeadLine === "실패ㅠㅠ"?"fail":""}" id="${todos.id}">
        <div class="todoExplain">
          <h3 class="todoTitle">${todos.todoTitle}</h3>
          <p class="todoCompleted">${todos.todoCompleted}</p>
          <p class="todoImportance">${todos.todoImportance}</p>
          <p class="todoDeadLine">${todos.todoDeadLine}</p>
          <p class="todoKeyword">${todos.todoKeyword}</p>
        </div>
        <div class="hidden toggleTodo" id="toggleTodo">
          <p class="todoContents">${todos.todoContents}</p>
          <button class="fixBtn icon-pencil"></button>
          <button class="delBtn icon-trash-empty"></button>
          <button class="completeBtn icon-ok"></button>
        </div>
      </li>`;

    $todos.innerHTML = '';
    $todos.innerHTML += html;
  })
  // 초기 날짜설정
  settingSelectTime()
};

let addState = "add";
let fixedId ="";
(function (){

  // State

  // Doms

  // ----- Add todo
  const addTodo = (state, fixId) => {
    // keywords = '';
    if ($addTodoTitle.value.trim() === '') {
      $addTodoTitle.focus();
      $addTodoTitle.setAttribute('placeholder', '!!!!!빈칸없이 입력해주세요.');
      return 
    } else if ($addTodoContents.value.trim() === '') {
      $addTodoContents.focus();
      $addTodoContents.setAttribute('placeholder', '!!!!!빈칸없이 입력해주세요.');
      return 
    }
    // 중요도
    importanceStar = "" 
    for( let i =0; i < importance; i++) {
      importanceStar += "★"
    }
    let addTodoObject = {
      id: state==="add" ? genterateId() : +fixId,
      todoTitle: $addTodoTitle.value.trim(),
      todoCompleted: false,
      todoImportance: importanceStar,
      todoDeadLine: `${$addTodoYear.value}/${$addTodoMonth.value}/${$addTodoDay.value}/${$addTodoHour.value}:${$addTodoMinute.value}`,
      todoKeyword: addTodoKeywords(),
      todoContents: $addTodoContents.value.trim(),
    }
    localStorage.setItem(`${addTodoObject.id}`,JSON.stringify(addTodoObject));
    
// 초기화
    $addTodoSectionForm.reset();
    importance = 0;
    render();
    keywords = [];
    settingSelectTime()
    $addTodoSection.classList.toggle('hidden');
    return "1";
  }; 

  // ----- Generate Id
  const genterateId = () => {

    return (localStorage.length) ? Math.max(...Object.keys(localStorage)) + 1 : 1;

  };

  // ----- Check Todo Keyword
  const checkTodoKeyword = (keyword) => {
    let addKeywords = (keywords.length < 3) ? keywords = [...keywords, keyword] : keywords;
    let keywordsHtml = '';
    addKeywords.forEach(addkeyword => {
      keywordsHtml += `<button class="checkTodoKeyword">${addkeyword}</button>`
    });
    $checkTodoKeywords.innerHTML = keywordsHtml;
  };

  // ----- Add Todo Keywords
  const addTodoKeywords = () => {
    return keywords.join(' ');
  };

  // ----- Remove Keyword
  const removeKeyword = (target) => {
      keywords = keywords.filter(keyword => {
        return keyword !== target.textContent
      });
      [...$checkTodoKeywords.children].forEach( btn => {
        if (btn === target) $checkTodoKeywords.removeChild(target);
      })
  };

  // Event Handler

  // ----- Add Keyword 
  $addTodoKeyword.onkeyup = e => {
    if (e.keyCode !== 13) return;
    checkTodoKeyword(`#${$addTodoKeyword.value.trim()}`);
    $addTodoKeyword.value = '';
  };

  // ----- Click Add Button

  $addTodoBtn.onclick = () => {
    if(addTodo( addState, fixedId) === undefined) return;
    addTodo( addState, fixedId);
    $addTodoTitle.setAttribute('placeholder', '제목을 입력해주세요(7자 이내)');
    $addTodoContents.setAttribute('placeholder', '할 일을 설명해주세요!');
    [...$addTodoImportance.children].forEach((button) => {
        button.innerHTML = '☆';
    });
    $checkTodoKeywords.innerHTML = '';
  };

  // ---- Click Keyword in popup
  $checkTodoKeywords.onclick = ({target}) => {
    if (!target.matches('button')) return;
    removeKeyword(target);
  };

  // ----- importance
  $addTodoImportance.onclick = ({target}) => {
    if (target.matches('div')) return;
    [...$addTodoImportance.children].forEach((button, index) => {
      if (index + 1 <= target.id) {
        button.innerHTML = '★';
      } else {
        button.innerHTML = '☆';
      }
    });
    importance = +target.id;
  };

  $closePopupBtn.onclick = () => {
    $addTodoSection.classList.toggle('hidden');
    $addTodoSectionForm.reset();
    addState = "add";
    settingSelectTime();
    [...$addTodoImportance.children].forEach((button) => {
      button.innerHTML = '☆';
  });
  };
})();