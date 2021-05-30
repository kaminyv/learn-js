const goods = [
    { title: 'Shirt', image: 'Shirt.jpg', price: 150 },
    { title: 'Socks', image: 'Socks.jpg', price: 50 },
    { title: 'Jacket', image: 'Jacket.jpg', price: 350 },
    { title: 'Shoes', price: 250 },
];

const renderGoodsItem = (title = 'noname', image = 'noimage.jpg', price = 0) => {
    return `<div class="goods-item"><img src="img/${image}" alt="${image}"><h3>${title}</h3><p>${price}</p></div>`;
};

const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.image, item.price)).join('');
    document.querySelector('.goods-list').innerHTML = goodsList;
};

window.onload = function () {
    renderGoodsList(goods);
}

