let cartItemList = document.querySelector("#cart-item-list");
let cartList = JSON.parse(localStorage.getItem("cart"));

// 로컬스토리지에 있는 장바구니 리스트 화면에 출력
function addCartItemList(cartList) {
    let cartListContent = "";
    console.log('cartList: ', cartList);
    if(cartList !== null && cartList.length !== 0){
        cartList.forEach(item => {
            cartListContent += ` 
                <li class="cart-item">
                    <div class="cart-item-column">
                    <div class="img-container">
                        <img src="${item.image}" alt="작품사진">
                    </div>
                    </div>
                    
                    <div class="cart-item-column item-info-left"> 
                    <p class="work-name"><a>${item.productName}</a></p>
                    <p>${item.painterName}</p>
                    </div>
                    <div class="cart-item-column item-info-right">
                    <p class="work-price">${item.price} 원</p>
                    <button class="item-delete-btn"  id=${item.productId} type="button">삭제</button>
                    </div>
                </li>`;
            document.querySelector(".cart-total-price").innerHTML = `${totalPrice(cartList)}원`;
            document.querySelector(".all-item-order-btn").innerHTML = `총 ${totalCount(cartList)}건 주문 계속하기`;
        });    
    }
    else {
        cartListContent += "장바구니에 담긴 상품이 없습니다."
        document.querySelector(".cart-total").style.display = 'none';
        for (const btn of document.querySelectorAll(".buttons-container")) {
            btn.style.display = 'none';
        }
    }
    console.log('cartListContent: ', cartListContent);
    cartItemList.innerHTML = cartListContent;
    
}
addCartItemList(cartList);


// cart-total-price와 all-item-order-btn 합계 변경
function totalPrice(cartList) {
    return cartList.reduce((sum, cur) => sum + cur.price, 0); 
}

function totalCount(cartList) {
    return cartList.length;
}


// 개별 cart list 삭제
const itemDeleteBtns = document.querySelectorAll(".item-delete-btn");

function itemDelete(e) {
    if(window.confirm("선택하신 상품을 장바구니에서 삭제하시겠습니까?")) {
        const newCartList = JSON.parse(localStorage.getItem("cart")).filter(elem => {
            return elem.productId !== Number(e.target.id);
        });
        localStorage.setItem("cart", JSON.stringify(newCartList));
        addCartItemList(newCartList);
    }
    
}

for (const btn of itemDeleteBtns) {
    btn.addEventListener("click", itemDelete);
}



// 전체 cart list 삭제
const allDeleteBtn = document.querySelector(".all-item-delete-btn");

function allDelete() {
    console.log(localStorage.getItem("cart"));
    if(window.confirm("전체 상품을 장바구니에서 삭제하시겠습니까?")){
        localStorage.removeItem("cart");
        addCartItemList([]); 
        window.location.reload();
    }
}

allDeleteBtn.addEventListener("click", allDelete);


// 주문하기 btn 
const buyAllBtn = document.querySelector(".all-item-order-btn");

function buyAllItem(){t
    localStorage.setItem("buy-cart", localStorage.getItem("cart"));

    // 로그인을 하지 않은 경우 
    const token = sessionStorage.getItem("token");
    if (!token) {
        alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
        window.location.replace("/login?order");
    }
    window.location.replace("/order");
}

buyAllBtn.addEventListener("click", buyAllItem);
