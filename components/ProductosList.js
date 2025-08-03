import './ProductoItem.js';

class ProductosList extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback(apiUrl, apiToken) {
        this.apiUrl = this.getAttribute('api-url');
        this.apiToken = this.getAttribute('api-token');

        fetch(this.apiUrl, {
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer ' + this.apiToken
            }
        })
        .then(res => res.json())
        .then(products => this.renderProducts(products))
        .catch(err => this.renderError(err));
    }

    renderProducts(products) {
        products.forEach(product => {
            // Multiplicamos product.price x 1000 y le quitamos los decimales
            product.price = Math.floor(product.price * 1000);

            const productItem = document.createElement('producto-item');
            productItem.setAttribute('title', product.title);
            productItem.setAttribute('picture', `https://vibe-eccomerce-api.onrender.com${product.pictures[0]}`);
            productItem.setAttribute('description', product.description);
            productItem.setAttribute('price', product.price);
            
            this.appendChild(productItem);
        });

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

customElements.define('productos-list', ProductosList);
