        document.addEventListener('DOMContentLoaded', () => {
        const checkoutButton = document.getElementById('checkout-button');
        const sellerWhatsAppNumber = '6281289613684'; // NOMOR TELEPON ANDA SUDAH DIPERBARUI

        function formatCurrency(amount) {
            return new Intl.NumberFormat('id-ID').format(amount);
        }

        function updateOrderSummary() {
            let subtotal = 0;
            const productItems = document.querySelectorAll('.product-item');
            const summaryProductList = document.getElementById('summary-product-list');
            
            summaryProductList.innerHTML = ''; // Kosongkan daftar produk di ringkasan sebelum diisi ulang

            productItems.forEach(item => {
                const productNameElement = item.querySelector('.product-name');
                const quantityElement = item.querySelector('.quantity-display');
                const priceElement = item.querySelector('.product-price');
                
                const productName = productNameElement.textContent.trim();
                const quantity = parseInt(quantityElement.textContent || 1);
                const price = parseFloat(priceElement.dataset.price || 0);
                const itemSubtotal = price * quantity;
                
                subtotal += itemSubtotal; // Akumulasi subtotal keseluruhan

                // Buat elemen untuk menampilkan detail produk di ringkasan
                const productDetailDiv = document.createElement('div');
                productDetailDiv.classList.add('flex', 'justify-between', 'py-1', 'border-b', 'border-dashed', 'border-gray-200'); // Tambahkan style
                
                const nameAndQtySpan = document.createElement('span');
                nameAndQtySpan.textContent = `${productName} (x${quantity})`;
                nameAndQtySpan.classList.add('truncate', 'pr-2'); // truncate jika terlalu panjang
                
                const itemSubtotalSpan = document.createElement('span');
                itemSubtotalSpan.textContent = formatCurrency(itemSubtotal);
                itemSubtotalSpan.classList.add('whitespace-nowrap'); // Agar harga tidak terpotong

                productDetailDiv.appendChild(nameAndQtySpan);
                productDetailDiv.appendChild(itemSubtotalSpan);
                summaryProductList.appendChild(productDetailDiv);
            });

            const shippingCostElement = document.getElementById('shipping-cost');
            const shippingCost = shippingCostElement ? parseFloat(shippingCostElement.value || 0) : 0; 
            const totalCost = subtotal + shippingCost;

            document.getElementById('summary-subtotal').textContent = formatCurrency(subtotal);
            document.getElementById('summary-total-cost').textContent = formatCurrency(totalCost);
            
            const itemCount = productItems.length;
            const cartItemCountDisplay = document.getElementById('cart-item-count-display');
            if (cartItemCountDisplay) {
                cartItemCountDisplay.textContent = `${itemCount} Item${itemCount !== 1 ? 's' : ''}`;
            }
            const summaryItemCount = document.getElementById('summary-item-count');
            if (summaryItemCount) {
                summaryItemCount.textContent = `Items ${itemCount}`;
            }
        }

        document.querySelectorAll('.product-item').forEach(item => {
            const minusButton = item.querySelector('.quantity-minus');
            const plusButton = item.querySelector('.quantity-plus');
            const quantityDisplay = item.querySelector('.quantity-display');

            minusButton.addEventListener('click', () => {
                let currentQuantity = parseInt(quantityDisplay.textContent);
                if (currentQuantity > 1) {
                    currentQuantity--;
                    quantityDisplay.textContent = currentQuantity;
                    updateOrderSummary();
                }
            });

            plusButton.addEventListener('click', () => {
                let currentQuantity = parseInt(quantityDisplay.textContent);
                currentQuantity++;
                quantityDisplay.textContent = currentQuantity;
                updateOrderSummary();
            });
        });
        
        if (checkoutButton) {
            checkoutButton.addEventListener('click', () => {
                const productElements = document.querySelectorAll('.product-item');
                let orderDetails = [];

                productElements.forEach(item => {
                    const productNameElement = item.querySelector('.product-name');
                    const quantityElement = item.querySelector('.quantity-display');
                    
                    if (productNameElement && quantityElement) {
                        const productName = productNameElement.textContent.trim();
                        const quantity = quantityElement.textContent.trim();
                        orderDetails.push({ name: productName, quantity: quantity });
                    }
                });

                if (orderDetails.length === 0) {
                    alert('Keranjang belanja Anda masih kosong.');
                    return;
                }

                let messageText = 'Halo, saya ingin memesan barang berikut:\n';
                orderDetails.forEach((product, index) => {
                    messageText += `${index + 1}. ${product.name} (x${product.quantity})\n`;
                });

                messageText = messageText.trim(); 
                const encodedMessage = encodeURIComponent(messageText);
                const whatsappUrl = `https://wa.me/${sellerWhatsAppNumber}?text=${encodedMessage}`;

                window.location.href = whatsappUrl;
            });
        }

        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productItemElement = event.target.closest('.product-item');
                if (productItemElement) {
                    productItemElement.remove();
                    updateOrderSummary();
                }
            });
        });

        updateOrderSummary();
    });