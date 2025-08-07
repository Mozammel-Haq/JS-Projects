let items = [
    {id: 1, name: "Pineappple", img: "img.jpg", desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, quaerat.", price: 30,qty: 1},
    {id: 2, name: "Sammam", img: "img1.jpg", desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit.", price: 40, qty: 1},
    {id: 3, name: "Banana", img: "img2.jpg", desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, quaerat.", price: 10,qty: 1},
    {id: 4, name: "PoPomegranate", img: "img3.jpg", desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. ", price: 50,qty: 1}
];

let products = document.querySelector(".products")

let productHTML = ""

items.forEach((item)=>{
    productHTML += ` <div class="card">
                        <img src="images/${item.img}" alt="${item.name}">
                        <div class="card-body">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, quaerat.</p>
                            <div class="product_info">
                                <span>Price: $${item.price}</span>
                                <span>Quantity: ${item.qty}</span>
                            </div>
                            <div class="buy-product">
                                <button class="buy")">Buy Now</button>
                                <button class="addCart" onclick="addItem(${item.id})">Add to Cart</button>
                            </div>
                    
                        </div>
                    </div>`;
})
products.innerHTML = productHTML;

// Cart

let cart = [];

// Add to Cart

function addItem(itemID){
    let item = items.find((item)=> item.id == itemID);

    let hasItem = cart.find((item)=>item.id == itemID)
    if(hasItem){
        hasItem.qty += 1
    } else{
        cart.push(item)
    }
    console.log(cart)
    cartinfo()
}
// Calculation

cartinfo()
function cartinfo(){
    let cartHTML= "";
    let total= 0;
    cart.forEach((item, i)=>{

        total += item.price * item.qty

        cartHTML += `
         <tr>
        <td>${i}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>${item.qty}</td>
        <td>${item.price* item.qty}</td>
        <td class="actions">
          <button class="add-btn" onclick="addItem(${item.id})">+</button>
          <button class="sub-btn" onclick="decreaseQty(${item.id})">-</button>
          <button class="del-btn" onclick="deleteItem(${item.id})">Del</button>
        </td>
      </tr>`;

      
    });

    document.querySelector("tbody").innerHTML= cartHTML;
    document.querySelector(".total").innerHTML =total;
}
function deleteItem(itemID){
    cart= cart.filter(item => item.id != itemID)
    cartinfo();
}
function decreaseQty(itemID){
    let hasItem = cart.find(item=>item.id == itemID);

    if(hasItem && hasItem.qty > 1){
        hasItem.qty -=1
    }
    console.log(hasItem)
    cartinfo();
}