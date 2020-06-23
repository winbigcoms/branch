// Status
const keyword = ['지구한바퀴</br>세계여행', '그림·웹툰', '시사·이슈', 'IT</br>트렌드', '사진·촬영', '취향저격</br>영화 리뷰', '오늘은</br>이런 책', '뮤직 인사이드', '글쓰기</br>코치', '직장인</br>현실 조언', '스타트업</br>경험담', '육아</br>이야기', '요리·레시피', '건강·운동', '멘탈 관리</br>심리 탐구', '디자인</br>스토리', '문화·예술', '건축·설계', '인문학·철학', '쉽게 읽는</br>역사', '우리집</br>반려동물', '멋진</br>캘리그래피', '사랑·이별', '감성</br>에세이'];
let selectedCategory = [];

// Dom
const $writersList = document.querySelector('.writers-list');
const $keywordList = document.querySelector('.keyword-list');
const $writersCategoryList = document.querySelector('.writers-favorite-list');
const $writersCategoryButtons = document.querySelectorAll('.writers-favorite-list > button');

// select-random-category
function selectRandomCategory() {
    let favorite = ['사진', '역사', '브랜딩', '책', '경제', '스타트업'];
    for (let i = 0; i < 3; i++) {
        const random = Math.floor((Math.random() * favorite.length));
        selectedCategory.push(favorite[random]);
        favorite = favorite.filter(favorite => favorite !== selectedCategory[i]);
    }
    return selectedCategory;
}

// insert category value to button
function insertCategoryValue() {
    selectRandomCategory().forEach((category, i) => {
        $writersCategoryButtons[i].textContent = category;
        $writersCategoryButtons[i].name = category;
        $writersCategoryButtons[i].value = category;
    });
}

// find active category
function findActiveCategory() {
   const category = [...$writersCategoryButtons].find(button => button.classList.contains('active'));
   return category.value;
}

// click category & add active class 
$writersCategoryList.onclick = ({target}) => {
    if (!target.matches('.writers-favorite-list > button')) return;
    [...$writersCategoryButtons].forEach(item => item.classList.toggle('active' ,item === target));
    render(findActiveCategory(), keyword);
};



// render
const render = async (category, keyword) => {

    // keyword-list
    let keywordItem = '';
    keyword.forEach(item => {
        keywordItem += `<li class="keyword-item"><a href="#"><span class="keyword-title">${item}</span></a></li>`;
    });
    $keywordList.innerHTML = keywordItem;

    // writers-list
    let html = '';
    let perfectUserInfo = [];
    try {
        let response = await axios.get(`http://localhost:9000/user/:${category}`);
        let userInfo = response.data[0];
        let userCount = 1
        userInfo.reduce((acc, cur, idx) => {
            if (idx === 0) {
                return acc = cur;
            }
            if (idx === userInfo.length - 1) {
                ++userCount;
                acc["CategoryName" + userCount] = cur.CategoryName;
                perfectUserInfo.push(acc);
                return acc
            }
            if (acc.name === cur.name) {
                ++userCount;
                acc["CategoryName" + userCount] = cur.CategoryName;
                return acc
            }
            if (acc.name !== cur.name) {
                userCount = 1;
                perfectUserInfo.push(acc);
                acc = cur;
                return acc
            }
        }, {});
    } catch (err) {
        console.error(err);
    }
    
    let selectedUserInfo = perfectUserInfo.filter(person => person.CategoryName === category);
    let temp = perfectUserInfo.filter(person => person.CategoryName2 === category);
    if (selectedUserInfo.length < 6) {
      selectedUserInfo = [...selectedUserInfo, ...temp];
    }
    selectedUserInfo.length = 6;
    selectedUserInfo.forEach(person => {
        html += `<li><a href="#" class="writer-link-wrap">
      <img class="writer-img" src="../style/images/profile/${person.img}">
      <strong class="writer-name">${person.name}</strong>
      <p class="writer-job">${person.job}</p> 
      <p class="writer-profile">${person.profile}</p></a>
      <a href="#" class="writer-favorite">${person.CategoryName}</a>
      <a href="#" class="writer-favorite">${person.CategoryName2}</a>
      <a href="#" class="writer-favorite-more">· · ·</a>
    </li>`;
    });
    $writersList.innerHTML = html;


};

window.addEventListener('load', function () {
    insertCategoryValue();
});

window.addEventListener('load',function() {
    render(findActiveCategory(), keyword);
});