const mainUl = document.querySelector(".main-wirte-pick-lists");
const mainSlidePrevBtn = document.querySelector(".main-slide-priv");
const mainSlideNextBtn = document.querySelector(".main-slide-next");
const mainSlideNumber = document.querySelector(".main-silde-numbering");
const mainNotice = document.querySelector('.main-notice');

let notice = [
  {type:"Notice",content:"삼성 갤럭시 S20에 작가님의 브런치북이 소개됩니다!"},
  {type:"Update",content:"[오픈] 당신이 읽던 작품, '글 읽는 서재'에 모아두었어요"},
  {type:"Notice",content:"(6/3) 서비스 이용약관 및 개인정보 처리방침 변경 안내"},
  {type:"Update",content:"메이플 스토리 신규 5차 스킬이 추가됩니다!"},
]

const checkNowSlidePage = pageNum => {
  [...mainSlideNumber.children].forEach( (li, idx) => {
    li.classList.toggle("main-nowPage",idx === pageNum);
  })
}

const mainSlideBtnFunction = (function(){
  let slideNum = 0;
  const countSlide = (clickBtnNum)=> {
    if(typeof clickBtnNum === "number"){
      slideNum = clickBtnNum
    }
    mainSlidePrevBtn.classList.toggle("no-show",slideNum === 0);
    mainSlideNextBtn.classList.toggle("no-show",slideNum === 8);
    mainUl.style.transform = `translateX(-${slideNum*960}px)`;
    checkNowSlidePage(slideNum);
  }
  const clickMainSlideNext = clickBtnNum => {
    ++slideNum;
    countSlide(clickBtnNum)
  };
  const clickMainSlidePrev = clickBtnNum => {
    --slideNum;
    countSlide(clickBtnNum)
  }
  return {
    clickMainSlideNext,
    clickMainSlidePrev
  }
})();

mainSlidePrevBtn.onclick = mainSlideBtnFunction.clickMainSlidePrev;
mainSlideNextBtn.onclick = mainSlideBtnFunction.clickMainSlideNext;

const makeMainSlide = async() => {
  let {data} = await axios.get("http://localhost:9000/post");
  console.log(data[0]);
  let html ="";
  let count = 1;
  let count2 = 1;
  data[0].forEach(data => {
    // 10번의 사이클을 3번 돈다.
    if(count===1 || count===4 || count=== 7){
      html += `<li class="main-slide${count2}">
                  <div class="main-slide slide${count2}-1">
                    <a href="javascript:void(0)">
                      <img class="main-slide-img"src="../style/images/subslide/${data.source}" alt="">
                      <div class="main-slide-info">
                        <h4>${data.title}</h4>
                        <p>${data.content}</p>
                        <p>by ${data.name}</p>
                      </div>
                    </a>
                  </div>`;
      ++count;
      return;
    }else if(count === 3 ||count === 6 ||count === 10 ) {
      html += `<div class="main-slide slide${count2}-3">
                <a href="javascript:void(0)">
                  <img class="main-slide-img"src="../style/images/subslide/${data.source}" alt="">
                  <div class="main-slide-info">
                    <h4>${data.title}</h4>
                    <p>${data.content}</p>
                    <p>by ${data.name}</p>
                  </div>
                </a>
              </div>
              </li>`;  
      count === 10 ? count = 1: ++count ;
      count2 < 3 ? ++count2 : count2 = 1;
      return;
    }
    html += `<div class="main-slide slide${count2}-2">
              <a href="javascript:void(0)">
                <img class="main-slide-img"src="../style/images/subslide/${data.source}" alt="">
                <div class="main-slide-info">
                  <h4>${data.title}</h4>
                  <p>${data.content}</p>
                  <p>by ${data.name}</p>
                </div>
              </a>
            </div>`;
    ++count;
  })
  mainUl.innerHTML = html;
  
  if(Kakao.Auth.getAccessToken()){
    Kakao.API.request({
    url:'/v2/user/me',
    success: res => {
      loginInfo = JSON.parse(JSON.stringify(res))
      console.log(loginInfo);
      Kakao.API.request({
        url:'/v2/user/me',
        success: res => {
          loginInfo = JSON.parse(JSON.stringify(res));
          sideInfo.innerHTML = `<img class="kakao-profile-Img" src=${loginInfo.properties.thumbnail_image}></img>
          <p class="slogan">${loginInfo.kakao_account.email}</p>
          <p class="slogan-writer">${loginInfo.properties.nickname}</p>
          <a id="brunchSigninButton" href="javascript:logoutFormWithKakao()" 
          class="#side_request btn_apply_author"><button
                  class="btn-request">로그아웃하기</button></a>`;
          loginstateBtn.innerHTML = `<a href="javascript:logoutFormWithKakao()" class="f-r btn-request btn-default">로그아웃</a>`
        }
        ,fail: err => {
          console.log(JSON.stringify(err))
        }
      })
      // checkLogin.innerHTML= loginInfo.properties.nickname;
      // kakaoImg.innerHTML = `<img src="${loginInfo.properties.thumbnail_image}"/>`
    }
    ,fail: err => {
      console.log(JSON.stringify(err))
    }
  })}
}
window.addEventListener("load",makeMainSlide);
window.onload = makeMainSlide;

let intervalTime = (notice.length+1)*7000
setInterval(() => {
  notice.forEach( item => {
    setTimeout(()=> {
      mainNotice.innerHTML = `<h4>${item.type}</h4>
      <p>${item.content}</p>`
    },7000)
  })
}, intervalTime);

// kakaologin

// checkLogOut.onclick = ()=> {
//   if(!Kakao.Auth.getAccessToken()) {
//     console("로그인 안대어 있어요");
//     return;
//   }
//   Kakao.Auth.logout(function() {
//     alert('logout ok\naccess token -> ' + Kakao.Auth.getAccessToken())
//   })
// };


// let loginInfo ={}
// Kakao.init('1a86de1b6c01f3317b9730ffd02df7f2');
// function loginFormWithKakao() {
//   if(Kakao.Auth.getAccessToken()) {
//     console.log("이미 로그인댐");
//     console.log(Kakao.Auth.getAccessToken());
//     return;
//   }
//   Kakao.Auth.loginForm({
//     success: function(authObj) {
//       Kakao.API.request({
//         url:'/v2/user/me',
//         success: res => {
//           loginInfo = JSON.parse(JSON.stringify(res))
//           console.log(loginInfo);
//           checkLogin.innerHTML= loginInfo.properties.nickname;
//           kakaoImg.innerHTML = `<img src="${loginInfo.properties.thumbnail_image}"/>`
//         }
//         ,fail: err => {
//           console.log(JSON.stringify(err))
//         }
//       })
//     },
//     fail: function(err) {
//       alert(JSON.stringify(err))
//     },
//   })
// }