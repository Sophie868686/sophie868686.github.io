// 1. 抓取共同的 header.html 檔案
// fetch('./header.html')
//   .then(response => response.text())
//   .then(data => {
//     document.getElementById('header-placeholder').innerHTML = data;
//     initDropdowns();
//   });

// function initDropdowns() {
//     const mainDropdownBtns = document.querySelectorAll('.dropdown > .dropdown-btn');
//     mainDropdownBtns.forEach(function(btn) {
//         btn.addEventListener('click', function(e) {
//             e.preventDefault();
//             const parentDropdown = this.parentElement;
//             parentDropdown.classList.toggle('active');
//             document.querySelectorAll('.dropdown').forEach(function(other) {
//                 if (other !== parentDropdown) other.classList.remove('active');
//             });
//         });
//     });

//     const subDropdownBtns = document.querySelectorAll('.dropdown-submenu > .submenu-btn');
//     subDropdownBtns.forEach(function(btn) {
//         btn.addEventListener('click', function(e) {
//             e.preventDefault();
//             const parentSubmenu = this.parentElement;
//             parentSubmenu.classList.toggle('active');
//             document.querySelectorAll('.dropdown-submenu').forEach(function(other) {
//                 if (other !== parentSubmenu) other.classList.remove('active');
//             });
//         });
//     });
// }
function initHeaderEvents() {
  // 1. 手機版漢堡選單
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
    });
  }

  // 2. 稅務新聞兩層選單
  const submenuBtns = document.querySelectorAll(".dropdown-submenu > a");
  submenuBtns.forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();       
      e.stopPropagation();      
      const currentSubmenu = this.parentElement;

      document.querySelectorAll(".dropdown-submenu").forEach(item => {
        if (item !== currentSubmenu) {
          item.classList.remove("active");
        }
      });
      currentSubmenu.classList.toggle("active");
    });
  });
}

// 載入 Header
fetch('/header.html')
  .then(response => {
    if (!response.ok) throw new Error('找不到 header.html 檔案');
    return response.text();
  })
  .then(data => {
    document.getElementById('header-container').innerHTML = data;
    // 確保 HTML 塞入後，立刻執行事件綁定
    initHeaderEvents();
  })
  .catch(error => console.error('載入 header 時發生錯誤:', error));
  
// 載入 Footer
fetch('/footer.html')
  .then(response => {
    if (!response.ok) throw new Error('找不到 footer.html 檔案');
    return response.text();
  })
  .then(data => {
    document.getElementById('footer-container').innerHTML = data;
    
    // 加上安全檢查，避免 null 錯誤破壞 JavaScript 執行
    const lineBtn = document.getElementById('line-btn');
    const lineQrCode = document.getElementById('line-qrcode');

    if (lineBtn && lineQrCode) {
      lineBtn.addEventListener('mouseenter', () => lineQrCode.style.display = 'block');
      lineBtn.addEventListener('mouseleave', () => lineQrCode.style.display = 'none');
    }
  })
  .catch(error => console.error('載入 footer 時發生錯誤:', error));