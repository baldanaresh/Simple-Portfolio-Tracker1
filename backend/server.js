import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Add a new stock
app.post('/api/stocks', async (req, res) => {
  try {
    const { name, ticker, quantity, buyPrice } = req.body;
    const stock = await prisma.stock.create({
      data: { name, ticker, quantity, buyPrice },
    });
    res.status(201).json(stock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all stocks
app.get('/api/stocks', async (req, res) => {
  try {
    const stocks = await prisma.stock.findMany();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a stock
app.put('/api/stocks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ticker, quantity, buyPrice } = req.body;
    const stock = await prisma.stock.update({
      where: { id: parseInt(id) },
      data: { name, ticker, quantity, buyPrice },
    });
    res.json(stock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a stock
app.delete('/api/stocks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.stock.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

