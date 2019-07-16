if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}

function ready(){

    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons)
    for(var i= 0; i<removeCartItemButtons.length; i++){
        var button = removeCartItemButtons[i]
        button.addEventListener('click',removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for(var i= 0; i<quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change',quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for(var i= 0; i<addToCartButtons.length; i++){
        var button = addToCartButtons[i]
        button.addEventListener('click',addToCartClicked)
    }
}

    function removeCartItem(event){
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateCartTotal()
    }

    function quantityChanged(event){
       var input = event.target 
       if(isNaN(input.value) || input.value <= 0){
            input.value = 1
       }
       updateCartTotal()
    }

    function addToCartClicked(event){
        var button = event.target
        var shopItem =button.parentElement.parentElement
        var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
        var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
        var imgSrc = shopItem.getElementsByClassName('shop-item-img')[0].src
        addItemtoCart(title,price,imgSrc)
        updateCartTotal()
        //console.log(title,price,imgSrc)
    }

    function addItemtoCart(title,price,imgSrc){
        var cartRow =document.createElement('div')
        cartRow.classList.add('cart-row')
        var carItems = document.getElementsByClassName('cart-items')[0]
        var cartItemNames = carItems.getElementsByClassName('cart-item-title')
        for (var i = 0; i< cartItemNames.length; i++) {
            if(cartItemNames[i].innerText == title){
                alert('This item is already added to the cart')
                return
            }
            
        }
        var cartRowContents = `
            <div class="cart-row">
                <div class="cart-item cart-column">
                    <img class="cart-item-img" src="${imgSrc}" width="100" height="100">
                    <span class="cart-item-title">${title}</span>
                </div>

                <span class="cart-price cart-column">${price}</span>

                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" type="number" value="1">
                    <button class="btn btn-danger" role="button">REMOVE</button>
                </div>
            </div>`
            cartRow.innerHTML = cartRowContents
            carItems.append(cartRow)
            cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
            cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)


    }

    function updateCartTotal(){
        var cartItemContainer = document.getElementsByClassName('cart-items')[0]
        var cartRows = cartItemContainer.getElementsByClassName('cart-row')
        var total = 0

        for(var i= 0; i< cartRows.length; i++){
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('cart-price')[0]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            if (priceElement != null) {
                var price = parseFloat(priceElement.innerText.replace('$',''))
                //console.log(price)
            }
            //var price = parseFloat(priceElement.innerText.replace('$',''))
            //var quantity = 0
            if(quantityElement != null){
                var quantity = parseFloat(quantityElement.value)
                total = total + (parseFloat(price)*parseFloat(quantity))
                console.log(price*quantity)
                total = Math.round(total *100)/100
            }

        }
        document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total 
    }
    
        
