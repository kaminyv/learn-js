const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
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
        filterGoods () {
            const regexp = new RegExp(`${this.searchLine}`,'gi');
            this.filteredGoods = [];
            this.goods.forEach(good => {
                    if (regexp.test(good.product_name)) {
                        this.filteredGoods.push(good);
                    }
                }
            );
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
            this.goods = JSON.parse(goods);;
            this.filteredGoods = JSON.parse(goods);
        });
    }
});
