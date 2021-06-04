class BasketItem {
    constructor(title, price, quantity, amount) {
        this.title = title;
        this.price = price;
        this.quantity = quantity;
        this.amount = amount;
    }
    render() {

    }
}

class BasketList {
    constructor() {
        this.goods = [];
    }
    render() {

    }

}

class GoodsItem {
    constructor(title, image, price) {
        this.title = title;
        this.image = image;
        this.price = price;
    }
    render(){
        return `<div class="goods-item"><img src="img/${this.image}" alt="${this.image}"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', image: 'Shirt.jpg', price: 150 },
            { title: 'Socks', image: 'Socks.jpg', price: 50 },
            { title: 'Jacket', image: 'Jacket.jpg', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
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
            const goodItem = new GoodsItem(good.title, good.image, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
        document.querySelector('.amount').innerHTML = this.amount();
    }
}

const list = new GoodsList();
list.fetchGoods();

window.onload = () => list.render();



