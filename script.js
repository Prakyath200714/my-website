\/* =========================================================
   MADA GENERAL STORE
   DATABASE VERSION
   ========================================================= */

/*
=============================================================
SUPABASE CONFIGURATION
=============================================================

Get these from:

Supabase Dashboard
→ Connect
→ JavaScript

Use the PUBLISHABLE key.

DO NOT use:
service_role
secret key
=============================================================
*/

const SUPABASE_URL =
    "https://aobpgitcqflvtclltcpj.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_rOF_xYWDZM_BfIjcRP_ICg_lOgqyBbk";


/* Create Supabase client */

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );


/* =========================================================
   SETTINGS
   ========================================================= */

const ADMIN_PIN = "689768";

const WHATSAPP_NUMBER =
    "918123686297";


/* =========================================================
   WEBSITE DATA
   ========================================================= */

let products = [];

let cart =
    JSON.parse(
        localStorage.getItem("madaCart")
    ) || [];

let admin =
    sessionStorage.getItem(
        "madaAdmin"
    ) === "true";

let selectedCategory = "All";

let realtimeChannel = null;


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
   UPDATE CART COUNT
   ========================================================= */

function updateCart() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    const element =
        document.getElementById(
            "cartCount"
        );

    if (element) {

        element.textContent =
            count;
    }
}


/* =========================================================
   LOAD PRODUCTS FROM DATABASE
   ========================================================= */

async function loadProducts() {

    const productBox =
        document.getElementById(
            "products"
        );

    if (productBox) {

        productBox.innerHTML = `
            <div class="empty">
                Loading products...
            </div>
        `;
    }


    try {

        const {
            data,
            error
        } = await supabaseClient
            .from("products")
            .select("*")
            .order("id", {
                ascending: true
            });


        if (error) {

            console.error(
                "Database loading error:",
                error
            );

            if (productBox) {

                productBox.innerHTML = `
                    <div class="empty">

                        <h3>
                            Unable to load products
                        </h3>

                        <p>
                            Please check your database connection.
                        </p>

                    </div>
                `;
            }

            return;
        }


        products =
            data || [];


        displayCategories();

        showProducts();


    } catch (error) {

        console.error(
            "Unexpected database error:",
            error
        );

        if (productBox) {

            productBox.innerHTML = `
                <div class="empty">
                    Database connection failed.
                </div>
            `;
        }
    }
}


/* =========================================================
   REALTIME DATABASE CONNECTION
   ========================================================= */

function startRealtime() {

    /*
       Remove old channel if one exists.
    */

    if (realtimeChannel) {

        supabaseClient.removeChannel(
            realtimeChannel
        );
    }


    /*
       Listen for:

       INSERT
       UPDATE
       DELETE

       from products table.
    */

    realtimeChannel =
        supabaseClient
            .channel(
                "mada-products-realtime"
            )

            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "products"
                },
                function(payload) {

                    console.log(
                        "Database changed:",
                        payload
                    );


                    /*
                       Reload products from
                       database immediately.
                    */

                    loadProducts();

                }
            )

            .subscribe(
                function(status) {

                    console.log(
                        "Realtime status:",
                        status
                    );

                }
            );
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
                product =>
                    product.category
            )
        )
    ];


    categoryBox.innerHTML =
        categories
            .map(
                category => {

                    const active =
                        selectedCategory ===
                        category
                            ? "active"
                            : "";


                    return `
                        <div
                            class="category ${active}"
                            onclick="filterCategory('${escapeHTML(category)}')">

                            ${escapeHTML(
                                category
                            )}

                        </div>
                    `;
                }
            )
            .join("");
}


/* =========================================================
   FILTER CATEGORY
   ========================================================= */

function filterCategory(category) {

    selectedCategory =
        category;

    displayCategories();

    showProducts();
}


/* =========================================================
   SEARCH + DISPLAY
   ========================================================= */

function showProducts() {

    const productBox =
        document.getElementById(
            "products"
        );

    if (!productBox) {
        return;
    }


    const searchElement =
        document.getElementById(
            "search"
        );


    const search =
        searchElement
            ? searchElement.value
                .trim()
                .toLowerCase()
            : "";


    const filtered =
        products.filter(
            product => {

                const name =
                    String(
                        product.name || ""
                    ).toLowerCase();


                const category =
                    String(
                        product.category || ""
                    ).toLowerCase();


                const searchMatch =
                    name.includes(search) ||
                    category.includes(search);


                const categoryMatch =
                    selectedCategory ===
                    "All" ||
                    product.category ===
                    selectedCategory;


                return (
                    searchMatch &&
                    categoryMatch
                );
            }
        );


    if (
        filtered.length === 0
    ) {

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
        filtered
            .map(
                product =>
                    createProductCard(
                        product
                    )
            )
            .join("");
}


/* =========================================================
   PRODUCT CARD
   ========================================================= */

function createProductCard(
    product
) {

    return `

        <div class="product">

            <img
                src="${escapeAttribute(
                    product.image
                )}"

                alt="${escapeAttribute(
                    product.name
                )}"

                onerror="
                    this.src =
                    'https://via.placeholder.com/300x200?text=Grocery'
                "
            >


            <h3>
                ${escapeHTML(
                    product.name
                )}
            </h3>


            <div class="category-name">

                ${escapeHTML(
                    product.category
                )}

            </div>


            <div class="price">

                ₹${Number(
                    product.price
                ).toLocaleString(
                    "en-IN"
                )}

            </div>


            <button
                class="add"
                onclick="addCart(${product.id})">

                Add to Cart

            </button>


            ${
                admin
                    ? `

                        <div class="admin-controls">

                            <button
                                class="edit"
                                onclick="
                                    editProduct(
                                        ${product.id}
                                    )
                                ">

                                ✏️ Edit

                            </button>


                            <button
                                class="delete"
                                onclick="
                                    deleteProduct(
                                        ${product.id}
                                    )
                                ">

                                🗑️

                            </button>

                        </div>

                    `
                    : ""
            }

        </div>

    `;
}


/* =========================================================
   ADD TO CART
   ========================================================= */

function addCart(id) {

    const product =
        products.find(
            product =>
                Number(product.id) ===
                Number(id)
        );


    if (!product) {

        alert(
            "Product not found."
        );

        return;
    }


    const existing =
        cart.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id:
                Number(id),

            quantity:
                1

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


    document.getElementById(
        "cartPage"
    ).style.display =
        "block";


    document.getElementById(
        "orderSuccess"
    ).style.display =
        "none";


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


    if (
        cart.length === 0
    ) {

        cartBox.innerHTML = `

            <div class="empty">

                Your cart is empty.

            </div>

        `;


        document.getElementById(
            "total"
        ).textContent =
            "0";


        return;
    }


    let total = 0;


    cartBox.innerHTML =
        cart.map(
            item => {

                const product =
                    products.find(
                        p =>
                            Number(p.id) ===
                            Number(item.id)
                    );


                if (!product) {
                    return "";
                }


                const itemTotal =
                    Number(
                        product.price
                    ) *
                    item.quantity;


                total +=
                    itemTotal;


                return `

                    <div class="cart-item">

                        <div>

                            <strong>
                                ${escapeHTML(
                                    product.name
                                )}
                            </strong>

                            <br>

                            ₹${Number(
                                product.price
                            ).toLocaleString(
                                "en-IN"
                            )}

                            ×
                            ${item.quantity}

                        </div>


                        <div class="qty">

                            <button
                                onclick="
                                    changeQty(
                                        ${product.id},
                                        -1
                                    )
                                ">

                                −

                            </button>


                            ${item.quantity}


                            <button
                                onclick="
                                    changeQty(
                                        ${product.id},
                                        1
                                    )
                                ">

                                +

                            </button>

                        </div>

                    </div>

                `;
            }
        )
        .join("");


    document.getElementById(
        "total"
    ).textContent =
        total.toLocaleString(
            "en-IN"
        );
}


/* =========================================================
   CHANGE CART QUANTITY
   ========================================================= */

function changeQty(
    id,
    change
) {

    const item =
        cart.find(
            item =>
                Number(item.id) ===
                Number(id)
        );


    if (!item) {
        return;
    }


    item.quantity +=
        change;


    if (
        item.quantity <= 0
    ) {

        cart =
            cart.filter(
                item =>
                    Number(item.id) !==
                    Number(id)
            );
    }


    saveCart();

    updateCart();

    displayCart();
}


/* =========================================================
   WHATSAPP ORDER
   ========================================================= */

function sendOrder() {

    if (
        cart.length === 0
    ) {

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


    if (
        !name ||
        !phone ||
        !address
    ) {

        alert(
            "Please enter your name, phone number and address."
        );

        return;
    }


    let message =
        "*NEW ORDER - MADA GENERAL STORE*\n\n";


    message +=
        "*Customer:* " +
        name +
        "\n";


    message +=
        "*Phone:* " +
        phone +
        "\n";


    message +=
        "*Address:* " +
        address +
        "\n\n";


    message +=
        "*ITEMS:*\n";


    let total = 0;


    cart.forEach(
        item => {

            const product =
                products.find(
                    p =>
                        Number(p.id) ===
                        Number(item.id)
                );


            if (!product) {
                return;
            }


            const itemTotal =
                Number(
                    product.price
                ) *
                item.quantity;


            total +=
                itemTotal;


            message +=
                "• " +
                product.name +
                " × " +
                item.quantity +
                " = ₹" +
                itemTotal +
                "\n";
        }
    );


    message +=
        "\n*TOTAL: ₹" +
        total +
        "*";


    const whatsappURL =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(
            message
        );


    window.open(
        whatsappURL,
        "_blank"
    );


    setTimeout(
        () => {

            document.getElementById(
                "cartPage"
            ).style.display =
                "none";


            document.getElementById(
                "orderSuccess"
            ).style.display =
                "block";

        },
        500
    );
}


/* =========================================================
   CONTINUE SHOPPING
   ========================================================= */

function continueShopping() {

    cart = [];

    saveCart();

    updateCart();


    document.getElementById(
        "total"
    ).textContent =
        "0";


    document.getElementById(
        "customerName"
    ).value =
        "";


    document.getElementById(
        "customerPhone"
    ).value =
        "";


    document.getElementById(
        "customerAddress"
    ).value =
        "";


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
   ADMIN LOGIN
   ========================================================= */

function openLogin() {

    if (admin) {

        alert(
            "You are already logged in as admin."
        );

        return;
    }


    const pin =
        prompt(
            "Enter Admin Password"
        );


    if (
        pin === null
    ) {
        return;
    }


    if (
        pin === ADMIN_PIN
    ) {

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

    } else {

        alert(
            "Incorrect PIN."
        );
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
        "Add Product";


    document.getElementById(
        "productId"
    ).value =
        "";


    document.getElementById(
        "productName"
    ).value =
        "";


    document.getElementById(
        "productPrice"
    ).value =
        "";


    document.getElementById(
        "productImage"
    ).value =
        "";


    document.getElementById(
        "productDescription"
    ).value =
        "";


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
            p =>
                Number(p.id) ===
                Number(id)
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
        "Edit Product / Market Price";


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
        product.description ||
        "";


    document.getElementById(
        "productModal"
    ).style.display =
        "flex";
}


/* =========================================================
   SAVE PRODUCT TO DATABASE
   ========================================================= */

async function saveProduct() {

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
            "Please enter image URL."
        );

        return;
    }


    const productData = {

        name:
            name,

        price:
            price,

        category:
            category,

        image:
            image,

        description:
            description,

        updated_at:
            new Date().toISOString()
    };


    try {

        /* =================================================
           UPDATE EXISTING PRODUCT
           ================================================= */

        if (id) {

            const {
                error
            } =
                await supabaseClient
                    .from("products")
                    .update(
                        productData
                    )
                    .eq(
                        "id",
                        Number(id)
                    );


            if (error) {

                console.error(
                    error
                );

                alert(
                    "Database update failed:\n" +
                    error.message
                );

                return;
            }


            alert(
                "✅ Product updated in database!"
            );
        }


        /* =================================================
           ADD NEW PRODUCT
           ================================================= */

        else {

            const newProduct = {

                id:
                    Date.now(),

                ...productData
            };


            const {
                error
            } =
                await supabaseClient
                    .from("products")
                    .insert(
                        newProduct
                    );


            if (error) {

                console.error(
                    error
                );

                alert(
                    "Database insert failed:\n" +
                    error.message
                );

                return;
            }


            alert(
                "✅ Product added to database!"
            );
        }


        /*
           Realtime will normally update
           the website automatically.

           We also load once immediately
           so the admin sees the change.
        */

        await loadProducts();


        closeModal(
            "productModal"
        );


    } catch (error) {

        console.error(
            "Save error:",
            error
        );


        alert(
            "Something went wrong while saving."
        );
    }
}


/* =========================================================
   DELETE PRODUCT FROM DATABASE
   ========================================================= */

async function deleteProduct(id) {

    if (!admin) {

        alert(
            "Admin login required."
        );

        return;
    }


    const product =
        products.find(
            p =>
                Number(p.id) ===
                Number(id)
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


    try {

        const {
            error
        } =
            await supabaseClient
                .from("products")
                .delete()
                .eq(
                    "id",
                    Number(id)
                );


        if (error) {

            console.error(
                error
            );

            alert(
                "Delete failed:\n" +
                error.message
            );

            return;
        }


        /*
           Remove from cart too.
        */

        cart =
            cart.filter(
                item =>
                    Number(item.id) !==
                    Number(id)
            );


        saveCart();

        updateCart();


        alert(
            "✅ Product deleted from database."
        );


        await loadProducts();


    } catch (error) {

        console.error(
            error
        );


        alert(
            "Something went wrong while deleting."
        );
    }
}


/* =========================================================
   CLOSE MODAL
   ========================================================= */

function closeModal(id) {

    const modal =
        document.getElementById(
            id
        );


    if (modal) {

        modal.style.display =
            "none";
    }
}


/* =========================================================
   CLICK OUTSIDE MODAL
   ========================================================= */

window.onclick =
    function(event) {

        document
            .querySelectorAll(
                ".modal"
            )
            .forEach(
                modal => {

                    if (
                        event.target ===
                        modal
                    ) {

                        modal.style.display =
                            "none";
                    }
                }
            );
    };


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key ===
            "Escape"
        ) {

            document
                .querySelectorAll(
                    ".modal"
                )
                .forEach(
                    modal => {

                        modal.style.display =
                            "none";
                    }
                );
        }
    }
);


/* =========================================================
   HTML SECURITY HELPERS
   ========================================================= */

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
   START WEBSITE
   ========================================================= */

async function startWebsite() {

    console.log(
        "Mada General Store starting..."
    );


    if (admin) {

        document.body.classList.add(
            "admin-mode"
        );
    }


    updateCart();


    /*
       First load products
       from Supabase.
    */

    await loadProducts();


    /*
       Then connect to
       Supabase Realtime.
    */

    startRealtime();


    console.log(
        "Mada General Store ready."
    );
}


/* =========================================================
   START
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        startWebsite
    );

} else {

    startWebsite();
}
