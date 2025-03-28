document.addEventListener("DOMContentLoaded", () => {
    // --- توجيه الصفحات عند الضغط على روابط الهيدر ---
    const headerLinks = document.querySelectorAll(".headerLinks a");
    headerLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        const targetHref = link.getAttribute("href");
        if(targetHref && targetHref !== "#") {
          window.location.href = targetHref;
        }
      });
    });
  
    // --- وظيفة زر "sign in" ---
    const signInBtns = document.querySelectorAll(".signInBtn");
    signInBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "login.html"; // التوجيه إلى صفحة تسجيل الدخول
      });
    });
  
    // --- وظيفة زر "SEARCH NOW" ---
    const searchBtn = document.querySelector(".searchBtn");
    const searchInput = document.querySelector(".searchBar input");
    if(searchBtn && searchInput) {
      searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const query = searchInput.value.toLowerCase().trim();
        // البحث داخل بطاقات قسم Trending
        const cards = document.querySelectorAll(".trendingCard .card");
        cards.forEach(card => {
          const title = card.querySelector(".cardName h3").textContent.toLowerCase();
          if(title.includes(query)){
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    }
  
    // --- وظيفة زر "View All" ---
    const viewAllBtns = document.querySelectorAll(".mostHeader .btn, .trendingHeader .btn");
    viewAllBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Redirecting to a page with all items...");
        // مثال: window.location.href = "allItems.html";
      });
    });
  
    // --- وظيفة زر "explore" ---
    const exploreBtns = document.querySelectorAll(".exploreBtn, .card .btn:not(.buyNowBtn):not(.addToCartBtn)");
    exploreBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const card = btn.closest(".card");
        if(card) {
          const productName = card.querySelector(".cardName h3") ? card.querySelector(".cardName h3").textContent : "Product";
          const genre = card.querySelector(".genre") ? card.querySelector(".genre").textContent : "N/A";
          // إنشاء إشعار مؤقت يحتوي على تفاصيل المنتج
          const notification = document.createElement("div");
          notification.className = "notification";
          notification.innerHTML = `<strong>${productName}</strong> (${genre}) details: This premium product is available at a competitive price.`;
          document.body.appendChild(notification);
          setTimeout(() => {
            notification.remove();
          }, 3000);
        }
      });
    });
  
    // --- وظيفة زر "Buy Now" ---
    const buyNowButtons = document.querySelectorAll(".buyNowBtn");
    buyNowButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Redirecting to Payment Page...");
        // مثال: window.location.href = "payment.html";
      });
    });
  
    // --- وظيفة زر "Add to Cart" ---
    const addToCartButtons = document.querySelectorAll(".addToCartBtn");
    addToCartButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Product added to cart!");
      });
    });
  
    // --- وظيفة أيقونة السلة في بطاقات قسم Trending ---
    const cartIcons = document.querySelectorAll(".trendingCard .icon");
    cartIcons.forEach(icon => {
      icon.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Product added to cart from icon!");
      });
    });
  });
  

  
  document.addEventListener("DOMContentLoaded", () => {
    // --- توجيه الصفحات عند الضغط على روابط الهيدر ---
    const headerLinks = document.querySelectorAll(".headerLinks button");
    headerLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        // هذا الجزء يتعامل مع روابط الهيدر إذا كانت هناك حاجة، لكن بما أننا نستخدم onclick مباشرة، فهذه الدالة اختيارية.
        const targetHref = link.getAttribute("data-href");
        if(targetHref && targetHref !== "#") {
          window.location.href = targetHref;
        }
      });
    });
  
    // --- وظيفة زر "sign in" ---
    const signInBtns = document.querySelectorAll(".signInBtn");
    signInBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "login.html"; // التوجيه إلى صفحة تسجيل الدخول
      });
    });
  
    // --- وظيفة زر "SEARCH NOW" ---
    const searchBtn = document.querySelector(".searchBtn");
    const searchInput = document.querySelector(".searchBar input");
    if(searchBtn && searchInput) {
      searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const query = searchInput.value.toLowerCase().trim();
        // البحث داخل بطاقات قسم Trending
        const cards = document.querySelectorAll(".trendingCard .card");
        cards.forEach(card => {
          const title = card.querySelector(".cardName h3").textContent.toLowerCase();
          if(title.includes(query)){
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    }
  
    // --- وظيفة زر "View All" ---
    const viewAllBtns = document.querySelectorAll(".mostHeader .btn, .trendingHeader .btn");
    viewAllBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        // إعادة التوجيه إلى صفحة ourShop.html عند الضغط على "View All"
        window.location.href = "ourShop.html";
      });
    });
  
    // --- وظيفة زر "explore" (Explore More) ---
    const exploreBtns = document.querySelectorAll(".exploreBtn, .card .btn:not(.buyNowBtn):not(.addToCartBtn)");
    exploreBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        // إعادة التوجيه إلى موقع Steam عند الضغط على "explore"
        window.location.href = "https://store.steampowered.com";
      });
    });
  
    // --- وظيفة زر "Buy Now" ---
    const buyNowButtons = document.querySelectorAll(".buyNowBtn");
    buyNowButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Redirecting to Payment Page...");
        // مثال: window.location.href = "payment.html";
      });
    });
  
    // --- وظيفة زر "Add to Cart" ---
    const addToCartButtons = document.querySelectorAll(".addToCartBtn");
    addToCartButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Product added to cart!");
      });
    });
  
    // --- وظيفة أيقونة السلة في بطاقات قسم Trending ---
    const cartIcons = document.querySelectorAll(".trendingCard .icon");
    cartIcons.forEach(icon => {
      icon.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Product added to cart from icon!");
      });
    });
  });

  //Create a database and link it to the website e.g. SQL
  //Create tables users, products, orders
  //phpMyAdmin
  //Give me a full step by step tutorial on how to set up sql and phpmyadmin with my current website