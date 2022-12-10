(function(){
    
    function ShowPost(){
        const slide= $('#review .slider-post')
        const posts= $$('#review .slider-post .post')
        const prevBtn= $('#review .indicator .prev')
        const nextBtn= $('#review .indicator .next')
        var counter= 0
        const size= posts[0].clientWidth
        
        slide.style.transform= 'translateX('+ 0 +'px)';

        // Button listener
        nextBtn.addEventListener('click', () =>{
            if(counter >= posts.length -1) counter =-1;
            slide.style.transition = "transform 0.4s ease-in"
            counter++
            slide.style.transform= 'translateX('+ (-size * counter) +'px)';
            posts[posts.length-1].style.opacity= '1'
        })

        prevBtn.addEventListener('click', () =>{
            if(counter <= 0) return;
            slide.style.transition = "transform 0.4s ease-in-out"
            counter--
            slide.style.transform= 'translateX('+ (-size * counter) +'px)';
        })

    }
    ShowPost();
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
                           <a href="product-detail.html?id=${item.id}" class="name" data-id="${item.id}">${item.name}</a>
                           <p class="price"><span class="iconify" data-icon="ion:pricetag"></span>${item.currentPrice} <u>đ</u></p>
                           <a href="product-detail.html?id=${item.id}" class="add" data-id="${item.id}"><span class="iconify" data-icon="carbon:add-filled"></span></a>
                       </div>
                      </div>
                  </div>`
          });
        var product = item.join('');
        $('#bestseller .container').innerHTML = product;
      }
})()
