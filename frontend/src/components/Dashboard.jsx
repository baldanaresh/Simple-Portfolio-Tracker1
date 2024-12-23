import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [topPerformer, setTopPerformer] = useState(null);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/stocks');
      const data = await response.json();
      const stocksWithPrices = await Promise.all(
        data.map(async (stock) => {
          const price = await fetchStockPrice(stock.ticker);
          return { ...stock, currentPrice: price };
        })
      );
      setStocks(stocksWithPrices);
      calculateMetrics(stocksWithPrices);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  const fetchStockPrice = async (ticker) => {
    // In a real application, you would call an actual stock API here
    // For this example, we'll return a random price between 50 and 200
    return Math.random() * (200 - 50) + 50;
  };

  const calculateMetrics = (stocks) => {
    const total = stocks.reduce((sum, stock) => sum + stock.quantity * (stock.currentPrice || 0), 0);
    setTotalValue(total);

    const performer = stocks.reduce((best, stock) => {
      const performance = ((stock.currentPrice || 0) - stock.buyPrice) / stock.buyPrice;
      return performance > (best ? ((best.currentPrice || 0) - best.buyPrice) / best.buyPrice : -Infinity) ? stock : best;
    }, null);
    setTopPerformer(performer);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Total Portfolio Value</h3>
          <p className="text-3xl font-bold">${totalValue.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Top Performing Stock</h3>
          {topPerformer && (
            <p className="text-3xl font-bold">{topPerformer.name} ({topPerformer.ticker})</p>
          )}
        </div>
      </div>
      <Link to="/stocks" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        View All Stocks
      </Link>
    </div>
  );
};

export default Dashboard;
