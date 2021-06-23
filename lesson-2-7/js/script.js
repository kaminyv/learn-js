const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('goods-list',{
    props: ['goods'],
    template: `
        <div class="goods-list">
            <goods-item class="goods-item" v-for="good in goods" v-bind:good="good"></goods-item>
        </div>
    `,
});

Vue.component('goods-item',{
    props: ['good'],
    methods: {
        addToCart(id, product_name, price) {
            let basket = app.basket;
            let data =
                {
                    "id": id,
                    "product_name": product_name,
                    "quantity": 1,
                    "price": price
                };

            console.log(id + ' ' + product_name + ' ' + price);
            let count = 0;
            if (basket.contents.length == 0) {
                basket.contents.push(data);
            } else {

                basket.contents.forEach(item => {
                    if (item.id == id) {
                        item.quantity++;
                        count++;
                    }

                });

                if (count == 0) {basket.contents.push(data);}
            }

            app.makePOSTRequest('/addToCart', JSON.stringify(app.basket), err => {
                if (JSON.parse(err).result == 1) {
                    console.log('Add good to basket')
                }
            });
        }
    },
    template: `
        <div>
            <p>Артикл: {{ good.id }}</p>
            <h3 >{{ good.product_name }}</h3>
            <p>Цена {{ good.price }}</p>
            <input type="button" value="Купить" @click="addToCart(good.id, good.product_name, good.price)">
        </div>
    `
});

Vue.component('goods-search',{
    data: function () {
        return {
            searchLine: '',
        }
    },
    props: ['goods'],
    methods: {
        fg() {
            let filteredGoods = [];
            if (this.searchLine == '') {
                filteredGoods = this.goods
            } else {
                const regexp = new RegExp(`${this.searchLine}`,'gi');
                this.goods.forEach(good => {
                    if (regexp.test(good.product_name)) {
                        filteredGoods.push(good);
                    }
                });
            }
            app.filteredGoods = filteredGoods;
        }
    },
    template: `
        <div class="search-form">
            <input  class="goods-search" type="text" placeholder="Enter name goods" v-model="searchLine">
            <button class="search-button" type="button" @click="fg()">Искать</button>
        </div>
    `,
});

Vue.component('basket-list',{
    props: ['basketlist', 'isvc'],
    template: `
        <div v-if="isvc">
            <p>Стоимость корзины: {{ basketlist.amount }}</p>
            <p>Количество товаров: {{ basketlist.countGoods }}</p>
            <basket-item v-for="itembasket in basketlist.contents"  v-bind:itembasket="itembasket"></basket-item>
        </div>
    `,

});

Vue.component('basket-item', {
    props: ['itembasket'],
    template: `
        <div>
            <p>{{ itembasket.id }}</p>
            <h3>{{ itembasket.product_name }}</h3>
            <p>{{ itembasket.price }}</p>
            <p>{{ itembasket.quantity }}</p>
            <input type="button" value="Удалить" @click="delToCart(itembasket.id)">
        </div>
    `,
    methods: {
        delToCart(id) {

            let basket = app.basket
            basket.contents.forEach(item => {
                if (item.id == id) {
                    if (item.quantity == 1) {

                        basket.contents = basket.contents.filter((n) => {return n.id != item.id});
                    } else {
                        item.quantity--;
                    }
                }
            });

            app.makePOSTRequest('/addToCart', JSON.stringify(app.basket), err => {
                if (JSON.parse(err).result == 1) {
                    console.log('Del good to basket')
                }
            });

            // app.makePOSTRequest('/delToCart', data, err => {
            //     if (err) {
            //         console.log(err);
            //     }
            // });
        }
    },
});

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        basket: [],
        filteredGoods: [],
        isVisibleCart: false,
    },
    methods: {
        makeGETRequest(url, callback) {
            let xhr = '';

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
            }

            xhr.open('GET', url, true);
            xhr.send();
        },
        // addToCart() {
        //     alert('addToCart');
        // },
        makePOSTRequest(url, data, callback) {
            let xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    callback(xhr.responseText);
                }
            }

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

            xhr.send(data);

    },

        visibleCart () {
            if (this.isVisibleCart) {
                this.isVisibleCart = false;
            } else {
                this.isVisibleCart = true;
            }
        }
    },
    mounted() {
        this.makeGETRequest(`/catalogData`, (goods)=>{
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
        });
        this.makeGETRequest(`/cartData`, (basket)=>{
            this.basket = JSON.parse(basket);
        });
    },
});
