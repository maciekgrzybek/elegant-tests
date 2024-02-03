const express = require('express');
const app = express();
const port = 3001;
var cors = require('cors');

// In-memory storage for balances of different cryptocurrencies
let balances = {
  BTC: 0.5, // Bitcoin
  ETH: 10, // Ethereum
  LTC: 20, // Litecoin
};

const mockData = {
  products: [
    {
      id: '1',
      name: 'Air Force',
      color: 'black/white',
      price: 79.85,
      image: 'images/air-force.png',
      promoAvailable: true,
      quantity: 1,
    },
    {
      id: '2',
      name: 'Air Max 90',
      color: 'white/cream',
      price: 114.9,
      image: 'images/air-max-90.png',
      promoAvailable: false,
      quantity: 1,
    },
    {
      id: '3',
      name: 'Cortez Classic',
      color: 'all black',
      price: 54.95,
      image: 'images/cortez.png',
      promoAvailable: true,
      quantity: 1,
    },
    {
      id: '4',
      name: 'Jordan Max Aura',
      color: 'white/gray',
      price: 104.95,
      image: 'images/jordan.png',
      promoAvailable: false,
      quantity: 1,
    },
  ],
  promoCodes: [
    { name: 'buy30', discount: 30 },
    { name: 'summer25', discount: 25 },
    { name: 'birthday', discount: 15 },
  ],
};

app.use(express.json(), cors());

app.get('/api/balance', (req, res) => {
  const { currency } = req.params;

  res.json({ balances });
});

app.get('/api/cart', (req, res) => {
  res.json(mockData);
});

app.get('/api/cart', (req, res) => {
  res.json(mockData);
});

app.post('/api/cart/submit', (req, res) => {
  res.json('ok');
});

app.post('/api/top-up', (req, res) => {
  const { amount, currency } = req.body;
  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }
  if (!balances.hasOwnProperty(currency)) {
    return res.status(404).json({ error: 'Currency not found' });
  }
  balances[currency] += amount;
  res.json({
    message: 'Top-up successful',
    currency,
    newBalance: balances[currency],
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
