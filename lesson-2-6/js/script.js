const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('goods-list',{
    props: ['goods'],
    template: `
        <div class="goods-list">
            <goods-item class="goods-item" v-for="good in goods"  v-bind:good="good"></goods-item>
        </div>
    `,
});

Vue.component('goods-item',{
    props: ['good'],
    template: `
        <div>
            <h3>{{ good.product_name }}</h3>
            <p>{{ good.price }}</p>
        </div>
    `,
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

Vue.component('basket-item',{
    props: ['itembasket'],
    template: `
        <div>
            <h3>{{ itembasket.product_name }}</h3>
            <p>{{ itembasket.price }}</p>
            <p>{{ itembasket.quantity }}</p>
        </div>
    `,
});

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        basket: [],
        filteredGoods: [],
        isVisibleCart: false
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
        visibleCart () {
            if (this.isVisibleCart) {
                this.isVisibleCart = false;
            } else {
                this.isVisibleCart = true;
            }
        }

    },
    mounted() {
        this.makeGETRequest(`${API_URL}/catalogData.json`, (goods)=>{
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
        });
        this.makeGETRequest(`${API_URL}/getBasket.json`, (basket)=>{
            this.basket = JSON.parse(basket);
        });
    }
});
