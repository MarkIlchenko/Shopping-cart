

let products = {
    1: {
        name:  "MokBook Thicc",
        desc: "SUN CARE",
        price: 2034,
        img : "ProductImage1.svg",
        inCart: 0,
    },
    2: {
        name:  "MokBook Rookie",
        desc: "EYE CARE",
        price: 1247,
        img : "ProductImage2.svg",
        inCart: 0,
    },
    3: {
        name:  "Ipong Max",
        desc: "TREATMENTS",
        price: 675,
        img : "ProductImage3.svg",
        inCart: 0,
    },
    4: {
        name:  "Itab Pok",
        desc: "MOISTURIZERS",
        price: 842,
        img : "ProductImage4.svg",
        inCart: 0,
    },
}



let cart = {
    hPdt: null,
    hItems: null,
    items: {},

    save: function () {
        localStorage.setItem("cart", JSON.stringify(cart.items));
    },

    load: function () {
        cart.items = localStorage.getItem("cart");
        if (cart.items == null) {
            cart.items = {};
        } else {
            cart.items = JSON.parse(cart.items);
        }
    },


    nuke: function () {
        if (confirm("Empty cart?")) {
            cart.items = {};
            localStorage.removeItem("cart");
            cart.list();
        }
    },

    init: function () {
        cart.hPdt = document.getElementById("cart-products");
        cart.hItems = document.getElementById("cart-items");

        cart.hPdt.innerHTML = "";
        let p, item, part;
        for (let id in products) {
            // WRAPPER
            p = products[id];
            item = document.createElement("div");
            item.className = "p-item";
            cart.hPdt.appendChild(item);

            // PRODUCT IMAGE
            part = document.createElement("img");
            part.src = "images/" +p.img;
            part.className = "p-img";
            item.appendChild(part);

            // PRODUCT NAME
            part = document.createElement("div");
            part.innerHTML = p.name;
            part.className = "p-name";
            item.appendChild(part);

            // PRODUCT DESCRIPTION
            part = document.createElement("div");
            part.innerHTML = p.desc;
            part.className = "p-desc";
            item.appendChild(part);

            // PRODUCT PRICE
            part = document.createElement("div");
            part.innerHTML = "$" + p.price;
            part.className = "p-price";
            item.appendChild(part);

            // ADD TO CART
            part = document.createElement("input");
            part.type = "button";
            part.value = "Add to Cart";
            part.className = "cart p-add";
            part.onclick = cart.add;
            part.dataset.id = id;
            item.appendChild(part);
        }
        cart.load();

        cart.list();
    },

    list : function () {
        // (D1) RESET
        cart.hItems.innerHTML = "";
        let item, part, pdt;
        let empty = true;
        for (let key in cart.items) {
            if(cart.items.hasOwnProperty(key)) { empty = false; break; }
        }

        // (D2) CART IS EMPTY
        if (empty) {
            item = document.createElement("div");
            item.innerHTML = "Cart is empty";
            cart.hItems.appendChild(item);
        }

        // (D3) CART IS NOT EMPTY - LIST ITEMS
        else {
            let p, total = 0, subtotal = 0;

            // item = document.createElement("img");
            // item.className = "shape";
            // item.src = "images/Icon-stroke.svg";
            // cart.hItems.appendChild(item);

            for (let id in cart.items) {

                // ITEM
                p = products[id];
                item = document.createElement("div");
                item.className = "c-item";
                cart.hItems.appendChild(item);

                // NAME
                part = document.createElement("div");
                part.innerHTML = p.name;
                part.className = "c-name";
                item.appendChild(part);


                // Add div
                p = products[id];
                item = document.createElement("div");
                item.className = "text-item-container";
                cart.hItems.appendChild(item);




                part = document.createElement("img");
                part.src = "images/" +p.img;
                part.className = "p-img";
                item.appendChild(part);

                part = document.createElement("input");
                part.type = "button";
                part.value = "X";
                part.dataset.id = id;
                part.className = "c-del cart";
                part.addEventListener("click", cart.remove);
                item.appendChild(part);
                // QUANTITY
                part = document.createElement("input");
                part.type = "number";
                part.value = cart.items[id];
                part.dataset.id = id;
                part.className = "c-qty";
                part.addEventListener("change", cart.change);
                item.appendChild(part);

                // SUBTOTAL
                subtotal = cart.items[id] * p.price;
                total += subtotal;
            }

            // EMPTY BUTTONS
            item = document.createElement("input");
            item.type = "button";
            item.value = "Empty";
            item.addEventListener("click", cart.nuke);
            item.className = "c-empty cart";
            cart.hItems.appendChild(item);

            // CHECKOUT BUTTONS
            item = document.createElement("input");
            item.type = "button";
            item.value = "Checkout - " + "$" + total;
            item.addEventListener("click", cart.checkout);
            item.className = "c-checkout cart";
            cart.hItems.appendChild(item);
        }
    },

    // (E) ADD ITEM INTO CART
    add : function () {
        if (cart.items[this.dataset.id] == undefined) {
            cart.items[this.dataset.id] = 1;
        } else {
            cart.items[this.dataset.id]++;
        }
        cart.save();
        cart.list();
    },

    // (F) CHANGE QUANTITY
    change : function () {
        if (this.value == 0) {
            delete cart.items[this.dataset.id];
        } else {
            cart.items[this.dataset.id] = this.value;
        }
        cart.save();
        cart.list();
    },

    // (G) REMOVE ITEM FROM CART
    remove : function () {
        delete cart.items[this.dataset.id];
        cart.save();
        cart.list();
    },

    // (H) CHECKOUT
    checkout : function () {
        alert("TO DO");
    }
};

window.addEventListener("DOMContentLoaded", cart.init);


let btnClose = document.querySelector(".shape");
let btnOpen = document.querySelector(".basket");
let popUp = document.querySelector(".PopUp");

btnClose.addEventListener("click", () => {
    btnClose.classList.add("unvisible");
    popUp.classList.add("unvisible");
    let popUpp = document.getElementById("cart-items").style.width = "0";
})
btnOpen.addEventListener("click", () => {
    btnClose.classList.remove("unvisible");
    popUp.classList.remove("unvisible");
    let popUpp = document.getElementById("cart-items").style.width = "40%";
})
