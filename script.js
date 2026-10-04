/* =========================================================
   MADA GENERAL STORE
   FLIPKART STYLE - JAVASCRIPT
   ========================================================= */


/* =========================================================
   DEFAULT PRODUCTS
   ========================================================= */

const defaultProducts = [

    {
        id: 1,
        name: "Rice 5kg",
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
        description: "Fresh toor dal"
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
        name: "Milk 1L",
        price: 60,
        category: "Dairy",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
        description: "Fresh milk"
    },

    {
        id: 7,
        name: "Tea Powder 250g",
        price: 120,
        category: "Beverages",
        image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=600&q=80",
        description: "Premium tea"
    },

    {
        id: 8,
        name: "Salt 1kg",
        price: 25,
        category: "Other",
        image: "https://images.unsplash.com/photo-1518110925495-5fe2c9a8b6d3?auto=format&fit=crop&w=600&q=80",
        description: "Iodized salt"
    },

    {
        id: 9,
        name: "Potato 1kg",
        price: 40,
        category: "Vegetables",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80",
        description: "Fresh potatoes"
    },

    {
        id: 10,
        name: "Onion 1kg",
        price: 45,
        category: "Vegetables",
        image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80",
        description: "Fresh onions"
    },

    {
        id: 11,
        name: "Apple 1kg",
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
        description: "Pure turmeric"
    },

    {
        id: 14,
        name: "Biscuits",
        price: 30,
        category: "Snacks",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80",
        description: "Crispy biscuits"
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


if (!products) {

    products = defaultProducts;

    localStorage.setItem(
        "madaProducts",
        JSON.stringify(products)
    );

}


/* =========================================================
   CART
   ========================================================= */

let cart = JSON.parse(
    localStorage.getItem("madaCart")
) || [];


/* =========================================================
   ADMIN
   ========================================================= */

let admin =
    sessionStorage.getItem("madaAdmin") === "true";


if (admin) {

    document.body.classList.add(
        "admin-mode"
    );

}


/* =========================================================
   CATEGORY
   ========================================================= */

let selectedCategory = "All";


function displayCategories() {

    const categoryBox =
        document.getElementById("categories");


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
        categories.map(category => `

            <div
                class="category ${
                    selectedCategory === category
                        ? "active"
                        : ""
                }"
                onclick="filterCategory('${category}')">

                ${category}

            </div>

        `).join("");

}


function filterCategory(category) {

    selectedCategory = category;

    displayCategories();

    showProducts();

}


/* =========================================================
   SHOW PRODUCTS
   ========================================================= */

function showProducts() {

    const productBox =
        document.getElementById("products");


    if (!productBox) {
        return;
    }


    const searchInput =
        document.getElementById("search");


    const search =
        searchInput
            ? searchInput.value.toLowerCase()
            : "";


    const filtered =
        products.filter(product => {

            const searchMatch =
                product.name
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


    if (filtered.length === 0) {

        productBox.innerHTML = `

            <div class="empty">

                <h3>
                    No products found
                </h3>

                <p>
                    Try another search.
                </p>

            </div>

        `;

        return;

    }


    productBox.innerHTML =
        filtered.map(product => `

        <div class="product">

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"

                    onerror="
                        this.src=
                        'https://via.placeholder.com/400x300?text=Grocery'
                    "
                >

            </div>


            <div class="product-info">

                <div class="category-name">

                    ${product.category}

                </div>


                <h3>

                    ${product.name}

                </h3>


                <p class="description">

                    ${product.description || ""}

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
                            onclick="
                                editProduct(${product.id})
                            ">

                            ✏️ Edit

                        </button>


                        <button
                            class="delete"
                            onclick="
                                deleteProduct(${product.id})
                            ">

                            🗑️ Delete

                        </button>

                    </div>

                    `
                    : ""
                }

            </div>

        </div>

        `).join("");

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


    alert(
        product.name +
        " added to cart!"
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
   CART COUNT
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


    modal.style.display = "flex";


    document.getElementById(
        "cartPage"
    ).style.display = "block";


    document.getElementById(
        "orderSuccess"
    ).style.display = "none";


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

                🛒 Your cart is empty.

            </div>

        `;


        document.getElementById(
            "total"
        ).textContent = "0";


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
                product.price *
                item.quantity;


            total += itemTotal;


            return `

                <div class="cart-item">

                    <div>

                        <strong>
                            ${product.name}
                        </strong>

                        <br>

                        ₹${product.price}
                        × ${item.quantity}

                    </div>


                    <div class="qty">

                        <button
                            onclick="
                                changeQty(
                                    ${item.id},
                                    -1
                                )
                            ">

                            −

                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            onclick="
                                changeQty(
                                    ${item.id},
                                    1
                                )
                            ">

                            +

                        </button>

                    </div>

                </div>

            `;

        }).join("");


    document.getElementById(
        "total"
    ).textContent =
        total.toLocaleString("en-IN");

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
   ADMIN LOGIN
   ========================================================= */

function openLogin() {

    if (admin) {

        alert(
            "You are already logged in as Admin."
        );

        return;

    }


    const modal =
        document.getElementById(
            "loginModal"
        );


    if (modal) {

        modal.style.display =
            "flex";

    }


    const pin =
        document.getElementById("pin");


    if (pin) {

        pin.value = "";

        setTimeout(
            () => pin.focus(),
            100
        );

    }

}


/* =========================================================
   LOGIN
   PASSWORD = 689768
   ========================================================= */

function login() {

    const pin =
        document.getElementById(
            "pin"
        ).value;


    if (pin === "689768") {

        admin = true;


        sessionStorage.setItem(
            "madaAdmin",
            "true"
        );


        document.body.classList.add(
            "admin-mode"
        );


        closeModal(
            "loginModal"
        );


        displayCategories();

        showProducts();


        alert(
            "✅ Admin Login Successful!"
        );


    } else {

        document.getElementById(
            "loginError"
        ).textContent =
            "❌ Incorrect password.";

    }

}


/* =========================================================
   LOGOUT
   ========================================================= */

function logout() {

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
   ADD PRODUCT
   ========================================================= */

function addProduct() {

    if (!admin) {

        alert(
            "Admin login required."
        );

        return;

    }


    document.getElementById(
        "productTitle"
    ).textContent =
        "➕ Add New Product";


    document.getElementById(
        "productId"
    ).value = "";


    document.getElementById(
        "productName"
    ).value = "";


    document.getElementById(
        "productPrice"
    ).value = "";


    document.getElementById(
        "productImage"
    ).value = "";


    document.getElementById(
        "productDescription"
    ).value = "";


    document.getElementById(
        "productModal"
    ).style.display =
        "flex";

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

        alert(
            "Product not found."
        );

        return;

    }


    document.getElementById(
        "productTitle"
    ).textContent =
        "✏️ Edit Product";


    document.getElementById(
        "productId"
    ).value =
        product.id;


    document.getElementById(
        "productName"
    ).value =
        product.name;


    document.getElementById(
        "productPrice"
    ).value =
        product.price;


    document.getElementById(
        "productCategory"
    ).value =
        product.category;


    document.getElementById(
        "productImage"
    ).value =
        product.image;


    document.getElementById(
        "productDescription"
    ).value =
        product.description || "";


    document.getElementById(
        "productModal"
    ).style.display =
        "flex";

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
        document.getElementById(
            "productId"
        ).value;


    const name =
        document.getElementById(
            "productName"
        ).value.trim();


    const price =
        Number(
            document.getElementById(
                "productPrice"
            ).value
        );


    const category =
        document.getElementById(
            "productCategory"
        ).value;


    const image =
        document.getElementById(
            "productImage"
        ).value.trim();


    const description =
        document.getElementById(
            "productDescription"
        ).value.trim();


    if (!name) {

        alert(
            "Please enter product name."
        );

        return;

    }


    if (!price || price <= 0) {

        alert(
            "Please enter a valid price."
        );

        return;

    }


    if (!image) {

        alert(
            "Please enter product image URL."
        );

        return;

    }


    /* EDIT EXISTING PRODUCT */

    if (id) {

        const product =
            products.find(
                product => product.id == id
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


    /* ADD NEW PRODUCT */

    else {

        const newProduct = {

            id: Date.now(),

            name: name,

            price: price,

            category: category,

            image: image,

            description: description

        };


        products.push(
            newProduct
        );


        alert(
            "✅ Product added successfully!"
        );

    }


    localStorage.setItem(
        "madaProducts",
        JSON.stringify(products)
    );


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
            product => product.id === id
        );


    if (!product) {
        return;
    }


    const answer =
        confirm(
            "Are you sure you want to delete " +
            product.name +
            "?"
        );


    if (!answer) {
        return;
    }


    products =
        products.filter(
            product => product.id !== id
        );


    localStorage.setItem(
        "madaProducts",
        JSON.stringify(products)
    );


    cart =
        cart.filter(
            item => item.id !== id
        );


    saveCart();

    updateCart();


    displayCategories();

    showProducts();


    alert(
        "Product deleted successfully."
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
        document.getElementById(
            "customerName"
        ).value.trim();


    const phone =
        document.getElementById(
            "customerPhone"
        ).value.trim();


    const address =
        document.getElementById(
            "customerAddress"
        ).value.trim();


    if (!name || !phone || !address) {

        alert(
            "Please enter your name, phone number and address."
        );

        return;

    }


    let message =
        "*NEW ORDER - MADA GENERAL STORE*%0A%0A";


    message +=
        "*Customer:* " +
        encodeURIComponent(name) +
        "%0A";


    message +=
        "*Phone:* " +
        encodeURIComponent(phone) +
        "%0A";


    message +=
        "*Address:* " +
        encodeURIComponent(address) +
        "%0A%0A";


    message +=
        "*ITEMS:*%0A";


    let total = 0;


    cart.forEach(item => {

        const product =
            products.find(
                product =>
                    product.id === item.id
            );


        if (!product) {
            return;
        }


        const itemTotal =
            product.price *
            item.quantity;


        total += itemTotal;


        message +=
            encodeURIComponent(
                product.name
            ) +
            " x " +
            item.quantity +
            " = ₹" +
            itemTotal +
            "%0A";

    });


    message +=
        "%0A*TOTAL: ₹" +
        total +
        "*";


    /*
       YOUR WHATSAPP NUMBER
    */

    const whatsappNumber =
        "918792043577";


    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        message;


    window.open(
        whatsappURL,
        "_blank"
    );


    setTimeout(() => {

        document.getElementById(
            "cartPage"
        ).style.display =
            "none";


        document.getElementById(
            "orderSuccess"
        ).style.display =
            "block";

    }, 700);

}


/* =========================================================
   CONTINUE SHOPPING
   ========================================================= */

function continueShopping() {

    cart = [];


    saveCart();


    updateCart();


    document.getElementById(
        "customerName"
    ).value = "";


    document.getElementById(
        "customerPhone"
    ).value = "";


    document.getElementById(
        "customerAddress"
    ).value = "";


    document.getElementById(
        "cartPage"
    ).style.display =
        "block";


    document.getElementById(
        "orderSuccess"
    ).style.display =
        "none";


    closeModal(
        "cartModal"
    );


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================================
   CLICK OUTSIDE MODAL
   ========================================================= */

window.onclick = function(event) {

    const modals =
        document.querySelectorAll(
            ".modal"
        );


    modals.forEach(modal => {

        if (event.target === modal) {

            modal.style.display =
                "none";

        }

    });

};


/* =========================================================
   SEARCH ENTER KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            document.activeElement.id === "pin"
        ) {

            login();

        }

    }
);


/* =========================================================
   START WEBSITE
   ========================================================= */

displayCategories();

showProducts();

updateCart();
