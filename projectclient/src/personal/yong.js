const togglesidebar = () => {
    document.getElementById('sidemenu').classList.toggle('open');
};

const btnClose = () => {
    document.getElementsByClassName('banner')[0].setAttribute('style', 'margin-top: -420px');
};