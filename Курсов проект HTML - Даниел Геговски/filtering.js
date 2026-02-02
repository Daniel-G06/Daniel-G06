function filterProducts() {
    const container = document.getElementById('productsContainer');

    if (!container || typeof products === 'undefined') return;

    const genderSelect = document.getElementById('genderFilter'); 
    const typeSelect = document.getElementById('typeFilter');     
    const priceSlider = document.getElementById('priceFilter');   

    const gender = genderSelect ? genderSelect.value : 'all';
    const type = typeSelect ? typeSelect.value : 'all';
    const maxPrice = priceSlider ? parseFloat(priceSlider.value) : 500;

    const filtered = products.filter(p => {
        let isMatch = true;
        if (gender !== 'all' && p.gender !== gender) isMatch = false;
        if (type !== 'all' && p.category !== type) isMatch = false;
        if (p.price > maxPrice) isMatch = false;
        return isMatch;
    });
    container.innerHTML = '';

    if (filtered.length === 0) {
        container.innerHTML = '<p class="no-products-msg">Няма намерени продукти.</p>';
        return;
    }

    filtered.forEach(p => {
        container.innerHTML += `
            <div class="product-item">
                <img src="${p.img}" class="product-img">

                <div class="product-info-top">
                    <h4>${p.name}</h4>
                    <p class="product-desc">${p.description || ''}</p>
                </div>

                <div class="product-info-bottom">
                    <p class="price">${p.price.toFixed(2)} лв.</p>
                    <button class="add-to-cart-btn" onclick="directOrder(${p.id})">
                        ПОРЪЧАЙ
                    </button>
                </div>
            </div>
        `;
    });
}

window.directOrder = function(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        localStorage.setItem('currentOrder', JSON.stringify(product));

        window.location.href = "order.html";
    }
};

function clearFilters() {
    if (document.getElementById('genderFilter'))
        document.getElementById('genderFilter').value = 'all';

    if (document.getElementById('typeFilter'))
        document.getElementById('typeFilter').value = 'all';

    if (document.getElementById('priceFilter')) {
        document.getElementById('priceFilter').value = 500;
        document.getElementById('priceValue').textContent = '500 лв.';
    }
    filterProducts();
}

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('priceFilter');

    if (slider) {
        slider.addEventListener('input', () => {

            document.getElementById('priceValue').textContent = slider.value + ' лв.';

            filterProducts();
        });
    }
    
    const params = new URLSearchParams(window.location.search);
    const genderParam = params.get('gender');

    if (genderParam && document.getElementById('genderFilter')) {
        document.getElementById('genderFilter').value = genderParam;
    }
    filterProducts();
});
