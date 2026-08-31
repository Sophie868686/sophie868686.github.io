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
          e.stopPropagation(); // 🌟 關鍵：阻止事件冒泡，避免觸發外層的 document 點擊事件
          
          const parentDropdown = this.closest('.dropdown');
          const isOpen = parentDropdown.classList.contains('active'); // 檢查目前是否已經打開

          // 關閉所有第一層選單
          document.querySelectorAll('.dropdown').forEach(item => {
              item.classList.remove('active');
          });

          // 如果原本是關閉的，就打開它；如果原本就是打開的，因為上面全部清除過，所以就會順利關閉！
          if (!isOpen) {
              parentDropdown.classList.add('active');
          }
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
// 載入 Footer
fetch('/footer.html')
  .then(response => {
    if (!response.ok) throw new Error('找不到 footer.html 檔案');
    return response.text();
  })
  .then(data => {
    document.getElementById('footer-container').innerHTML = data;
    
    // 加上安全檢查與互動邏輯
    const lineBtn = document.getElementById('line-btn');
    const lineQrCode = document.getElementById('line-qrcode');
    const floatingSocials = document.querySelector('.floating-socials'); // 外層容器

    if (lineBtn && lineQrCode && floatingSocials) {
      
      // 1. 電腦版維持原本的 hover 效果
      lineBtn.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
          lineQrCode.style.display = 'block';
        }
      });
      
      lineBtn.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
          lineQrCode.style.display = 'none';
        }
      });

      // 2. 手機版（或點擊）：點擊 LINE 按鈕時切換 .active 狀態來開合 QR Code
      lineBtn.addEventListener('click', (e) => {
        // 如果是手機版尺寸，或是你想讓電腦版也能用點擊控制
        if (window.innerWidth <= 768) {
          e.preventDefault(); // 防止跳轉（如果 LINE 按鈕是 <a href="...">）
          e.stopPropagation(); // 阻止冒泡
          floatingSocials.classList.toggle('active');
        }
      });

      // 3. 點擊畫面其他空白處時，自動關閉手機版展開的 LINE QR Code
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.floating-socials')) {
          floatingSocials.classList.remove('active');
        }
      });
    }
  })
  .catch(error => console.error('載入 footer 時發生錯誤:', error));