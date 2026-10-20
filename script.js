const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 12.99,
    category: "Clothing",
    image: "https://picsum.photos/seed/shirt/300/200",
  },
  {
    id: 2,
    name: "Denim Jacket",
    price: 45.5,
    category: "Clothing",
    image: "https://picsum.photos/seed/jacket/300/200",
  },
  {
    id: 3,
    name: "Running Sneakers",
    price: 59.99,
    category: "Shoes",
    image: "https://picsum.photos/seed/sneakers/300/200",
  },
  {
    id: 4,
    name: "Leather Sandals",
    price: 24.0,
    category: "Shoes",
    image: "https://picsum.photos/seed/sandals/300/200",
  },
  {
    id: 5,
    name: "Canvas Backpack",
    price: 34.75,
    category: "Accessories",
    image: "https://picsum.photos/seed/backpack/300/200",
  },
  {
    id: 6,
    name: "Sunglasses",
    price: 18.4,
    category: "Accessories",
    image: "https://picsum.photos/seed/glasses/300/200",
  },
  {
    id: 7,
    name: "Wrist Watch",
    price: 79.9,
    category: "Accessories",
    image: "https://picsum.photos/seed/watch/300/200",
  },
  {
    id: 8,
    name: "Wool Beanie",
    price: 9.99,
    category: "Clothing",
    image: "https://picsum.photos/seed/beanie/300/200",
  },
];

const productList = document.getElementById('product-list');
const shoppingCart = document.getElementById('shopping-cart');
const cartDetails = document.getElementById('cart-details');
const searchName = document.getElementById('search');
const categoryFilter = document.getElementById('category');

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let lastAddedProduct = null;

function renderCart() {
  cartDetails.replaceChildren();

  const items = document.createElement('p');
  items.className = 'items';
  items.innerHTML = `<span id="items">Items</span> <span id="items-value">0</span>`;

  const total = document.createElement('p');
  total.className = 'total';
  total.innerHTML = `<span id="total">Total</span> <span id="total-value">$0.00</span>`;


  if (cart.length == 0) {
    const content = document.createElement('p');
    const hr = document.createElement('hr');
    content.className = 'cart-content';
    content.textContent = 'Your cart is empty.';
    cartDetails.append(content, hr, items, total);
  }

  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach((item) => {
    const product = products.find((value) => value.id == item.id);

    const lineTotal = item.quantity * product.price;
    totalItems += item.quantity;
    totalPrice += lineTotal;

    const header = document.createElement('div');
    header.className = 'header';

    if (item.id == lastAddedProduct) {
      header.classList.add('highlight');
    }

    const cta = document.createElement('div');
    cta.className = 'cta';

    const footer = document.createElement('div');
    footer.className = 'footer';

    const hr = document.createElement('hr');

    const itemName = document.createElement('p');
    itemName.className = 'item-name';
    itemName.textContent = `${product.name}`;

    const unitPrice = document.createElement('p');
    unitPrice.className = 'unit-price';
    unitPrice.textContent = `$${product.price.toFixed(2)} each`;

    const quantity = document.createElement('p');
    quantity.textContent = `${item.quantity}`;

    const line_total = document.createElement('p');
    line_total.className = 'line-total';
    line_total.textContent = `$${lineTotal.toFixed(2)}`;

    const addButton = document.createElement('button');
    addButton.className = 'add-button';
    addButton.textContent = '+';
    addButton.dataset.id = item.id;

    addButton.addEventListener('click', () => {
      const object = cart.find((item) => item.id == addButton.dataset.id);

      if (object) {
        object.quantity++;
        renderCart();
      }
    });

    const reduceButton = document.createElement('button');
    reduceButton.className = 'reduce-button';
    reduceButton.textContent = '-';
    reduceButton.dataset.id = item.id;

    reduceButton.addEventListener('click', () => {
      const object = cart.find((item) => item.id == reduceButton.dataset.id);

      if (object) {
        object.quantity--;
        renderCart();
      }

      if (object.quantity < 1) {
        cart = cart.filter((elem) => elem !== object)
        renderCart();
      }
    });

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-button';
    removeButton.textContent = 'Remove';
    removeButton.dataset.id = item.id;

    removeButton.addEventListener('click', () => {
      const object = cart.find((item) => item.id == removeButton.dataset.id);

      if (object) {
        cart = cart.filter((elem) => elem !== object)
        renderCart();
      }
    });

    items.innerHTML = `<span id="items">Items</span> <span id="items-value">${totalItems}</span>`;

    total.innerHTML = `<span id="total">Total</span> <span id="total-value">$${totalPrice.toFixed(2)}</span>`;

    header.append(itemName, line_total);
    cta.append(addButton, quantity, reduceButton);
    footer.append(cta, removeButton);
    cartDetails.append(header, unitPrice, footer, hr);
  });

  cartDetails.append(items, total);

  localStorage.setItem('cart', JSON.stringify(cart));

  lastAddedProduct = null;
}

function renderProductList(productItems) {
  let productItem = [];
  productList.replaceChildren();

  productItems.forEach((product) => {
    if (product.name.toLowerCase().includes(searchName.value.toLowerCase()) && (categoryFilter.value === product.category || categoryFilter.value == 'All')) {
      const card = document.createElement('div');
      card.className = 'product-card';

      productItem.push(product);

      const cardInfo = document.createElement('div');
      cardInfo.className = 'product-info';

      const cta = document.createElement('div');
      cta.className = 'product-cta';

      const image = document.createElement('img');
      image.className = 'product-image';
      image.src = product.image;
      image.alt = product.name;

      const name = document.createElement('h2');
      name.className = 'product-name';
      name.textContent = product.name;

      const category = document.createElement('p');
      category.className = 'product-category';
      category.textContent = product.category;

      const price = document.createElement('p');
      price.className = 'product-price';
      price.textContent = `$${product.price.toFixed(2)} `;

      const button = document.createElement('button');
      button.className = 'product-button';
      button.textContent = 'Add to cart';
      button.dataset.id = product.id;

      button.addEventListener('click', () => {
        const object = cart.find((item) => item.id == button.dataset.id);
        lastAddedProduct = product.id;

        if (object) {
          object.quantity++;
          renderCart();
          renderProductList(products);
        } else if (Number(button.dataset.id) == product.id) {
          cart.push({
            id: product.id,
            quantity: 1,
          });
          renderCart();
          renderProductList(products);
        }
      });

      cta.append(price, button);
      cardInfo.append(name, category, cta);
      card.append(image, cardInfo);
      productList.append(card);
    }
  });

  if (productItem.length == 0) {

    const emptyProduct = document.createElement('div');
    emptyProduct.className = 'empty-product';

    const message = document.createElement('p');
    message.className = 'message';
    message.textContent = 'No products found';

    const tag = document.createElement('p');
    tag.className = 'tag';
    tag.textContent = 'Try a different search or category';

    emptyProduct.append(message, tag);
    productList.append(emptyProduct);
  }
}

searchName.addEventListener('input', () => {
  renderProductList(products);
});

categoryFilter.addEventListener('change', () => {
  renderProductList(products);
});


renderCart();
renderProductList(products);