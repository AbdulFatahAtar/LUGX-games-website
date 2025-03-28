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




  // new code not sure
  document.addEventListener("DOMContentLoaded", () => {
    // وظيفة زر "sign in"
    const signInBtns = document.querySelectorAll(".signInBtn");
    signInBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.open("login.html", "_self");
      });
    });
  
    // وظيفة زر "SEARCH NOW" باستخدام fetch للاتصال بواجهة البحث في Flask
    const searchBtn = document.querySelector(".searchBtn");
    const searchInput = document.querySelector(".searchBar input");
    if(searchBtn && searchInput) {
      searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if(query === ""){
          alert("Please enter a search query");
          return;
        }
        fetch(`/search?query=${encodeURIComponent(query)}`)
          .then(response => response.json())
          .then(data => {
            const searchResults = document.getElementById("searchResults");
            searchResults.innerHTML = ""; // مسح النتائج السابقة
            if(data.length === 0){
              searchResults.innerHTML = "<p>No results found.</p>";
            } else {
              data.forEach(game => {
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
                  <img src="${game.image}" alt="${game.name}">
                  <div class="cardInfo">
                    <div class="cardName">
                      <p>${game.genre}</p>
                      <h3>${game.name}</h3>
                    </div>
                    <a href="#" class="icon">
                      <img src="images/online-shopping.png" alt="Cart Icon">
                    </a>
                  </div>
                `;
                searchResults.appendChild(card);
              });
            }
          })
          .catch(err => {
            console.error("Error fetching search results:", err);
          });
      });
    }
  
    // View All: جميع أزرار "View All" تفتح ourShop.html في نافذة جديدة
    const viewAllBtns = document.querySelectorAll(".mostHeader .btn, .trendingHeader .btn");
    viewAllBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.open("ourShop.html", "_blank");
      });
    });
  
    // Explore: جميع أزرار "explore" تفتح https://store.steampowered.com في نافذة جديدة
    const exploreBtns = document.querySelectorAll(".exploreBtn, .card .btn:not(.buyNowBtn):not(.addToCartBtn)");
    exploreBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.open("https://store.steampowered.com", "_blank");
      });
    });
  
    // وظائف أزرار Buy Now و Add to Cart (كما هو موضح سابقاً)
    const buyNowButtons = document.querySelectorAll(".buyNowBtn");
    buyNowButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Redirecting to Payment Page...");
        // مثال: window.open("payment.html", "_self");
      });
    });
  
    const addToCartButtons = document.querySelectorAll(".addToCartBtn");
    addToCartButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Product added to cart!");
      });
    });
  
    const cartIcons = document.querySelectorAll(".trendingCard .icon");
    cartIcons.forEach(icon => {
      icon.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Product added to cart from icon!");
      });
    });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    // وظيفة زر "sign in"
    const signInBtns = document.querySelectorAll(".signInBtn");
    signInBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.open("login.html", "_self");
      });
    });
  
    // وظيفة البحث: عرض النتائج في مربع صغير تحت شريط البحث
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
  
    function performSearch() {
      const query = searchInput.value.trim();
      if(query === ""){
        searchResults.innerHTML = "<p>Please enter a search query</p>";
        return;
      }
      fetch(`/search?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
          searchResults.innerHTML = ""; // مسح النتائج السابقة
          if(data.length === 0){
            searchResults.innerHTML = "<p>No results found.</p>";
          } else {
            data.forEach(game => {
              // إنشاء بطاقة نتيجة بحث صغيرة
              const card = document.createElement("div");
              card.className = "card searchResult";
              card.innerHTML = `
                <img src="${game.image}" alt="${game.name}">
                <div class="cardInfo">
                  <div class="cardName">
                    <p>${game.genre}</p>
                    <h3>${game.name}</h3>
                  </div>
                  <a href="#" class="icon">
                    <img src="images/online-shopping.png" alt="Cart Icon">
                  </a>
                </div>
              `;
              searchResults.appendChild(card);
            });
          }
        })
        .catch(err => {
          console.error("Error fetching search results:", err);
          searchResults.innerHTML = "<p>Error retrieving search results.</p>";
        });
    }
  
    if(searchBtn && searchInput) {
      searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        performSearch();
      });
      
      // جعل زر Enter يعمل مثل زر البحث
      searchInput.addEventListener("keydown", (e) => {
        if(e.key === "Enter"){
          e.preventDefault();
          performSearch();
        }
      });
    }
  
    // View All: جميع أزرار "View All" تفتح ourShop.html في نافذة جديدة
    const viewAllBtns = document.querySelectorAll(".mostHeader .btn, .trendingHeader .btn");
    viewAllBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.open("ourShop.html", "_blank");
      });
    });
  
    // Explore: جميع أزرار "explore" تفتح https://store.steampowered.com في نافذة جديدة
    const exploreBtns = document.querySelectorAll(".exploreBtn, .card .btn:not(.buyNowBtn):not(.addToCartBtn)");
    exploreBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        window.open("https://store.steampowered.com", "_blank");
      });
    });
  
    // وظائف Buy Now و Add to Cart (إن وجدت)
    const buyNowButtons = document.querySelectorAll(".buyNowBtn");
    buyNowButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Redirecting to Payment Page...");
      });
    });
  
    const addToCartButtons = document.querySelectorAll(".addToCartBtn");
    addToCartButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Product added to cart!");
      });
    });
  
    // وظائف أيقونة السلة في قسم Trending
    const cartIcons = document.querySelectorAll(".trendingCard .icon");
    cartIcons.forEach(icon => {
      icon.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Product added to cart from icon!");
      });
    });
  });
 
  




// جديد ليس اكيد
document.addEventListener("DOMContentLoaded", () => {
  // وظيفة زر "sign in"
  const signInBtns = document.querySelectorAll(".signInBtn");
  signInBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open("login.html", "_self");
    });
  });

  // وظيفة البحث: عرض النتائج في مربع صغير تحت شريط البحث
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  function performSearch() {
    const query = searchInput.value.trim();
    if(query === ""){
      searchResults.innerHTML = "<p>Please enter a search query</p>";
      return;
    }
    fetch(`/search?query=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => {
        searchResults.innerHTML = ""; // مسح النتائج السابقة
        if(data.length === 0){
          searchResults.innerHTML = "<p>No results found.</p>";
        } else {
          data.forEach(game => {
            // إنشاء بطاقة نتيجة بحث صغيرة
            const card = document.createElement("div");
            card.className = "card searchResult";
            card.innerHTML = `
              <img src="${game.image}" alt="${game.name}">
              <div class="cardInfo">
                <div class="cardName">
                  <p>${game.genre}</p>
                  <h3>${game.name}</h3>
                </div>
                <a href="#" class="icon">
                  <img src="images/online-shopping.png" alt="Cart Icon">
                </a>
              </div>
            `;
            searchResults.appendChild(card);
          });
        }
      })
      .catch(err => {
        console.error("Error fetching search results:", err);
        searchResults.innerHTML = "<p>Error retrieving search results.</p>";
      });
  }

  if(searchBtn && searchInput) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      performSearch();
    });
    
    // جعل زر Enter يعمل مثل زر البحث
    searchInput.addEventListener("keydown", (e) => {
      if(e.key === "Enter"){
        e.preventDefault();
        performSearch();
      }
    });
  }

  // View All: جميع أزرار "View All" تفتح ourShop.html في نافذة جديدة
  const viewAllBtns = document.querySelectorAll(".mostHeader .btn, .trendingHeader .btn");
  viewAllBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open("ourShop.html", "_blank");
    });
  });

  // Explore: جميع أزرار "explore" تفتح https://store.steampowered.com في نافذة جديدة
  const exploreBtns = document.querySelectorAll(".exploreBtn, .card .btn:not(.buyNowBtn):not(.addToCartBtn)");
  exploreBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open("https://store.steampowered.com", "_blank");
    });
  });

  // وظائف Buy Now و Add to Cart (إن وجدت)
  const buyNowButtons = document.querySelectorAll(".buyNowBtn");
  buyNowButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Redirecting to Payment Page...");
    });
  });

  const addToCartButtons = document.querySelectorAll(".addToCartBtn");
  addToCartButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Product added to cart!");
    });
  });

  // وظائف أيقونة السلة في قسم Trending
  const cartIcons = document.querySelectorAll(".trendingCard .icon");
  cartIcons.forEach(icon => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Product added to cart from icon!");
    });
  });
});


// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Sign in button functionality
  const signInBtns = document.querySelectorAll(".signInBtn");
  signInBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open("login.html", "_self");
    });
  });

  // Search functionality: display results in a new section above Trending Games
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  // Updated search results container id
  const searchResults = document.getElementById("searchResultsSection");

  // Function to perform search via fetch call
  function performSearch() {
    const query = searchInput.value.trim();
    if(query === ""){
      searchResults.innerHTML = "<p>Please enter a search query</p>";
      return;
    }
    fetch(`/search?query=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => {
        searchResults.innerHTML = ""; // Clear previous results
        if(data.length === 0){
          searchResults.innerHTML = "<p>No results found.</p>";
        } else {
          data.forEach(game => {
            // Create a small search result card
            const card = document.createElement("div");
            card.className = "card searchResult";
            card.innerHTML = `
              <img src="${game.image}" alt="${game.name}">
              <div class="cardInfo">
                <div class="cardName">
                  <p>${game.genre}</p>
                  <h3>${game.name}</h3>
                </div>
                <a href="#" class="icon">
                  <img src="images/online-shopping.png" alt="Cart Icon">
                </a>
              </div>
            `;
            searchResults.appendChild(card);
          });
        }
      })
      .catch(err => {
        console.error("Error fetching search results:", err);
        searchResults.innerHTML = "<p>Error retrieving search results.</p>";
      });
  }

  if(searchBtn && searchInput) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      performSearch();
    });
    // Enable Enter key to perform search
    searchInput.addEventListener("keydown", (e) => {
      if(e.key === "Enter"){
        e.preventDefault();
        performSearch();
      }
    });
  }

  // "View All" buttons open ourShop.html in a new window
  const viewAllBtns = document.querySelectorAll(".mostHeader .btn, .trendingHeader .btn");
  viewAllBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open("ourShop.html", "_blank");
    });
  });

  // "Explore" buttons open the Steam store in a new window
  const exploreBtns = document.querySelectorAll(".exploreBtn, .card .btn:not(.buyNowBtn):not(.addToCartBtn)");
  exploreBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open("https://store.steampowered.com", "_blank");
    });
  });

  // "Buy Now" button functionality
  const buyNowButtons = document.querySelectorAll(".buyNowBtn");
  buyNowButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Redirecting to Payment Page...");
    });
  });

  // "Add to Cart" button functionality
  const addToCartButtons = document.querySelectorAll(".addToCartBtn");
  addToCartButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Product added to cart!");
    });
  });

  // Cart icon functionality in Trending section
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