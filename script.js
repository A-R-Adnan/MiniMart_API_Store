const navCartBtn = document.querySelector("#navCartBtn");
const cartCount = document.querySelector("#cartCount");
const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const sortSelect = document.querySelector("#sortSelect");

const loadingMessage = document.querySelector("#loadingMessage");
const errorMessage = document.querySelector("#errorMessage");
const emptyMessage = document.querySelector("#emptyMessage");

const productGrid = document.querySelector("#productGrid");

const productOverlay = document.querySelector("#productOverlay");
const modalImage = document.querySelector("#modalImage");
const modalTitle = document.querySelector("#modalTitle");
const modalCategory = document.querySelector("#modalCategory");
const modalDescription = document.querySelector("#modalDescription");
const modalPrice = document.querySelector("#modalPrice");
const modalAddToCartBtn = document.querySelector("#modalAddToCartBtn");
const closeModalBtn = document.querySelector("#closeModalBtn");

const cartOverlay = document.querySelector("#cartOverlay");
const cartItemsContainer = document.querySelector("#cartItemsContainer");
const closeCartBtn = document.querySelector("#closeCartBtn");
const checkoutBtn = document.querySelector("#checkoutBtn");
const cartTotalPrice = document.querySelector("#cartTotalPrice");
const cartEmptyMessage = document.querySelector("#cartEmptyMessage")

const API_URL = "https://fakestoreapi.com/products";
const CART_STORAGE_KEY = "minimartCart";

let allProducts = [];
let filteredProducts = [];
let cart = [];

const loadCart = ()=>{
   cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
};

const saveCart = ()=>{
  localStorage.setItem(CART_STORAGE_KEY,JSON.stringify(cart));
};

const showElement = (element) => {
  element.classList.remove("hidden");
};

const hideElement = (element) => {
  element.classList.add("hidden");
};

const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

const createProductCard = (product) => {
  return `
    <article 
      class="productCard bg-white rounded-xl border border-slate-200 p-4 transition hover:shadow-md flex flex-col h-full"
      data-id="${product.id}"
    >
      <img 
        src="${product.image}" 
        alt="${product.title}" 
        class="productImage h-40 w-full object-contain mx-auto"
      >

      <div class="content flex flex-1 flex-col space-y-2 mt-4">
        <h3 class="productTitle font-semibold text-sm leading-5 min-h-10">
          ${product.title}
        </h3>

        <p class="productCategory self-start inline-flex rounded-full bg-slate-100 text-slate-600 text-xs px-2 py-1">
          ${product.category}
        </p>

        <p class="productPrice text-lg font-bold text-slate-900">
          ${formatPrice(product.price)}
        </p>

        <div class="productCardBtn flex gap-2 mt-auto pt-2">
          <button 
            class="detailsBtn font-medium flex-1 border rounded-lg px-3 py-2 bg-blue-50 text-blue-900 hover:bg-blue-100 border-blue-500 hover:cursor-pointer text-sm"
            type="button"
          >
            Details
          </button>

          <button 
            class="addToCartBtn flex-1 border font-medium text-white border-emerald-300 rounded-lg px-3 py-2 bg-emerald-400 hover:bg-emerald-500 hover:cursor-pointer text-sm"
            type="button"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  `;
};

const renderProducts = (products) => {
  productGrid.innerHTML = "";

  if (products.length === 0) {
    showElement(emptyMessage);
    return;
  }

  hideElement(emptyMessage);

  productGrid.innerHTML = products.map(createProductCard).join("");
};

const openProductModal = (product) => {
  modalImage.src = product.image;
  modalImage.alt = product.title;

  modalTitle.textContent = product.title;
  modalCategory.textContent = product.category;
  modalDescription.textContent = product.description;
  modalPrice.textContent = formatPrice(product.price);

  modalAddToCartBtn.dataset.id = product.id;

  showElement(productOverlay);
};

const closeProductModal = () => {
  hideElement(productOverlay);
};

const getProductById = (id) => {
  return allProducts.find((product) => product.id === id);
};

const handleDetailsBtnClick = (event) => {

  const detailsButton = event.target.closest(".detailsBtn");
  if (!detailsButton) return;

  const productCard = detailsButton.closest(".productCard");
  const productId = Number(productCard.dataset.id);

  const product = getProductById(productId);

  if (!product) return;

  openProductModal(product);
};

const createCartItem = (item)=>{
  return `<div data-id="${item.id}" class="cartItem space-y-2 border border-slate-200 rounded-lg p-4">
                    <h3 class="text-sm font-semibold text-slate-900">${item.title}</h3>
                    <p class="text-sm text-slate-500">Qty: ${item.quantity}</p>
                    <div class="flex justify-between">
                        <p class="font-semibold text-slate-900">${formatPrice(item.quantity*item.price)}</p>
                        <button class="cartRemoveBtn text-sm font-medium text-red-600 hover:text-red-700 hover:underline cursor-pointer">Remove</button>
                    </div>
            </div>`;
};

const renderCart = ()=>{
  cartItemsContainer.innerHTML = "";

  if(cart.length === 0)
  {
    showElement(cartEmptyMessage);
    hideElement(checkoutBtn);
    cartTotalPrice.innerText = formatPrice(0);
    return;
  }
  hideElement(cartEmptyMessage);
  showElement(checkoutBtn);

  cartItemsContainer.innerHTML = cart.map(createCartItem).join("");

  let totalPrice=0;
  cart.forEach((item)=>{
    totalPrice+=item.price*item.quantity;
  });

  cartTotalPrice.innerText = formatPrice(totalPrice);
};

const updateCartCount = () =>{
  let count=0;
  cart.forEach((item)=>{
    count+=item.quantity;
  })
  cartCount.innerText=count;
};

const addToCart = (id) =>{
  const product = allProducts.find((product)=>product.id===id);
  if(!product) return;
  const existingCartItem = cart.find((item) => item.id === id);
  if (existingCartItem)
     existingCartItem.quantity++;
  else
    cart.push({ id, quantity: 1, title:product.title, price: product.price });
  saveCart();
  renderCart();
  updateCartCount();
};


const handleAddToCartClick = (event) => {

  const addToCartBtn = event.target.closest(".addToCartBtn");
  if(!addToCartBtn) return;
  const id = Number(addToCartBtn.closest("article").dataset.id);
  addToCart(id);
};

const getProducts = async () => {
  showElement(loadingMessage);
  hideElement(errorMessage);
  hideElement(emptyMessage);

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    allProducts = await response.json();
    filteredProducts = [...allProducts];

    renderProducts(filteredProducts);
  } catch (error) {
    showElement(errorMessage);
    console.log(error);
  } finally {
    hideElement(loadingMessage);
  }
};

const applyFiltersAndSort = () => {
  filteredProducts = [...allProducts];
  const searchText = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const sortType = sortSelect.value;
  if (searchText !== "") {
    filteredProducts = filteredProducts.filter(product => {
      return product.title.toLowerCase().includes(searchText);
    })
  }
  if (category !== "all") {
    filteredProducts = filteredProducts.filter(product => {
      return product.category === category;
    })
  }
  if (sortType === "lowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }
  else if (sortType === "highToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  renderProducts(filteredProducts);
};

const openSideBar = ()=>{
  showElement(cartOverlay);
};

const closeSideBar = ()=>{
  hideElement(cartOverlay);
};

const handleRemoveCartItem = (event)=>{
   const removeBtn = event.target.closest(".cartRemoveBtn");
   if(!removeBtn) return;

   const id=Number(removeBtn.closest(".cartItem").dataset.id);

   cart=cart.filter((item)=>{
    return item.id!==id;
   })
   saveCart();
   renderCart();
   updateCartCount();
};

const handleCheckout = ()=>{
  cart = [];
  saveCart();
  renderCart();
  updateCartCount();
  alert("Checkout Completed!");
};

productGrid.addEventListener("click", handleDetailsBtnClick);
productGrid.addEventListener("click", handleAddToCartClick);
modalAddToCartBtn.addEventListener("click", ()=>{
  addToCart(Number(modalAddToCartBtn.dataset.id));
});
navCartBtn.addEventListener("click", openSideBar);
closeCartBtn.addEventListener("click", closeSideBar);
closeModalBtn.addEventListener("click", closeProductModal);
searchInput.addEventListener("input", applyFiltersAndSort);
categoryFilter.addEventListener("change", applyFiltersAndSort)
sortSelect.addEventListener("change", applyFiltersAndSort);
cartItemsContainer.addEventListener("click", handleRemoveCartItem);
checkoutBtn.addEventListener("click", handleCheckout);


loadCart();
updateCartCount();
renderCart();
getProducts();
