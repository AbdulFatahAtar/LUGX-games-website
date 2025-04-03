document.addEventListener("DOMContentLoaded", () => {
  // Handle header links if they have a data-href attribute
  const headerLinks = document.querySelectorAll(".headerLinks a, .headerLinks button");
  headerLinks.forEach(link => {
    const targetHref = link.getAttribute("data-href");
    if (targetHref && targetHref !== "#") {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = targetHref;
      });
    }
  });

  // Handle "Sign In" button click
  const signInBtns = document.querySelectorAll(".signInBtn");
  signInBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open("login.html", "_self");
    });
  });

  // Get elements for the search functionality
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  // Function to perform search using fetch
  function performSearch() {
    const query = searchInput.value.trim();
    if (query === "") {
      // Show message if search query is empty
      searchResults.innerHTML = "<p>Please enter a search query</p>";
      return;
    }
    // Fetch search results from the server
    fetch(`/search?query=${encodeURIComponent(query)}`)
      .then(response => response.json())
      .then(data => {
        // Clear previous search results
        searchResults.innerHTML = "";
        if (data.length === 0) {
          searchResults.innerHTML = "<p>No results found.</p>";
        } else {
          data.forEach(game => {
            // Create a card for each search result
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

  // Add event listeners for the search button and Enter key in search input
  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      performSearch();
    });
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        performSearch();
      }
    });
  }

  // Handle "View All" buttons in trending and most played sections
  const viewAllBtns = document.querySelectorAll(".mostHeader .btn, .trendingHeader .btn");
  viewAllBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open("ourShop.html", "_blank");
    });
  });

  // Handle "Explore" buttons click
  const exploreBtns = document.querySelectorAll(".exploreBtn, .card .btn:not(.buyNowBtn):not(.addToCartBtn)");
  exploreBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open("https://store.steampowered.com", "_blank");
    });
  });

  // Handle "Buy Now" buttons click
  const buyNowButtons = document.querySelectorAll(".buyNowBtn");
  buyNowButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Redirecting to Payment Page...");
    });
  });

  // Handle "Add to Cart" buttons click
  const addToCartButtons = document.querySelectorAll(".addToCartBtn");
  addToCartButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Product added to cart!");
    });
  });

  // Handle cart icon clicks in the trending section
  const cartIcons = document.querySelectorAll(".trendingCard .icon");
  cartIcons.forEach(icon => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Product added to cart from icon!");
    });
  });
});
