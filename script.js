import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// =====================================
// AHA STORE - SUPABASE CONFIGURATION
// =====================================

const SUPABASE_URL = "https://aobpgitcqflvtclltcpj.supabase.coL";
const SUPABASE_KEY = "sb_publishable_rOF_xYWDZM_BfIjcRP_ICg_lOgqyBbk";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// =====================================
// FETCH AND DISPLAY PRODUCTS
// =====================================

const productContainer = document.getElementById("products");

async function loadProducts() {
    if (!productContainer) return;

    productContainer.textContent = "Loading products...";

    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: false });

    if (error) {
        console.error("Error loading products:", error.message);
        productContainer.textContent = "Unable to load products.";
        return;
    }

    displayProducts(data);
}

// =====================================
// DISPLAY PRODUCTS ON WEBSITE
// =====================================

function displayProducts(products) {
    if (!productContainer) return;

    productContainer.replaceChildren();

    if (!products || products.length === 0) {
        productContainer.textContent = "No products available.";
        return;
    }

    products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";

        const image = document.createElement("img");
        image.src = product.image_url || "";
        image.alt = product.name || "Product";
        image.loading = "lazy";

        const name = document.createElement("h3");
        name.textContent = product.name || "Unnamed product";

        const price = document.createElement("p");
        price.textContent = `₹${product.price ?? 0}`;

        const description = document.createElement("p");
        description.textContent = product.description || "";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteProduct(product.id);
        });

        card.append(image, name, price, description, deleteButton);
        productContainer.appendChild(card);
    });
}

// =====================================
// ADD A PRODUCT
// =====================================

async function addProduct(name, price, image_url, description) {
    const { data, error } = await supabase
        .from("products")
        .insert([{
            name,
            price: Number(price),
            image_url,
            description
        }])
        .select();

    if (error) {
        console.error("Error adding product:", error.message);
        alert("Could not add product.");
        return;
    }

    console.log("Product added:", data);
    alert("Product added successfully!");
}

// =====================================
// UPDATE A PRODUCT
// =====================================

async function updateProduct(id, updates) {
    const { data, error } = await supabase
        .from("products")
        .update(updates)
        .eq("id", id)
        .select();

    if (error) {
        console.error("Error updating product:", error.message);
        alert("Could not update product.");
        return;
    }

    console.log("Product updated:", data);
    alert("Product updated successfully!");
}

// =====================================
// DELETE A PRODUCT
// =====================================

async function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?")) {
        return;
    }

    const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Error deleting product:", error.message);
        alert("Could not delete product.");
        return;
    }

    alert("Product deleted successfully!");
}

// =====================================
// REAL-TIME DATABASE UPDATES
// =====================================

supabase
    .channel("products-live")
    .on(
        "postgres_changes",
        {
            event: "*",
            schema: "public",
            table: "products"
        },
        (payload) => {
            console.log("Database changed:", payload);
            loadProducts();
        }
    )
    .subscribe((status) => {
        console.log("Realtime status:", status);
    });

// =====================================
// CONNECT PRODUCT FORM
// =====================================

const productForm = document.getElementById("product-form");

if (productForm) {
    productForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("product-name").value;
        const price = document.getElementById("product-price").value;
        const image = document.getElementById("product-image").value;
        const description = document.getElementById("product-description").value;

        if (!name.trim() || price === "" || Number(price) < 0) {
            alert("Please enter a valid product name and price.");
            return;
        }

        await addProduct(name.trim(), price, image.trim(), description.trim());
        productForm.reset();
    });
}

// Make update function available to other page scripts.
window.updateProduct = updateProduct;

// Load products when the page starts.
loadProducts();
