document.addEventListener("DOMContentLoaded", () => {
  // --- وظيفة روابط الهيدر (إن وُجدت) ---
  const headerLinks = document.querySelectorAll(".headerLinks a, .headerLinks button");
  headerLinks.forEach(link => {
    const targetHref = link.getAttribute("data-href");
    if(targetHref && targetHref !== "#") {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = targetHref;
      });
    }
  });

  // --- وظيفة زر "Sign In" ---
  const signInBtns = document.querySelectorAll(".signInBtn");
  signInBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open("login.html", "_self");
    });
  });

  // --- وظيفة زر "SEARCH NOW" باستخدام fetch للبحث ---  
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  function performSearch() {
    const query = searchInput.value.trim();
    if(query === "") {
      searchResults.innerHTML = "<p>Please enter a search query</p>";
      return;
    }
    fetch(`/search?query=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => {
        searchResults.innerHTML = ""; // مسح النتائج السابقة
        if(data.length === 0) {
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
    // تفعيل زر Enter في حقل البحث
    searchInput.addEventListener("keydown", (e) => {
      if(e.key === "Enter") {
        e.preventDefault();
        performSearch();
      }
    });
  }

  // --- وظيفة زر "View All" ---
  const viewAllBtns = document.querySelectorAll(".mostHeader .btn, .trendingHeader .btn");
  viewAllBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open("ourShop.html", "_blank");
    });
  });

  // --- وظيفة زر "Explore" ---
  const exploreBtns = document.querySelectorAll(".exploreBtn, .card .btn:not(.buyNowBtn):not(.addToCartBtn)");
  exploreBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open("https://store.steampowered.com", "_blank");
    });
  });

  // --- وظيفة زر "Buy Now" ---
  const buyNowButtons = document.querySelectorAll(".buyNowBtn");
  buyNowButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Redirecting to Payment Page...");
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

  // --- وظيفة أيقونات السلة في قسم Trending ---
  const cartIcons = document.querySelectorAll(".trendingCard .icon");
  cartIcons.forEach(icon => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Product added to cart from icon!");
    });
  });
});








// نصايح عبدالباري
  //Create a database and link it to the website e.g. SQL
  //Create tables users, products, orders
  //phpMyAdmin
  //Give me a full step by step tutorial on how to set up sql and phpmyadmin with my current website
  