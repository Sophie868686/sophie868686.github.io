// 1. 抓取共同的 header.html 檔案
fetch('./header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header-placeholder').innerHTML = data;
    initDropdowns();
  });

function initDropdowns() {
    const mainDropdownBtns = document.querySelectorAll('.dropdown > .dropdown-btn');
    mainDropdownBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const parentDropdown = this.parentElement;
            parentDropdown.classList.toggle('active');
            document.querySelectorAll('.dropdown').forEach(function(other) {
                if (other !== parentDropdown) other.classList.remove('active');
            });
        });
    });

    const subDropdownBtns = document.querySelectorAll('.dropdown-submenu > .submenu-btn');
    subDropdownBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const parentSubmenu = this.parentElement;
            parentSubmenu.classList.toggle('active');
            document.querySelectorAll('.dropdown-submenu').forEach(function(other) {
                if (other !== parentSubmenu) other.classList.remove('active');
            });
        });
    });
}