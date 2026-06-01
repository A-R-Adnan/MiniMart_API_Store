# MiniMart API Store

A responsive product store built with HTML, Tailwind CSS, and vanilla JavaScript. The app fetches products from the Fake Store API, supports search/filter/sort, shows product details in a modal, and includes a persistent cart using localStorage.

## Live Demo
[MiniMart](https://a-r-adnan.github.io/MiniMart_API_Store/)

## Features

- Fetch products from Fake Store API
- Show loading state while products are loading
- Show error message if product fetching fails
- Display products in a responsive grid
- Search products by title
- Filter products by category
- Sort products by price
- View product details in a modal
- Add products to cart
- Add products from the details modal
- Remove products from cart
- Show cart item count
- Show cart total price
- Save cart data in localStorage
- Clear cart after checkout
- Responsive cart sidebar

## Technologies Used

- HTML
- Tailwind CSS
- JavaScript
- Fetch API
- localStorage

## API Used

```txt
https://fakestoreapi.com/products
```

## Project Structure

```txt
mini-mart-api-store/
  index.html
  script.js
  package.json
  package-lock.json
  README.md
  src/
    input.css
    output.css
```

## How To Run Locally

Install dependencies:

```bash
npm install
```

Start Tailwind CLI watch mode:

```bash
npm run dev
```

Then open `index.html` in your browser.

## Main Learning Goals

This project was built to practice:

- Fetching API data with `fetch`
- Using `async/await`
- Handling loading and error states
- Rendering API data dynamically
- Searching, filtering, and sorting arrays
- Building a product details modal
- Managing cart state
- Saving and loading cart data with localStorage
- Using event delegation
- Creating responsive layouts with Tailwind CSS

## Future Improvements

- Add quantity increase/decrease buttons in cart
- Add clear cart button
- Close modal/sidebar when clicking outside
- Add Escape key support for closing modal/sidebar
- Add success message when product is added to cart
- Add product rating display
- Improve accessibility labels

