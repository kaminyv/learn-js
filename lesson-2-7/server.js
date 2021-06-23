const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(express.static('.'));
app.use(bodyParser.json());

// Getting a product catalog
app.get('/catalogData', (req, res) => {
    fs.readFile('./data/catalog.json', 'utf8', (err, data) => {
      res.send(data);
    });
});

// Getting a cart data
app.get('/cartData', (req, res) => {
    fs.readFile('./data/cart.json', 'utf8', (err, data) => {
        res.send(data);
    });
});

app.post('/addToCart', (req, res) => {
    fs.readFile('./data/cart.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result": FRROR}');
        } else {
            //let cart = JSON.parse(data);
            const item = req.body;

            //cart = item;

            console.log(item);

            fs.writeFile('./data/cart.json', JSON.stringify(item), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            });
        }
    });

});

app.post('/delToCart', (req, res) => {
    fs.readFile('./data/cart.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result": FRROR}');
        } else {
            //let cart = JSON.parse(data);
            const item = req.body;

            //cart = item;

            console.log(item);

            fs.writeFile('./data/cart.json', JSON.stringify(item), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            });
        }
    });

});

app.listen(3000, function () {
    console.log('Server Express is running on port 3000');
});
