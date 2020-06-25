// 서브(캐러셀) 슬라이드 
const $carouselWindow = document.querySelector('.window-article');
const $carouselUl = document.querySelector('.list-article');
const $slides = document.querySelectorAll('.list-article li')

// 서브 슬라이드 버튼
const $prevBtn = document.querySelector('.prev-btn');
const $nextBtn = document.querySelector('.next-btn');


const getArticles = async () => {
  let {data} = await axios.get("http://localhost:9000/post");
  console.log(data[0]);
  let html = '';
  data[0].forEach(({ content, name, source, title }) => {
    html += `<li class="reset-list">
      <a href="#" target="_blank">
      <img src="/projectclient/style/images/subslide/${source}" alt="#">
      <strong class="tit-subject">${title}</strong>
      <p class="desc-article">${content}</p>
      <span class="info-by">
      <span class="icon-by">by</span>
      &nbsp;${name}</span>
      </a></li>`
  });
  $carouselUl.innerHTML = html;
};
window.onload = getArticles;


let num = 0
$nextBtn.onclick = () => {
  num++
  let axisX = 960;
  $carouselWindow.style.left = `-${axisX*num}px`;
  console.log([$carouselWindow.style.left]);
};

  