const openSidebar = document.querySelector(".btn-menu.img-ico");
const banner = document.querySelector(".banner");
const link1 = document.querySelector(".link-page.link-page1");
const link2 = document.querySelector(".link-page.link-page2");
const $sidemenu = document.getElementById("sidemenu");
const sbanner = document.querySelector(".link-banner.link-bnr-s");
const sbnr1 = document.getElementById("s1");
const sbnr2 = document.getElementById("s2");

openSidebar.onclick = (e) => {
    document.getElementById("sidemenu").classList.add("open");
    banner.style.marginTop = "-420px";
    sbnr1.style.opacity = "1";
    sbnr2.style.opacity = "1";
    e.stopPropagation();

    const foo = ({
        target
    }) => {
        if (target === $sidemenu) return;
        document.getElementById("sidemenu").classList.remove("open");
        document.removeEventListener("click", foo);
    };
    document.addEventListener("click", foo);
};

const btnClose = () => {
    banner.style.marginTop = "-420px";
    sbnr1.style.opacity = "1";
    sbnr2.style.opacity = "1";
};

link1.onclick = () => {
    document
        .getElementById("item1")
        .setAttribute("style", "z-index: 2");
    document
        .getElementById("item2")
        .setAttribute("style", "z-index: 1");
    sbnr1.style.opacity = "0";

};

link2.onclick = () => {
    document
        .getElementById("item1")
        .setAttribute("style", "z-index: 1");
    document
        .getElementById("item2")
        .setAttribute("style", "z-index: 2");
    sbnr2.style.opacity = "0";
};


window.addEventListener("load", function () {
    window.scrollTo({
        top: 1,
        left: 0,
        behavior: "smooth",
    });
    console.log(window.scrollY);
});
window.addEventListener("scroll", function () {

    if (window.scrollY <= 1) {
        console.log("1");
        sbnr1.style.opacity = "0";
        sbnr2.style.opacity = "0";
        banner.style.marginTop = "0px";
        banner.style.transition = "0.5s ease-in-out";
    }
});