document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const errorMessage = document.getElementById('errorMessage');
  const loginContainer = document.getElementById('loginContainer');
  const inventoryContainer = document.getElementById('inventoryContainer');

  const productForm = document.getElementById('productForm');
  const inventoryList = document.getElementById('inventoryList');
  const deleteModal = document.getElementById('deleteModal');
  let deleteIndex = -1;

  // Handle Login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    var user,pass;
    user=username,pass=password;

    if (username && password) {
     
      if (username === user && password === pass) {
        // Simulate successful login
        localStorage.setItem('token', 'dummy-token');
        loginContainer.style.display = 'none';
        inventoryContainer.style.display = 'block';
        fetchInventory();
      } else {
        errorMessage.textContent = 'Invalid username or password';
      }
    } else {
      errorMessage.textContent = 'Please enter both username and password';
    }
  });

  // Fetch inventory from LocalStorage and display
  function fetchInventory() {
    const products = JSON.parse(localStorage.getItem('inventory')) || [];
    inventoryList.innerHTML = '';

    products.forEach((product, index) => {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.innerHTML = `
        <div>
          <strong>${product.name}</strong>
          <p>Description: ${product.description}</p>
          <p>Supplier: ${product.supplier}</p>
          <p>Sales: ${product.sales}</p>
          <p>Price: $${product.price}</p>
          <p>Quantity: ${product.quantity}</p>
        </div>
        <div>
          <button onclick="showDeleteModal(${index})">Delete</button>
          <button onclick="updateProduct(${index})">Update</button>
        </div>
      `;
      inventoryList.appendChild(productDiv);
    });
  }

  // Add Product
  productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const description = document.getElementById('description').value.trim();
    const supplier = document.getElementById('supplier').value.trim();
    const sales = document.getElementById('sales').value.trim();
    const price = document.getElementById('price').value.trim();
    const quantity = document.getElementById('quantity').value.trim();

    if (name && description && supplier && sales && price && quantity) {
      const product = { name, description, supplier, sales, price, quantity };
      const products = JSON.parse(localStorage.getItem('inventory')) || [];
      products.push(product);

      localStorage.setItem('inventory', JSON.stringify(products));
      productForm.reset();
      fetchInventory();
      alert('Product added successfully!');
    } else {
      alert('Please fill in all fields.');
    }
  });

  // Update Product
  window.updateProduct = (index) => {
    const products = JSON.parse(localStorage.getItem('inventory')) || [];

    const name = prompt('Enter new name:', products[index].name) || products[index].name;
    const description = prompt('Enter new description:', products[index].description) || products[index].description;
    const supplier = prompt('Enter new supplier:', products[index].supplier) || products[index].supplier;
    const sales = prompt('Enter new sales:', products[index].sales) || products[index].sales;
    const price = prompt('Enter new price:', products[index].price) || products[index].price;
    const quantity = prompt('Enter new quantity:', products[index].quantity) || products[index].quantity;

    products[index] = { name, description, supplier, sales, price, quantity };

    localStorage.setItem('inventory', JSON.stringify(products));
    fetchInventory();
    alert('Product updated successfully!');
  };

  // Delete Product
  window.showDeleteModal = (index) => {
    deleteIndex = index;
    deleteModal.style.display = 'block';
  };

  document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
    if (deleteIndex > -1) {
      const products = JSON.parse(localStorage.getItem('inventory')) || [];
      products.splice(deleteIndex, 1);

      localStorage.setItem('inventory', JSON.stringify(products));
      fetchInventory();
      alert('Product deleted successfully!');
      deleteIndex = -1;
      deleteModal.style.display = 'none';
    }
  });

  document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
    deleteModal.style.display = 'none';
  });
});
