const openSidebar = document.querySelector(".btn-menu.img-ico");
const banner = document.querySelector('.banner')
const link1 = document.querySelector('.link-page.link-page1');
const link2 = document.querySelector('.link-page.link-page2');


openSidebar.onclick = togglesidebar = () => {
    document.getElementById('sidemenu').classList.toggle('open');
};

const btnClose = () => {
    banner.style.marginTop = "-420px"
};

link1.onclick = () => {
    document.getElementsByClassName('item1')[0].setAttribute('style', 'z-index: 2');
    document.getElementsByClassName('item2')[0].setAttribute('style', 'z-index: 1');
}

link2.onclick = () => {
    document.getElementsByClassName('item1')[0].setAttribute('style', 'z-index: 1');
    document.getElementsByClassName('item2')[0].setAttribute('style', 'z-index: 2');
}