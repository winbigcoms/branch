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
  const clickMainSlideNext = clickBtnNum => {
    ++slideNum;
    if(typeof clickBtnNum === Number){ 
      slideNum = clickBtnNum
    }
    mainSlidePrevBtn.classList.toggle("no-show",slideNum === 0);
    mainSlideNextBtn.classList.toggle("no-show",slideNum === 8);
    mainUl.style.transform = `translateX(-${slideNum*960}px)`;
    checkNowSlidePage(slideNum);
  };
  const clickMainSlidePrev = clickBtnNum => {
    --slideNum;
    if(typeof clickBtnNum === Number){ 
      slideNum = clickBtnNum
    }
    mainSlidePrevBtn.classList.toggle("no-show",slideNum === 0);
    mainSlideNextBtn.classList.toggle("no-show",slideNum === 8);
    mainUl.style.transform = `translateX(-${slideNum*960}px)`;
    checkNowSlidePage(slideNum);
  }
  return {
    clickMainSlideNext,
    clickMainSlidePrev
  }
})();

mainSlidePrevBtn.onclick = mainSlideBtnFunction.clickMainSlidePrev;
mainSlideNextBtn.onclick = mainSlideBtnFunction.clickMainSlideNext;