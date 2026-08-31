
function initHeaderEvents() {
  // 1. 手機版漢堡選單
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
    });
  }
  // 取得所有第一層的下拉按鈕
  const dropdownBtns = document.querySelectorAll('.dropdown-btn');

  dropdownBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
          e.preventDefault(); // 阻止任何預設跳轉行為
          
          const parentDropdown = this.closest('.dropdown');
          
          // （選擇性）點擊當前選單時，關閉其他已經打開的第一層選單，保持畫面整潔
          document.querySelectorAll('.dropdown').forEach(item => {
              if (item !== parentDropdown) {
                  item.classList.remove('active');
              }
          });

          // 切換當前第一層的 .active 狀態
          parentDropdown.classList.toggle('active');
      });
  });

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
  // 點擊網頁其他空白處時，自動關閉所有打開的第一層選單
  document.addEventListener('click', function(e) {
      if (!e.target.closest('.dropdown')) {
          document.querySelectorAll('.dropdown').forEach(dropdown => {
              dropdown.classList.remove('active');
          });
      }
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