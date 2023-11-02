let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Ayam Bakar Tepi Bambu',
        image: '1.jpg',
        price: 30000
    },
    {
        id: 2,
        name: 'Ayam Goreng Serundeng Sambel Penyet',
        image: '2.jpg',
        price: 30000
    },
    {
        id: 3,
        name: 'Ikan Pecak Mujair',
        image: '3.jpg',
        price: 30000
    },
    {
        id: 4,
        name: 'Sosis & Kentang Goreng',
        image: '4.jpg',
        price: 12000
    },
    {
        id: 5,
        name: 'Ayam Goreng Sambal Matah',
        image: '5.jpg',
        price: 30000
    },
    {
        id: 6,
        name: 'Ice Melon Squash',
        image: 'ijo.jpg',
        price: 17000
    },
    {
        id: 7,
        name: 'Ice MIxed Fruit Squash',
        image: 'merah.jpg',
        price: 17000
    },
    {
        id: 8,
        name: 'Ice Markisa Squash',
        image: 'kuning.jpg',
        price: 17000
    },
    {
        id: 9,
        name: 'Ice Bubble Gum Float',
        image: 'float-biru.jpg',
        price: 20000
    },
    {
        id: 10,
        name: 'Ice Bubble Choco',
        image: 'float-coklat.jpg',
        price: 20000
    },
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="img/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Pesan</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="img/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}