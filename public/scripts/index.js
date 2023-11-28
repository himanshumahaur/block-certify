document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.querySelector('input[type="checkbox"]');
  
    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        window.ethereum.isMetaMask;
        const ethereum = window.ethereum;
        ethereum.request({ method:'eth_requestAccounts' }).then((result) => {
            if(result.length) {
                const login_section = document.getElementById("login-section");
                const menu_section = document.getElementById("menu-section");
                login_section.style.display = "none";
                menu_section.style.display = "flex";
            }
        });
      }
    });
  });