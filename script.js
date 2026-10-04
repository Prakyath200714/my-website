/* =========================================================
   MADA GENERAL STORE - script.js
   ========================================================= */

const ADMIN_PIN = "689768";
const WHATSAPP_NUMBER = "918123686297";

/* =========================================================
   DEFAULT PRODUCTS
   ========================================================= */

const defaultProducts = [
    {
        id: 1,
        name: "Premium Rice 5kg",
        price: 350,
        category: "Rice & Grains",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
        description: "Premium quality rice"
    },
    {
        id: 2,
        name: "Toor Dal 1kg",
        price: 160,
        category: "Dal & Pulses",
        image: "https://images.unsplash.com/photo-1585996787445-0f7b0b1a9e9a?auto=format&fit=crop&w=600&q=80",
        description: "Fresh and high quality toor dal"
    },
    {
        id: 3,
        name: "Sunflower Oil 1L",
        price: 145,
        category: "Oil",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
        description: "Refined sunflower oil"
    },
    {
        id: 4,
        name: "Sugar 1kg",
        price: 48,
        category: "Other",
        image: "https://images.unsplash.com/photo-1581268491976-1f0f9a8b5d76?auto=format&fit=crop&w=600&q=80",
        description: "Fine quality sugar"
    },
    {
        id: 5,
        name: "Wheat Flour 5kg",
        price: 260,
        category: "Rice & Grains",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
        description: "Fresh wheat flour"
    },
    {
        id: 6,
        name: "Fresh Milk 1L",
        price: 60,
        category: "Dairy",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
        description: "Fresh milk"
    },
    {
        id: 7,
        name: "Premium Tea Powder 250g",
        price: 120,
        category: "Beverages",
        image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=600&q=80",
        description: "Premium tea powder"
    },
    {
        id: 8,
        name: "Iodized Salt 1kg",
        price: 25,
        category: "Other",
        image: "https://images.unsplash.com/photo-1518110925495-5fe2c9a8b6d3?auto=format&fit=crop&w=600&q=80",
        description: "Good quality iodized salt"
    },
    {
        id: 9,
        name: "Fresh Potato 1kg",
        price: 40,
        category: "Vegetables",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80",
        description: "Fresh potatoes"
    },
    {
        id: 10,
        name: "Fresh Onion 1kg",
        price: 45,
        category: "Vegetables",
        image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80",
        description: "Fresh onions"
    },
    {
        id: 11,
        name: "Fresh Apple 1kg",
        price: 160,
        category: "Fruits",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
        description: "Fresh apples"
    },
    {
        id: 12,
        name: "Banana 1 Dozen",
        price: 60,
        category: "Fruits",
        image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80",
        description: "Fresh bananas"
    },
    {
        id: 13,
        name: "Turmeric Powder 100g",
        price: 35,
        category: "Spices",
        image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=600&q=80",
        description: "Pure turmeric powder"
    },
    {
        id: 14,
        name: "Crispy Biscuits",
        price: 30,
        category: "Snacks",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80",
        description: "Crispy tasty biscuits"
    },
    {
        id: 15,
        name: "Detergent 1kg",
        price: 110,
        category: "Household",
        image: "https://images.unsplash.com/photo-1585832770485-e68a5dbfad52?auto=format&fit=crop&w=600&q=80",
        description: "Powerful detergent"
    }
];

/* =========================================================
   LOAD PRODUCTS
   ========================================================= */

let products = JSON.parse(
    localStorage.getItem("madaProducts")
);

if (!products || !Array.isArray(products)) {
    products = defaultProducts;
    saveProducts();
}

/* =========================================================
   LOAD CART
   ========================================================= */

let cart = JSON.parse(
    localStorage.getItem("madaCart")
) || [];

/* =========================================================
   ADMIN STATUS
   ========================================================= */

let admin =
    sessionStorage.getItem("madaAdmin") === "true";

let selectedCategory = "All";

/* =========================================================
   SAVE PRODUCTS
   ========================================================= */

function saveProducts() {
    localStorage.setItem(
        "madaProducts",
        JSON.stringify(products)
    );
}

/* =========================================================
   SAVE CART
   ========================================================= */

function saveCart() {
    localStorage.setItem(
        "madaCart",
        JSON.stringify(cart)
    );
}

/* =========================================================
   ADMIN MODE
   ========================================================= */

function enableAdminMode() {

    admin = true;

    sessionStorage.setItem(
        "madaAdmin",
        "true"
    );

    document.body.classList.add(
        "admin-mode"
    );

    displayCategories();
    showProducts();

    alert(
        "Admin login successful!"
    );
}

function disableAdminMode() {

    admin = false;

    sessionStorage.removeItem(
        "madaAdmin"
    );

    document.body.classList.remove(
        "admin-mode"
    );

    displayCategories();
    showProducts();

    alert(
        "Admin logged out."
    );
}

/* =========================================================
   LOGIN
   ========================================================= */

function openLogin() {

    if (admin) {
        alert(
            "You are already logged in as Admin."
        );
        return;
    }

    const pin = prompt(
        "Enter Admin Password"
    );

    if (pin === null) {
        return;
    }

    if (pin === ADMIN_PIN) {
        enableAdminMode();
    } else {
        alert(
            "❌ Incorrect password!"
        );
    }
}

/* =========================================================
   LOGOUT
   ========================================================= */

function logout() {

    if (!admin) {
        return;
    }

    disableAdminMode();
}

/* =========================================================
   CATEGORIES
   ========================================================= */

function displayCategories() {

    const categoryBox =
        document.getElementById(
            "categories"
        );

    if (!categoryBox) {
        return;
    }

    const categories = [
        "All",
        ...new Set(
            products.map(
                product => product.category
            )
        )
    ];

    categoryBox.innerHTML =
        categories.map(category => {

            const active =
                selectedCategory === category
                    ? "active"
                    : "";

            return `
                <div
                    class="category ${active}"
                    onclick="filterCategory('${escapeHTML(category)}')">

                    ${escapeHTML(category)}

                </div>
            `;

        }).join("");
}

/* =========================================================
   FILTER CATEGORY
   ========================================================= */

function filterCategory(category) {

    selectedCategory = category;

    displayCategories();

    showProducts();
}

/* =========================================================
   SEARCH
   ========================================================= */

function showProducts() {

    const productBox =
        document.getElementById(
            "products"
        );

    if (!productBox) {
        return;
    }

    const searchBox =
        document.getElementById(
            "search"
        );

    const search =
        searchBox
            ? searchBox.value
                .trim()
                .toLowerCase()
            : "";

    const filteredProducts =
        products.filter(product => {

            const searchMatch =
                product.name
                    .toLowerCase()
                    .includes(search) ||

                product.category
                    .toLowerCase()
                    .includes(search);

            const categoryMatch =
                selectedCategory === "All" ||
                product.category ===
                selectedCategory;

            return (
                searchMatch &&
                categoryMatch
            );
        });

    if (
        filteredProducts.length === 0
    ) {

        productBox.innerHTML = `
            <div class="empty">
                <h3>No products found</h3>
                <p>Try another search.</p>
            </div>
        `;

        return;
    }

    productBox.innerHTML =
        filteredProducts.map(
            product => productCard(product)
        ).join("");
}

/* =========================================================
   PRODUCT CARD
   ========================================================= */

function productCard(product) {

    return `
        <div class="product">

            <div class="product-image-box">

                <img
                    src="${escapeAttribute(product.image)}"
                    alt="${escapeAttribute(product.name)}"
                    class="product-image"
                    onerror="this.src='https://via.placeholder.com/500x400?text=Grocery'"
                >

            </div>

            <div class="product-info">

                <div class="category-name">
                    ${escapeHTML(product.category)}
                </div>

                <h3>
                    ${escapeHTML(product.name)}
                </h3>

                <p class="description">
                    ${escapeHTML(
                        product.description || ""
                    )}
                </p>

                <div class="price">
                    ₹${Number(product.price)
                        .toLocaleString("en-IN")}
                </div>

                <button
                    class="add"
                    onclick="addCart(${product.id})">

                    🛒 Add to Cart

                </button>

                ${
                    admin
                        ? `
                        <div class="admin-controls">

                            <button
                                class="edit"
                                onclick="editProduct(${product.id})">

                                ✏️ Edit

                            </button>

                            <button
                                class="delete"
                                onclick="deleteProduct(${product.id})">

                                🗑️ Delete

                            </button>

                        </div>
                        `
                        : ""
                }

            </div>

        </div>
    `;
}

/* =========================================================
   ADD TO CART
   ========================================================= */

function addCart(id) {

    const product =
        products.find(
            product => product.id === id
        );

    if (!product) {
        return;
    }

    const existing =
        cart.find(
            item => item.id === id
        );

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            id: id,
            quantity: 1
        });
    }

    saveCart();
    updateCart();

    showCartMessage(
        product.name +
        " added to cart!"
    );
}

/* =========================================================
   CART MESSAGE
   ========================================================= */

function showCartMessage(message) {

    const old =
        document.querySelector(
            ".cart-message"
        );

    if (old) {
        old.remove();
    }

    const div =
        document.createElement(
            "div"
        );

    div.className =
        "cart-message";

    div.textContent =
        "✓ " + message;

    document.body.appendChild(div);

    setTimeout(() => {

        div.classList.add(
            "hide"
        );

        setTimeout(() => {
            div.remove();
        }, 300);

    }, 1800);
}

/* =========================================================
   UPDATE CART
   ========================================================= */

function updateCart() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    const cartCount =
        document.getElementById(
            "cartCount"
        );

    if (cartCount) {
        cartCount.textContent =
            count;
    }
}

/* =========================================================
   OPEN CART
   ========================================================= */

function openCart() {

    const modal =
        document.getElementById(
            "cartModal"
        );

    if (!modal) {
        return;
    }

    modal.style.display =
        "flex";

    const cartPage =
        document.getElementById(
            "cartPage"
        );

    const success =
        document.getElementById(
            "orderSuccess"
        );

    if (cartPage) {
        cartPage.style.display =
            "block";
    }

    if (success) {
        success.style.display =
            "none";
    }

    displayCart();
}

/* =========================================================
   DISPLAY CART
   ========================================================= */

function displayCart() {

    const cartBox =
        document.getElementById(
            "cartItems"
        );

    if (!cartBox) {
        return;
    }

    if (cart.length === 0) {

        cartBox.innerHTML = `
            <div class="empty">
                🛒
                <h3>Your cart is empty</h3>
                <p>Add some groceries to continue.</p>
            </div>
        `;

        setTotal(0);

        return;
    }

    let total = 0;

    cartBox.innerHTML =
        cart.map(item => {

            const product =
                products.find(
                    p => p.id === item.id
                );

            if (!product) {
                return "";
            }

            const itemTotal =
                Number(product.price) *
                item.quantity;

            total += itemTotal;

            return `
                <div class="cart-item">

                    <div class="cart-product">

                        <strong>
                            ${escapeHTML(product.name)}
                        </strong>

                        <small>
                            ₹${Number(product.price)
                                .toLocaleString("en-IN")}
                            each
                        </small>

                        <div>
                            Item Total:
                            <strong>
                                ₹${itemTotal
                                    .toLocaleString("en-IN")}
                            </strong>
                        </div>

                    </div>

                    <div class="qty">

                        <button
                            onclick="changeQty(${item.id}, -1)">

                            −

                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQty(${item.id}, 1)">

                            +

                        </button>

                    </div>

                </div>
            `;

        }).join("");

    setTotal(total);
}

/* =========================================================
   SET TOTAL
   ========================================================= */

function setTotal(total) {

    const totalElement =
        document.getElementById(
            "total"
        );

    if (totalElement) {

        totalElement.textContent =
            Number(total)
                .toLocaleString("en-IN");
    }
}

/* =========================================================
   CHANGE QUANTITY
   ========================================================= */

function changeQty(id, change) {

    const item =
        cart.find(
            item => item.id === id
        );

    if (!item) {
        return;
    }

    item.quantity += change;

    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== id
            );
    }

    saveCart();

    updateCart();

    displayCart();
}

/* =========================================================
   SEND WHATSAPP ORDER
   ========================================================= */

function sendOrder() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;
    }

    const name =
        getValue("customerName");

    const phone =
        getValue("customerPhone");

    const address =
        getValue("customerAddress");

    if (
        !name ||
        !phone ||
        !address
    ) {

        alert(
            "Please enter your name, phone number and delivery address."
        );

        return;
    }

    let total = 0;

    let message =
        "🛒 *NEW ORDER - MADA GENERAL STORE*\n\n";

    message +=
        "*CUSTOMER DETAILS*\n";

    message +=
        "Name: " + name + "\n";

    message +=
        "Phone: " + phone + "\n";

    message +=
        "Address: " + address + "\n\n";

    message +=
        "*ORDER ITEMS*\n";

    cart.forEach(item => {

        const product =
            products.find(
                p => p.id === item.id
            );

        if (!product) {
            return;
        }

        const itemTotal =
            Number(product.price) *
            item.quantity;

        total += itemTotal;

        message +=
            "• " +
            product.name +
            " × " +
            item.quantity +
            " = ₹" +
            itemTotal +
            "\n";
    });

    message +=
        "\n💰 *TOTAL: ₹" +
        total +
        "*";

    const url =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(message);

    window.open(
        url,
        "_blank"
    );

    setTimeout(() => {

        const cartPage =
            document.getElementById(
                "cartPage"
            );

        const success =
            document.getElementById(
                "orderSuccess"
            );

        if (cartPage) {
            cartPage.style.display =
                "none";
        }

        if (success) {
            success.style.display =
                "block";
        }

    }, 500);
}

/* =========================================================
   CONTINUE SHOPPING
   ========================================================= */

function continueShopping() {

    cart = [];

    saveCart();

    updateCart();

    setTotal(0);

    setValue(
        "customerName",
        ""
    );

    setValue(
        "customerPhone",
        ""
    );

    setValue(
        "customerAddress",
        ""
    );

    const cartPage =
        document.getElementById(
            "cartPage"
        );

    const success =
        document.getElementById(
            "orderSuccess"
        );

    if (cartPage) {
        cartPage.style.display =
            "block";
    }

    if (success) {
        success.style.display =
            "none";
    }

    closeModal(
        "cartModal"
    );

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

/* =========================================================
   ADD PRODUCT
   ========================================================= */

function addProduct() {

    if (!admin) {

        alert(
            "Admin login required."
        );

        return;
    }

    clearProductForm();

    const title =
        document.getElementById(
            "productTitle"
        );

    if (title) {
        title.textContent =
            "Add New Product";
    }

    const modal =
        document.getElementById(
            "productModal"
        );

    if (modal) {
        modal.style.display =
            "flex";
    }
}

/* =========================================================
   EDIT PRODUCT
   ========================================================= */

function editProduct(id) {

    if (!admin) {

        alert(
            "Admin login required."
        );

        return;
    }

    const product =
        products.find(
            product => product.id === id
        );

    if (!product) {
        return;
    }

    setValue(
        "productId",
        product.id
    );

    setValue(
        "productName",
        product.name
    );

    setValue(
        "productPrice",
        product.price
    );

    setValue(
        "productCategory",
        product.category
    );

    setValue(
        "productImage",
        product.image
    );

    setValue(
        "productDescription",
        product.description || ""
    );

    const title =
        document.getElementById(
            "productTitle"
        );

    if (title) {
        title.textContent =
            "Edit Product & Market Price";
    }

    const modal =
        document.getElementById(
            "productModal"
        );

    if (modal) {
        modal.style.display =
            "flex";
    }
}

/* =========================================================
   CLEAR PRODUCT FORM
   ========================================================= */

function clearProductForm() {

    setValue(
        "productId",
        ""
    );

    setValue(
        "productName",
        ""
    );

    setValue(
        "productPrice",
        ""
    );

    setValue(
        "productImage",
        ""
    );

    setValue(
        "productDescription",
        ""
    );
}

/* =========================================================
   SAVE PRODUCT
   ========================================================= */

function saveProduct() {

    if (!admin) {

        alert(
            "Admin login required."
        );

        return;
    }

    const id =
        getValue("productId");

    const name =
        getValue("productName");

    const price =
        Number(
            getValue("productPrice")
        );

    const category =
        getValue("productCategory");

    const image =
        getValue("productImage");

    const description =
        getValue("productDescription");

    if (!name) {

        alert(
            "Please enter product name."
        );

        return;
    }

    if (
        !price ||
        price <= 0
    ) {

        alert(
            "Please enter a valid price."
        );

        return;
    }

    if (!category) {

        alert(
            "Please select category."
        );

        return;
    }

    if (!image) {

        alert(
            "Please enter product image URL."
        );

        return;
    }

    /* EDIT */

    if (id) {

        const product =
            products.find(
                p => p.id == id
            );

        if (!product) {
            return;
        }

        product.name =
            name;

        product.price =
            price;

        product.category =
            category;

        product.image =
            image;

        product.description =
            description;

        alert(
            "✅ Product updated successfully!"
        );

    }

    /* ADD */

    else {

        const newProduct = {

            id:
                Date.now(),

            name:
                name,

            price:
                price,

            category:
                category,

            image:
                image,

            description:
                description
        };

        products.push(
            newProduct
        );

        alert(
            "✅ New product added successfully!"
        );
    }

    saveProducts();

    displayCategories();

    showProducts();

    closeModal(
        "productModal"
    );
}

/* =========================================================
   DELETE PRODUCT
   ========================================================= */

function deleteProduct(id) {

    if (!admin) {

        alert(
            "Admin login required."
        );

        return;
    }

    const product =
        products.find(
            p => p.id === id
        );

    if (!product) {
        return;
    }

    const confirmed =
        confirm(
            "Delete " +
            product.name +
            "?"
        );

    if (!confirmed) {
        return;
    }

    products =
        products.filter(
            p => p.id !== id
        );

    cart =
        cart.filter(
            item => item.id !== id
        );

    saveProducts();

    saveCart();

    displayCategories();

    showProducts();

    updateCart();

    alert(
        "Product deleted."
    );
}

/* =========================================================
   CLOSE MODAL
   ========================================================= */

function closeModal(id) {

    const modal =
        document.getElementById(id);

    if (modal) {

        modal.style.display =
            "none";
    }
}

/* =========================================================
   CLICK OUTSIDE MODAL
   ========================================================= */

window.addEventListener(
    "click",
    function(event) {

        document
            .querySelectorAll(".modal")
            .forEach(modal => {

                if (
                    event.target === modal
                ) {

                    modal.style.display =
                        "none";
                }
            });
    }
);

/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            document
                .querySelectorAll(".modal")
                .forEach(modal => {

                    modal.style.display =
                        "none";
                });
        }
    }
);

/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */

function getValue(id) {

    const element =
        document.getElementById(id);

    if (!element) {
        return "";
    }

    return String(
        element.value
    ).trim();
}

function setValue(id, value) {

    const element =
        document.getElementById(id);

    if (element) {
        element.value =
            value;
    }
}

function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}

function escapeAttribute(value) {
    return escapeHTML(value);
}

/* =========================================================
   ADMIN BUTTON SUPPORT
   ========================================================= */

function checkAdmin() {

    if (admin) {

        document.body.classList.add(
            "admin-mode"
        );

    } else {

        document.body.classList.remove(
            "admin-mode"
        );
    }
}

/* =========================================================
   START WEBSITE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        checkAdmin();

        displayCategories();

        showProducts();

        updateCart();
    }
);

/* =========================================================
   AUTO REFRESH PRODUCT DATA
   =========================================================
   If another tab changes localStorage,
   refresh this website automatically.
   ========================================================= */

window.addEventListener(
    "storage",
    function(event) {

        if (
            event.key ===
            "madaProducts"
        ) {

            const newProducts =
                JSON.parse(
                    event.newValue
                );

            if (
                Array.isArray(
                    newProducts
                )
            ) {

                products =
                    newProducts;

                displayCategories();

                showProducts();
            }
        }

        if (
            event.key ===
            "madaCart"
        ) {

            cart =
                JSON.parse(
                    event.newValue
                ) || [];

            updateCart();

            displayCart();
        }
    }
);
