const mainUl = document.querySelector(".main-wirte-pick-lists");
const mainSlidePrevBtn = document.querySelector(".main-slide-priv");
const mainSlideNextBtn = document.querySelector(".main-slide-next");
const mainSlideNumber = document.querySelector(".main-silde-numbering");

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

mainSlideNumber.onclick = e =>{
  if( !e.target.matches(".main-silde-numbering > li > a") ) return;
  [...mainSlideNumber.children].forEach( (li, idx) => {
    if(li === e.target.parentNode){
      mainSlideBtnFunction.clickMainSlidePrev(idx);
    }
  })
};
const makeMainSlide = async() => {
  let {data} = await axios.get("http://localhost:9000/post");
  let html ="";
  data[0].forEach((data,idx) => {
    if(idx === 0 || idx === 3 || idx === 6){
      let count = 1
      html += `<li class="main-slide${count}">
                <div class="main-slide slide${count}-1">
                  <a href="javascript:void(0)">
                    <h4>${data.title}</h4>
                    <p>${data.content}</p>
                    <p>by ${data.name}</p>
                  </a>
                </div>
                <div class="main-slide slide${count}-2">
                  <a href="javascript:void(0)">
                    <h4>title</h4>
                    <p>by beak</p>
                  </a>
                </div>
                <div class="main-slide slide1-3">
                  <a href="javascript:void(0)">
                    <h4>title</h4>
                    <p>by beak</p>
                  </a>
                </div>
              </li>`;
      }
  })
  mainUl.innerHTML = html;
}
window.onload = makeMainSlide;