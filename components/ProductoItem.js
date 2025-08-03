class ProductoItem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const product = {
            title: this.getAttribute('title') || 'Título del Producto',
            picture: this.getAttribute('picture') || 'https://via.placeholder.com/150',
            description: this.getAttribute('description') || 'Descripción del producto',
            price: parseFloat(this.getAttribute('price') || '0')
        };

        this.render(product);
    }

    render(product) {
        console.log('Product data:', product);
        this.innerHTML = `
            <style>
                @import '/style.css';
            </style>

            <div class="max-w-96 shadow-lg bg-gray-100  h-full flex flex-col">
                <img src="${product.picture}" alt="${product.title}" class="aspect-square w-full mix-blend-multiply brightness-110">
                <div class="flex-1 p-3 bg-white flex flex-col justify-between">
                    <h2 class="text-xl font-bold mb-1">${product.title}</h2>
                    <p class="text-gray-600 mb-2">${product.description}</p>
                    <div class="text-2xl font-semibold text-green-600">$${product.price}</div>
                </div>
            </div>
        `;
    }

    renderError(error) {
        this.shadowRoot.innerHTML = `
            <style>
                @import '/src/style.css';
                
                :host {
                    display: block;
                }
            </style>
            <div class="text-red-600 font-semibold">Error loading product: ${error.message}</div>
        `;
    }
}

customElements.define('producto-item', ProductoItem);
