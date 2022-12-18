(function(){
    showBestSeller()
    async function showBestSeller(){
        const products = await getProducts();
        let new_products = products.filter((product) => {
          return product.tag == 'Top'
        });
        new_products = new_products.slice(0, 9);
          var item = new_products.map(item => {
                  return `<div class="item">
                  <div class="product-item">
                       <div class="tag">${item.tag}</div>
                       <div class="thumb"><img src="${item.image}" alt=""></div>
                       <div class='detail'>
                           <a href="chitietsp.html?id=${item.id}" class="name" data-id="${item.id}">${item.name}</a>
                           <p class="price"><span class="iconify" data-icon="ion:pricetag"></span>${item.currentPrice} <u>đ</u></p>
                           <a href="chitietsp.html?id=${item.id}" class="add" data-id="${item.id}"><span class="iconify" data-icon="carbon:add-filled"></span></a>
                       </div>
                      </div>
                  </div>`
          });
        var product = item.join('');
        $('#bestseller .container').innerHTML = product;
      }
})()
