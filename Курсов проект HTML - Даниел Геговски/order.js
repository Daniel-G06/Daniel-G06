function renderOrderPreview() {
    const container = document.getElementById('product-preview-container');

    const orderBox = document.querySelector('.order-box');

    const product = JSON.parse(localStorage.getItem('currentOrder'));

    if (!product) {
        container.innerHTML = "<p>Моля, изберете продукт от каталога.</p>";

        if (orderBox) orderBox.classList.add('hidden');

        return;
    }

    container.innerHTML = `
        <div class="order-preview-card">
            <img src="${product.img}" class="order-preview-img">

            <div class="order-preview-info">
                <h4>${product.name}</h4>
                <p class="order-preview-price">
                    Цена: ${product.price.toFixed(2)} лв.
                </p>
            </div>
        </div>
    `;
}
window.toggleCardFields = function(method) {
    const el = document.getElementById('card-details-container');

    if (el) {
        if (method === 'card') {
            el.style.display = 'block';
        } 
        else {
            el.style.display = 'none';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    renderOrderPreview();

    const form = document.getElementById('checkout-form');

    if (form) {
        form.onsubmit = function(e) {
            e.preventDefault();

            const product = JSON.parse(localStorage.getItem('currentOrder'));

            const name = document.getElementById('cust-name').value;

            alert(`Благодарим Ви, ${name}!\nПоръчката за "${product.name}" е приета.`);

            localStorage.removeItem('currentOrder');

            window.location.href = "index.html";
        };
    }
});
