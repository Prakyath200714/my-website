/* =========================================================
   MADA GENERAL STORE — PREMIUM SHOPPING UI
   Flipkart-inspired layout
   ========================================================= */

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
}

:root {
    --blue: #2874f0;
    --blue-dark: #1558c0;
    --blue-light: #eaf2ff;
    --yellow: #ffd814;
    --orange: #ff9f00;
    --green: #00a86b;
    --red: #e53935;
    --dark: #172337;
    --text: #212121;
    --muted: #777;
    --white: #ffffff;
    --bg: #f1f3f6;
    --border: #e0e0e0;
    --shadow: 0 2px 8px rgba(0,0,0,0.10);
    --shadow-hover: 0 6px 20px rgba(0,0,0,0.16);
}

body {
    background: var(--bg);
    color: var(--text);
}


/* =========================================================
   HEADER
   ========================================================= */

header {
    background: linear-gradient(
        135deg,
        #2874f0,
        #1558c0
    );

    color: white;

    min-height: 64px;

    padding: 10px 5%;

    display: flex;

    align-items: center;

    gap: 22px;

    position: sticky;

    top: 0;

    z-index: 1000;

    box-shadow:
        0 2px 10px rgba(0,0,0,0.20);
}


/* LOGO */

.logo {
    font-size: 23px;

    font-weight: 800;

    white-space: nowrap;

    letter-spacing: -0.5px;
}

.logo span {
    color: var(--yellow);

    font-style: italic;
}


/* =========================================================
   SEARCH
   ========================================================= */

.search {
    flex: 1;

    max-width: 700px;

    display: flex;

    background: white;

    border-radius: 3px;

    overflow: hidden;

    box-shadow:
        0 2px 7px rgba(0,0,0,0.15);
}

.search input {
    flex: 1;

    width: 100%;

    padding: 13px 16px;

    border: none;

    outline: none;

    font-size: 15px;

    color: #333;
}

.search input::placeholder {
    color: #999;
}

.search button {
    width: 55px;

    border: none;

    background: white;

    color: var(--blue);

    font-size: 19px;

    cursor: pointer;
}


/* =========================================================
   HEADER BUTTONS
   ========================================================= */

.header-btn {
    background: white;

    color: var(--blue);

    border: none;

    padding: 11px 18px;

    cursor: pointer;

    font-weight: 700;

    border-radius: 3px;

    transition: 0.2s;

    white-space: nowrap;
}

.header-btn:hover {
    background: #f5f8ff;

    transform: translateY(-1px);
}


/* =========================================================
   ADMIN BAR
   ========================================================= */

.admin-bar {
    display: none;

    background:
        linear-gradient(
            90deg,
            #fff3b0,
            #ffe16b
        );

    padding: 10px 5%;

    justify-content: space-between;

    align-items: center;

    border-bottom: 1px solid #e0c500;
}

body.admin-mode .admin-bar {
    display: flex;
}

.admin-bar strong {
    color: #5c4800;

    font-size: 14px;
}

.admin-bar button {
    border: none;

    background: var(--blue);

    color: white;

    padding: 9px 15px;

    margin-left: 6px;

    cursor: pointer;

    border-radius: 3px;

    font-weight: 600;
}

.admin-bar button:hover {
    background: var(--blue-dark);
}


/* =========================================================
   CATEGORY BAR
   ========================================================= */

.categories {
    background: white;

    padding: 13px 5%;

    display: flex;

    gap: 10px;

    overflow-x: auto;

    border-bottom: 1px solid var(--border);

    scrollbar-width: none;
}

.categories::-webkit-scrollbar {
    display: none;
}

.category {
    border: 1px solid #d6d6d6;

    background: white;

    padding: 8px 17px;

    border-radius: 20px;

    cursor: pointer;

    white-space: nowrap;

    font-size: 14px;

    font-weight: 600;

    color: #555;

    transition: 0.2s;
}

.category:hover {
    border-color: var(--blue);

    color: var(--blue);

    background: var(--blue-light);
}

.category.active {
    background: var(--blue);

    color: white;

    border-color: var(--blue);
}


/* =========================================================
   PREMIUM BANNER
   ========================================================= */

.banner {
    margin: 18px 5%;

    padding: 38px 25px;

    text-align: center;

    color: white;

    background:
        linear-gradient(
            135deg,
            #2874f0 0%,
            #1558c0 55%,
            #0b3e8c 100%
        );

    border-radius: 8px;

    position: relative;

    overflow: hidden;

    box-shadow:
        0 5px 18px rgba(40,116,240,0.25);
}

.banner::before {
    content: "";

    position: absolute;

    width: 250px;

    height: 250px;

    background: rgba(255,255,255,0.08);

    border-radius: 50%;

    top: -120px;

    left: -60px;
}

.banner::after {
    content: "";

    position: absolute;

    width: 220px;

    height: 220px;

    background: rgba(255,255,255,0.06);

    border-radius: 50%;

    right: -80px;

    bottom: -120px;
}

.banner h1 {
    position: relative;

    z-index: 2;

    margin-bottom: 10px;

    font-size: 30px;
}

.banner p {
    position: relative;

    z-index: 2;

    font-size: 16px;

    opacity: 0.95;
}


/* =========================================================
   MAIN CONTAINER
   ========================================================= */

.container {
    padding: 5px 5% 50px;
}

.container > h2 {
    background: white;

    padding: 18px 20px;

    margin: 0 0 15px 0 !important;

    border-bottom: 1px solid var(--border);

    font-size: 21px;

    color: #222;
}


/* =========================================================
   PRODUCT GRID
   ========================================================= */

.products {
    display: grid;

    grid-template-columns:
        repeat(
            auto-fill,
            minmax(210px, 1fr)
        );

    gap: 14px;
}


/* =========================================================
   PRODUCT CARD
   ========================================================= */

.product {
    background: white;

    border-radius: 6px;

    overflow: hidden;

    border: 1px solid #eeeeee;

    box-shadow: var(--shadow);

    transition:
        transform 0.25s ease,
        box-shadow 0.25s ease;

    position: relative;
}

.product:hover {
    transform: translateY(-5px);

    box-shadow: var(--shadow-hover);
}


/* =========================================================
   PRODUCT IMAGE
   ========================================================= */

.product-image {
    width: 100%;

    height: 205px;

    background: #fafafa;

    display: flex;

    align-items: center;

    justify-content: center;

    padding: 15px;

    border-bottom: 1px solid #f0f0f0;
}

.product img {
    width: 100%;

    height: 100%;

    object-fit: contain;

    transition: transform 0.3s ease;
}

.product:hover img {
    transform: scale(1.06);
}


/* =========================================================
   PRODUCT INFORMATION
   ========================================================= */

.product-info {
    padding: 15px;
}

.product h3 {
    margin: 6px 0;

    font-size: 16px;

    line-height: 1.4;

    color: #212121;

    font-weight: 600;
}

.category-name {
    color: #878787;

    font-size: 12px;

    text-transform: uppercase;

    font-weight: 600;

    letter-spacing: 0.4px;
}

.description {
    color: #777;

    font-size: 13px;

    min-height: 18px;

    margin: 5px 0;
}


/* =========================================================
   PRICE
   ========================================================= */

.price {
    font-size: 20px;

    font-weight: 700;

    color: #212121;

    margin: 11px 0;
}


/* =========================================================
   ADD TO CART
   ========================================================= */

.add {
    width: 100%;

    padding: 11px;

    border: none;

    background:
        linear-gradient(
            135deg,
            #ffb300,
            #ff8f00
        );

    color: white;

    font-weight: 700;

    cursor: pointer;

    border-radius: 4px;

    font-size: 14px;

    transition: 0.2s;
}

.add:hover {
    background:
        linear-gradient(
            135deg,
            #ff9f00,
            #f57c00
        );

    transform: translateY(-1px);
}


/* =========================================================
   ADMIN CONTROLS
   ========================================================= */

.admin-controls {
    display: none;

    margin-top: 8px;

    gap: 7px;
}

body.admin-mode .admin-controls {
    display: flex;
}

.edit {
    flex: 1;

    background: var(--blue);

    color: white;

    border: none;

    padding: 9px;

    cursor: pointer;

    border-radius: 4px;

    font-weight: 600;
}

.edit:hover {
    background: var(--blue-dark);
}

.delete {
    background: var(--red);

    color: white;

    border: none;

    padding: 9px 13px;

    cursor: pointer;

    border-radius: 4px;

    font-weight: 600;
}

.delete:hover {
    background: #c62828;
}


/* =========================================================
   MODAL
   ========================================================= */

.modal {
    display: none;

    position: fixed;

    inset: 0;

    background:
        rgba(0,0,0,0.65);

    z-index: 2000;

    align-items: center;

    justify-content: center;

    padding: 15px;

    backdrop-filter: blur(3px);
}

.modal-box {
    background: white;

    width: 100%;

    max-width: 520px;

    max-height: 90vh;

    overflow-y: auto;

    padding: 27px;

    border-radius: 8px;

    box-shadow:
        0 15px 50px rgba(0,0,0,0.3);

    animation: modalOpen 0.2s ease;
}

@keyframes modalOpen {

    from {
        opacity: 0;
        transform: scale(0.94);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.close {
    float: right;

    font-size: 28px;

    cursor: pointer;

    color: #777;

    line-height: 20px;
}

.close:hover {
    color: #222;
}


/* =========================================================
   FORMS
   ========================================================= */

.form {
    margin-top: 17px;
}

.form label {
    display: block;

    font-weight: 700;

    margin-bottom: 7px;

    color: #333;

    font-size: 14px;
}

.form input,
.form select,
.form textarea {
    width: 100%;

    padding: 12px;

    border: 1px solid #ccc;

    border-radius: 4px;

    outline: none;

    font-size: 14px;

    transition: 0.2s;
}

.form input:focus,
.form select:focus,
.form textarea:focus {
    border-color: var(--blue);

    box-shadow:
        0 0 0 2px rgba(40,116,240,0.12);
}

.save {
    width: 100%;

    padding: 13px;

    margin-top: 20px;

    border: none;

    background:
        linear-gradient(
            135deg,
            #2874f0,
            #1558c0
        );

    color: white;

    font-weight: 700;

    cursor: pointer;

    border-radius: 4px;

    font-size: 15px;
}

.save:hover {
    background: var(--blue-dark);
}


/* =========================================================
   CART
   ========================================================= */

.cart-item {
    display: flex;

    justify-content: space-between;

    align-items: center;

    border-bottom: 1px solid #eee;

    padding: 15px 0;

    gap: 15px;
}

.cart-item strong {
    font-size: 15px;
}

.qty {
    display: flex;

    align-items: center;

    gap: 8px;
}

.qty button {
    width: 30px;

    height: 30px;

    padding: 0;

    cursor: pointer;

    border: 1px solid #ccc;

    background: white;

    border-radius: 4px;

    font-size: 18px;
}

.qty button:hover {
    border-color: var(--blue);

    color: var(--blue);
}

.total {
    font-size: 22px;

    font-weight: 800;

    margin-top: 20px;

    padding-top: 15px;

    border-top: 2px solid #eee;
}


/* =========================================================
   WHATSAPP
   ========================================================= */

.whatsapp {
    width: 100%;

    background:
        linear-gradient(
            135deg,
            #25D366,
            #16a653
        );

    color: white;

    border: none;

    padding: 14px;

    margin-top: 18px;

    cursor: pointer;

    border-radius: 4px;

    font-size: 16px;

    font-weight: 700;

    box-shadow:
        0 3px 8px rgba(37,211,102,0.25);
}

.whatsapp:hover {
    background: #159447;
}


/* =========================================================
   CONTINUE SHOPPING
   ========================================================= */

.continue {
    width: 100%;

    background: var(--blue);

    color: white;

    border: none;

    padding: 14px;

    margin-top: 10px;

    cursor: pointer;

    border-radius: 4px;

    font-size: 16px;

    font-weight: 700;
}

.continue:hover {
    background: var(--blue-dark);
}


/* =========================================================
   EMPTY
   ========================================================= */

.empty {
    text-align: center;

    padding: 60px 20px;

    color: #777;

    background: white;

    border-radius: 6px;
}

.empty h3 {
    color: #444;

    margin-bottom: 8px;
}


/* =========================================================
   ORDER SUCCESS
   ========================================================= */

.order-success {
    display: none;

    text-align: center;

    padding: 35px 20px;
}

.order-success h2 {
    color: #18a558;

    margin-bottom: 12px;

    font-size: 25px;
}


/* =========================================================
   FOOTER
   ========================================================= */

footer {
    background:
        linear-gradient(
            135deg,
            #172337,
            #0e1725
        );

    color: white;

    text-align: center;

    padding: 40px 20px;

    margin-top: 20px;
}

footer h2 {
    color: white;

    margin-bottom: 8px;
}

footer p {
    color: #b9c0cc;
}


/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 900px) {

    header {
        gap: 12px;

        padding: 10px 3%;
    }

    .products {
        grid-template-columns:
            repeat(
                3,
                1fr
            );
    }

    .product-image {
        height: 180px;
    }

}


@media (max-width: 700px) {

    header {
        flex-wrap: wrap;

        padding: 10px 4%;
    }

    .logo {
        font-size: 19px;
    }

    .header-btn {
        padding: 9px 11px;

        font-size: 13px;
    }

    .search {
        flex-basis: 100%;

        order: 3;

        max-width: none;
    }

    .categories {
        padding: 11px 4%;
    }

    .banner {
        margin: 12px 4%;

        padding: 28px 15px;
    }

    .banner h1 {
        font-size: 23px;
    }

    .banner p {
        font-size: 14px;
    }

    .container {
        padding-left: 4%;

        padding-right: 4%;
    }

    .products {
        grid-template-columns:
            repeat(
                2,
                1fr
            );

        gap: 10px;
    }

    .product-image {
        height: 145px;

        padding: 10px;
    }

    .product-info {
        padding: 11px;
    }

    .product h3 {
        font-size: 14px;
    }

    .price {
        font-size: 18px;
    }

    .add {
        padding: 10px 5px;

        font-size: 13px;
    }

    .admin-bar {
        padding: 10px 4%;

        gap: 8px;

        flex-wrap: wrap;
    }

}


@media (max-width: 400px) {

    .products {
        grid-template-columns:
            repeat(
                2,
                1fr
            );
    }

    .product-image {
        height: 125px;
    }

    .logo {
        font-size: 17px;
    }

    .header-btn {
        font-size: 12px;

        padding: 8px;
    }

}
