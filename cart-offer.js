document.addEventListener('DOMContentLoaded', () => {
  // Offer Popup Logic
  const popup = document.getElementById('offerPopup');
  if (popup && !sessionStorage.getItem('offerSeen')) {
    setTimeout(() => {
      popup.classList.add('show');
    }, 3000);
  }
  window.closeOffer = () => {
    if (popup) {
      popup.classList.remove('show');
      sessionStorage.setItem('offerSeen', 'true');
    }
  };

  // Cart Logic
  let cart = JSON.parse(localStorage.getItem('princess_cart') || '[]');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartItemsContainer = document.getElementById('cartItems');
  const cartCountEl = document.getElementById('cartCount');
  
  window.toggleCart = () => {
    if(cartSidebar) {
        cartSidebar.classList.toggle('open');
        renderCart();
    }
  };

  window.addToCart = (itemName, itemDesc) => {
    cart.push({ name: itemName, desc: itemDesc });
    localStorage.setItem('princess_cart', JSON.stringify(cart));
    updateCartCount();
    toggleCart(); // open cart
  };

  window.buyNow = (itemName) => {
    const text = `Hi Princess Boutique, I'd like to order: ${itemName}. Please share details!`;
    window.open(`https://wa.me/918668186643?text=${encodeURIComponent(text)}`, '_blank');
  };

  window.removeFromCart = (index) => {
    cart.splice(index, 1);
    localStorage.setItem('princess_cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
  };

  window.checkoutWhatsApp = () => {
    if (cart.length === 0) return;
    let text = `Hi Princess Boutique, I would like to order the following items from my cart:\n\n`;
    cart.forEach((item, i) => {
      text += `${i + 1}. ${item.name} - ${item.desc}\n`;
    });
    text += `\nPlease let me know the payment details!`;
    window.open(`https://wa.me/918668186643?text=${encodeURIComponent(text)}`, '_blank');
  };

  function renderCart() {
    if (!cartItemsContainer) return;
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<div class="cart-empty-msg">Your cart is empty.</div>`;
    } else {
      cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
          <div class="cart-item-details">
            <div class="cart-item-title">${item.name}</div>
            <div style="font-size: 13px; color: var(--ink-600);">${item.desc}</div>
            <button class="cart-item-remove" onclick="removeFromCart(${index})">Remove</button>
          </div>
        </div>
      `).join('');
    }
  }

  function updateCartCount() {
    if (cartCountEl) cartCountEl.textContent = cart.length;
  }

  updateCartCount();
});
