const BASE_URL = "https://fakestoreapi.com/products";

async function loadProducts() {
    try {
        const response = await fetch(BASE_URL);
        const products = await response.json();

        const tableBody = document.getElementById("product-table");
        tableBody.innerHTML = "";

        products.forEach(product => {
            tableBody.innerHTML += `
                <tr onclick="showProduct(${product.id})" style="cursor:pointer;">
                    <td>${product.id}</td>
                    <td>
                        <img src="${product.image}" width="40" height="40" style="object-fit:contain;">
                    </td>
                    <td>${product.title}</td>
                    <td>$${product.price}</td>
                    <td>${product.category}</td>
                    <td>
                        <button class="btn btn-sm btn-primary">View</button>
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        console.error("Error loading products:", error);
    }
}

async function showProduct(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        const product = await response.json();

        document.getElementById("modalTitle").innerText = product.title;
        document.getElementById("modalTitleText").innerText = product.title;
        document.getElementById("modalImage").src = product.image;
        document.getElementById("modalPrice").innerText = product.price;
        document.getElementById("modalCategory").innerText = product.category;
        document.getElementById("modalDescription").innerText = product.description;

        const modal = new bootstrap.Modal(document.getElementById("productModal"));
        modal.show();

    } catch (error) {
        console.error("Error showing product:", error);
    }
}

loadProducts();