# Mini Shopping Cart

A single-page shopping cart built with plain HTML, CSS and JavaScript (no frameworks or libraries).

## Features

- Product cards generated from a JavaScript array
- Add to cart, with quantity increase instead of duplicate rows
- `+`, `-` and Remove controls (a row is removed when its quantity reaches 0)
- Live item count and total price, shown with two decimal places
- "Your cart is empty." empty state
- Search by name and filter by category, working together
- "No products found" message when nothing matches
- Responsive layout (CSS Grid and Flexbox): the cart sits beside the products on desktop and stacks below on smaller screens
- Cart saved in `localStorage`, so it survives a page refresh
- Highlight animation on the cart row when a product is added

## Files

- `index.html`: page structure
- `style.css`: styles and responsive rules
- `script.js`: product data, cart logic and DOM rendering

## How to run

Open `index.html` in a browser. No build step or installation is needed.

## Decisions

- **Cart data:** the cart is an array of `{ id, quantity }` objects. Names and prices are looked up from the products array, so there is one source of truth for product data.
- **Rendering:** `renderCart()` rebuilds the cart from the data after every change, so the screen always matches the data.
- **Saving:** the cart is saved to `localStorage` at the end of `renderCart()`, since it runs after every change. It is read back with `JSON.parse(...) || []` on load.
- **Highlight:** a `lastAddedProduct` variable remembers which product was just added from the list. `renderCart()` adds the `highlight` class to that row and then resets the variable, so `+`, `-` and Remove don't replay the animation.
- **Responsiveness:** breakpoints were chosen by resizing the browser and noting where the layout broke, not from a fixed list of device sizes.

## What I would improve with more time

- Update only the changed cart row instead of rebuilding the whole cart
- Use one shared event handler on the cart instead of attaching listeners to every button
- Guard the `-` button handler so the quantity check only runs when the item exists
- Replace the fixed pixel widths that remain in the CSS with flexible ones
