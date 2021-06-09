function makeGETRequest(metod, url, callback) {
    return new Promise((resolve, reject) => {
        let xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        xhr.open(metod, url);
        xhr.onload = () => resolve(callback(xhr.responseText));
        xhr.onerror = () => reject(callback(xhr.statusText));
        xhr.send();
    });
}

class BasketItem {
    constructor(id_product, product_img = 'noimage.jpg', product_name, price, quantity) {
        this.id_product = id_product;
        this.product_img = product_img;
        this.product_name = product_name;
        this.price = price;
        this.quantity = quantity;
        this.amount = this.price * this.quantity;
    }

    render(){
        return `
            <div class="basket-item">
                <p>${this.id_product} ${this.product_name} ${this.price} ${this.quantity} ${this.amount}</p>
            </div>
        `;
    }
}

class BasketList {
    constructor() {
        this.goods = {};
    }
    fetchBasket(cb) {
        makeGETRequest(`${METOD[0]}`,`${API_URL}${BASKET_URL}`, (goods) => {
            this.goods = JSON.parse(goods);
            cb();
        })
    }
    basketAmount() {
        return `
            <div class="basket-total">
                <p>Стоимость товаров: ${this.goods.amount}</p>
                <p>Количество товаров: ${this.goods.countGoods}</p>
            </div>
        `;
    }

    itemDelete(){

    }

    render() {
        let listHtml = '';
        this.goods.contents.forEach(good => {
            const goodItem = new BasketItem(good.id_product, good.product_img,good.product_name, good.price, good.quantity);
            listHtml += goodItem.render();
        });
        document.querySelector('.basket-list').innerHTML = `<h3>Корзина</h3>`;
        document.querySelector('.basket-list').innerHTML += listHtml;
        document.querySelector('.basket-list').innerHTML += this.basketAmount();
    }
}


class GoodsItem {
    constructor(id_product, product_img = 'noimage.jpg', product_name, price) {
        this.id_product = id_product;
        this.product_img = product_img;
        this.product_name = product_name;
        this.price = price;
    }
    render(){
        return `
            <div class="goods-item">
                <p>${this.id_product}</p>
                <h3>${this.product_name}</h3>
                <p>${this.price}</p>
                <button class="add-basket">Купить</button>
            </div>
        `;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods(cb) {
        // this.goods = [
        //     { title: 'Shirt', image: 'Shirt.jpg', price: 150 },
        //     { title: 'Socks', image: 'Socks.jpg', price: 50 },
        //     { title: 'Jacket', image: 'Jacket.jpg', price: 350 },
        //     { title: 'Shoes', price: 250 },
        // ];
        makeGETRequest(`${METOD[0]}`,`${API_URL}${GOODS_URL}`, (goods) => {
            this.goods = JSON.parse(goods);
            cb();
        })
    }
    addBasket() {

    }

    amount() {
        let goodsAmount = 0;
        this.goods.forEach(good => {
            goodsAmount += good.price;
        });
        return 'Стоимость товаров: ' + goodsAmount;
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.id_product, good.product_img,good.product_name, good.price);
            listHtml += goodItem.render();
        });

        document.querySelector('.goods-list').innerHTML += listHtml;
        document.querySelector('.amount').innerHTML = this.amount();
    }
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const BASKET_URL = '/getBasket.json';
const GOODS_URL = '/catalogData.json';
const METOD = ['GET', 'POST'];

const listBasket = new BasketList();

const listGoods = new GoodsList();
listBasket.fetchBasket(()=> {
    listBasket.render();
});

listGoods.fetchGoods(() => {
    listGoods.render();
});

function viewBasket(){
    let basketlist = document.getElementById('basket-list').style;

    if (basketlist.display == "") {
        basketlist.display = 'block';
    } else {
        basketlist.display = '';
    }

}

//window.onload = () => list.render();



