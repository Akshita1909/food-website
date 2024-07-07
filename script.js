document.addEventListener('DOMContentLoaded', () => {
    // Timer
    let countdownElement = document.getElementById('countdown');
    let timer = 600; // 10 minutes in seconds

    function startTimer() {
        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;
        countdownElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        if (timer > 0) {
            timer--;
        } else {
            alert("Time's up!");
        }
    }
    setInterval(startTimer, 1000);

    // Theme Switcher
    const themeSwitcher = document.querySelector('.theme-switcher');
    themeSwitcher.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            document.body.className = `${event.target.dataset.theme}-theme`;
        }
    });

    // Cart Functionality
    const cartItemsElement = document.querySelector('.cart-items');
    const totalAmountElement = document.getElementById('total-amount');
    let cart = [];

    function updateCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.name}">
                <p>${item.name} - $${item.price}</p>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            cartItemsElement.appendChild(cartItemElement);
        });
        totalAmountElement.textContent = total.toFixed(2);
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const menuItem = event.target.closest('.menu-item');
            const name = menuItem.querySelector('p').textContent.split(' - ')[0];
            const price = parseFloat(menuItem.dataset.price);
            const imgSrc = menuItem.querySelector('img').src;
            cart.push({ name, price, imgSrc });
            updateCart();
        });
    });

    cartItemsElement.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-from-cart')) {
            const index = event.target.dataset.index;
            cart.splice(index, 1);
            updateCart();
        }
    });

    // Review Functionality
    const reviewText = document.getElementById('review-text');
    const submitReviewButton = document.getElementById('submit-review');
    const reviewList = document.getElementById('review-list');

    submitReviewButton.addEventListener('click', () => {
        const review = reviewText.value.trim();
        if (review) {
            const reviewElement = document.createElement('li');
            reviewElement.textContent = review;
            reviewList.appendChild(reviewElement);
            reviewText.value = '';
        }
    });

    // Order Confirmation Modal
    const orderConfirmationModal = document.getElementById('order-confirmation');
    const closeOrderConfirmationButton = document.getElementById('close-order-confirmation');
    const orderItemsElement = document.getElementById('order-items');
    const orderTotalAmountElement = document.getElementById('order-total-amount');
    const buyNowButton = document.getElementById('buy-now');
    const confirmPaymentButton = document.getElementById('confirm-payment');

    buyNowButton.addEventListener('click', () => {
        orderItemsElement.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            total += item.price;
            const orderItemElement = document.createElement('div');
            orderItemElement.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            orderItemsElement.appendChild(orderItemElement);
        });
        orderTotalAmountElement.textContent = total.toFixed(2);
        orderConfirmationModal.style.display = 'block';
    });

    closeOrderConfirmationButton.addEventListener('click', () => {
        orderConfirmationModal.style.display = 'none';
    });

    confirmPaymentButton.addEventListener('click', () => {
        alert('Payment Confirmed!');
        orderConfirmationModal.style.display = 'none';
        cart = [];
        updateCart();
    });

    // Modal Close Functionality
    window.addEventListener('click', (event) => {
        if (event.target === orderConfirmationModal) {
            orderConfirmationModal.style.display = 'none';
        }
    });
});
