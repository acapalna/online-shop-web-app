const API_URL = "http://localhost:8090";

window.Shop = {

    addProductToCart: function (productId){
        let body = {
          customerId: 13,
          productId: productId,
        };

       $.ajax({
           url:API_URL + "/cart",
           method: "PUT",
           //MIME type
           contentType: "application/json",
           data: JSON.stringify(body),
       }).done(function () {
           console.log('success');
        });
    },

    getProducts:function(){
        $.ajax({
            url: API_URL + "/products",
            method: "GET"
        }).done(function(response) {
            console.log(response);
            Shop.displayProducts(response.content)
        });
    },

    getProductHtml:function(product){

        return `<div class="col-md-3 col-sm-6">
                    <div class="single-shop-product">
                        <div class="product-upper">
                            <img src="img/product-2.jpg" alt=""><!--<img src="${product.imagePath}" alt=""> -->
                        </div>
                        <h2><a href="">${product.name}</a></h2>
                        <div class="product-carousel-price">
                            <ins>$${product.price}</ins> <!--<del>$999.00</del> -->
                        </div>  
                        
                        <div class="product-option-shop">
                            <a class="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id="${product.id}" rel="nofollow" href="/canvas/shop/?add-to-cart=${product.id}">Add to cart</a>
                        </div>                       
                    </div>
                </div>`
    },

    displayProducts: function (products) {
        let productsHtml = "";
        products.forEach(item => productsHtml += Shop.getProductHtml(item));

        //cssSelector
        $('#products-container').html(productsHtml);
    },

    bindEvents: function () {
        $('#products-container').delegate('.add_to_cart_button', 'click', function (event) {
            event.preventDefault();

            let productId = $(this).data('product_id');
            Shop.addProductToCart(productId)
        });
    }
};

Shop.getProducts();
Shop.bindEvents();