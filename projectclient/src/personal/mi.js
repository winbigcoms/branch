// 서브(캐러셀) 슬라이드 
const $carouselWindow = document.querySelector('.window-article');
const $carouselUl = document.querySelector('.list-article');
const $slides = document.querySelectorAll('.list-article li')

// 서브 슬라이드 버튼
const $prevBtn = document.querySelector('.prev-btn');
const $nextBtn = document.querySelector('.next-btn');

// 페이지 상단 이동 버튼
const $topBtn = document.querySelector('.top-btn');


const getArticles = async () => {
  let {data} = await axios.get("http://localhost:9000/post");
  console.log(data[0]);
  let html = '';
  data[0].forEach(({
    content,
    name,
    source,
    title
  }) => {
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
  num++;
  if (num === 1) {
    $prevBtn.classList.toggle("hidden");
  }
  $carouselUl.style.transform = `translateX(-${num*960}px)`;
  if (num === 7) {
    $nextBtn.classList.toggle("hidden")
  }
};

$prevBtn.onclick = () => {
  num--;
  if (num === 6) {
    $nextBtn.classList.toggle("hidden")
  }
  $carouselUl.style.transform = `translateX(-${num*960}px)`;
  if (num === 0) {
    $prevBtn.classList.toggle("hidden")
  }
}

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 1500){
    $topBtn.style.position = 'absolute';
    $topBtn.style.transition = 'top 1s ease-in 1s';
    $topBtn.style.animation = 'showup 0.3s linear alternate forwards';
  } else {
    $topBtn.style.position = 'relative';
  }
})

$topBtn.onclick = () => {
  window.scrollTo(0, 1);
}