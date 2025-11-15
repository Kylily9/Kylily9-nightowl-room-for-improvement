document.addEventListener('DOMContentLoaded', () => {
  const feedbackForm = document.getElementById('feedback-form');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(feedbackForm);
      const data = Object.fromEntries(fd.entries());
      const list = document.getElementById('feedback-list');
      const item = document.createElement('p');
      item.textContent = `${data.name}: ${data.message}`;
      list.appendChild(item);
      feedbackForm.reset();
      alert('Thank you for your feedback!');
    });
  }

  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(checkoutForm);
      const data = Object.fromEntries(fd.entries());
      document.getElementById('order-summary').innerHTML = `
        <h3>Order Summary</h3>
        <p>Address: ${data.address}</p>
        <p>Delivery Time: ${data.time}</p>
        <p>Payment: ${data.payment}</p>
      `;
      alert('Order placed successfully!');
    });
  }
});

function showNotification(msg) {
  const notif = document.createElement('div');
  notif.textContent = msg;
  notif.style.position = 'fixed';
  notif.style.bottom = '20px';
  notif.style.right = '20px';
  notif.style.background = '#f6c85f';
  notif.style.color = '#000';
  notif.style.padding = '10px 15px';
  notif.style.borderRadius = '5px';
  notif.style.zIndex = '1000';
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 2000);
}

document.querySelectorAll('button[data-id]').forEach(b => {
  b.addEventListener('click', e => {
    addToCart({id: b.dataset.id, name: b.dataset.name, price: parseFloat(b.dataset.price)});
    showNotification(`${b.dataset.name} added to cart`);
  });
});

const confirmOrderBtn = document.getElementById('confirm-order');
if (confirmOrderBtn) {
  confirmOrderBtn.addEventListener('click', () => {
    const cart = getCart();
    if (!cart.length) return alert('Cart is empty!');
    let msg = 'Confirm your order:\n';
    cart.forEach(i => msg += `${i.name} × ${i.qty} — $${i.price * i.qty}\n`);
    if (confirm(msg)) {
      window.location.href = 'checkout.html';
    }
  });
}
