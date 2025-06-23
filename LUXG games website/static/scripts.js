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

// Toast notification function
function showToast(message, isSuccess = true) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast ${isSuccess ? 'success' : 'error'}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Trigger reflow to enable animation
    toast.offsetHeight;
    
    // Show toast
    toast.classList.add('show');
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300); // Wait for fade out animation
    }, 3000);
}

// Add to cart functionality
function addToCart(gameId) {
    fetch(`/add-to-cart/${gameId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showToast('✔️ Item added to cart!');
            } else {
                showToast('Failed to add to cart', false);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showToast('Failed to add to cart', false);
        });
}

// Initialize add to cart functionality for product images
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to all add to cart buttons
    const addToCartButtons = document.querySelectorAll('.addToCart');
    addToCartButtons.forEach(button => {
        button.onclick = function(e) {
            e.preventDefault();
            const gameCard = this.closest('.gameCard');
            const gameId = gameCard.dataset.id;
            addToCart(gameId);
        };
    });

    // Add click handlers to product images that should act as add to cart buttons
    const productImages = document.querySelectorAll('.cardImg img');
    productImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.onclick = function(e) {
            const gameCard = this.closest('.gameCard');
            if (gameCard) {
                const gameId = gameCard.dataset.id;
                addToCart(gameId);
            }
        };
    });

    // Add fade-in effect when page loads
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});

// Cart Page Functions
// ==================

// Updates the quantity of an item in the cart
function updateQuantity(gameId, quantity) {
    fetch('/update-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `game_id=${gameId}&quantity=${quantity}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        } else {
            showToast('Failed to update cart', false);
        }
    });
}

// Shows/hides card input fields based on payment method
function toggleCardFields(paymentMethod) {
    const cardFields = document.getElementById('cardFields');
    cardFields.style.display = ['credit_card', 'debit_card'].includes(paymentMethod) ? 'block' : 'none';
    
    // Toggle required attributes
    const cardInputs = cardFields.querySelectorAll('input');
    cardInputs.forEach(input => {
        input.required = ['credit_card', 'debit_card'].includes(paymentMethod);
    });
}

// Displays the order confirmation modal with order details
function showConfirmationModal(orderData) {
    // Format currency
    const formatCurrency = (amount) => `$${parseFloat(amount).toFixed(2)}`;
    
    // Populate confirmation modal
    document.getElementById('confirmOrderNumber').textContent = orderData.number;
    document.getElementById('confirmOrderDate').textContent = orderData.created_at;
    document.getElementById('confirmCustomerName').textContent = orderData.name;
    document.getElementById('confirmCustomerEmail').textContent = orderData.email;
    document.getElementById('confirmCustomerPhone').textContent = orderData.phone;
    document.getElementById('confirmCustomerAddress').textContent = orderData.address;
    document.getElementById('confirmPaymentMethod').textContent = orderData.payment_method.replace(/_/g, ' ').toUpperCase();
    document.getElementById('confirmOrderTotal').textContent = formatCurrency(orderData.total);

    // Populate order items
    const itemsContainer = document.getElementById('confirmOrderItems');
    itemsContainer.innerHTML = orderData.items.map(item => `
        <div class="confirmationItem">
            <span class="itemName">${item.name}</span>
            <span class="itemQuantity">x${item.quantity}</span>
            <span class="itemPrice">${formatCurrency(item.price * item.quantity)}</span>
        </div>
    `).join('');

    // Show modal
    document.getElementById('orderConfirmationModal').style.display = 'flex';
}

// Closes the order confirmation modal
function closeConfirmationModal() {
    document.getElementById('orderConfirmationModal').style.display = 'none';
}

// Login/Register Page Functions
// ===========================

// Handles form submission for login and registration
function submitForm(action) {
    const form = document.getElementById("authForm");
    const formData = new FormData(form);
    formData.append("action", action);

    fetch("/auth", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const msgDiv = document.getElementById("message");
        msgDiv.textContent = data.message;
        msgDiv.style.color = data.success ? "green" : "red";
        
        if (data.success) {
            setTimeout(function() {
                window.location.href = "/";
            }, 1500);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        const msgDiv = document.getElementById("message");
        msgDiv.textContent = "An error occurred. Please try again.";
        msgDiv.style.color = "red";
    });
}

// Initialize event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // Login page event listeners
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    
    if (loginBtn && registerBtn) {
        loginBtn.addEventListener("click", () => submitForm("login"));
        registerBtn.addEventListener("click", () => submitForm("register"));
    }
});

// Handles the checkout form submission
function handleCheckout(event) {
    event.preventDefault();
    const form = event.target;
    
    // Basic form validation
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });

    if (!isValid) {
        showToast('Please fill in all required fields', false);
        return false;
    }

    const formData = new FormData(form);

    fetch('/checkout', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showConfirmationModal(data.order);
        } else {
            showToast(data.message, false);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('An error occurred while processing your order', false);
    });

    return false;
}

// Add print styles to the document
const printStyles = `
@media print {
    body * {
        visibility: hidden;
    }
    .modalContent, .modalContent * {
        visibility: visible;
    }
    .modalContent {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        padding: 0;
    }
    button {
        display: none !important;
    }
}`;

const styleSheet = document.createElement('style');
styleSheet.textContent = printStyles;
document.head.appendChild(styleSheet);

// Shop Page Functions
// =================

// Sorts games in the shop page based on selected criteria
function sortGames(criteria) {
    const gamesGrid = document.querySelector('.gamesGrid');
    if (!gamesGrid) return;
    
    const games = Array.from(gamesGrid.children);
    
    games.sort((a, b) => {
        let aValue, bValue;
        
        switch(criteria) {
            case 'name':
                aValue = a.querySelector('.cardName').textContent;
                bValue = b.querySelector('.cardName').textContent;
                return aValue.localeCompare(bValue);
            
            case 'price':
                aValue = parseFloat(a.querySelector('.price').textContent.replace('$', '')) || 0;
                bValue = parseFloat(b.querySelector('.price').textContent.replace('$', '')) || 0;
                return aValue - bValue;
            
            case 'release_date':
                aValue = new Date(a.querySelector('.releaseDate').textContent.replace('Released: ', ''));
                bValue = new Date(b.querySelector('.releaseDate').textContent.replace('Released: ', ''));
                return bValue - aValue;
        }
    });
    
    games.forEach(game => gamesGrid.appendChild(game));
}

// Initialize event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...

    // Shop page sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => sortGames(e.target.value));
    }
});

// Navigation Functions
// ==================

// Handles smooth navigation to another page
function navigateToPage(url) {
    // Add a fade-out effect to the current page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    // After the fade-out, navigate to the new page
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}
