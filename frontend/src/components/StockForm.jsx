import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// const baseURL = import.meta.env.VITE_API_URL;
const StockForm = () => {
  const [stock, setStock] = useState({
    name: '',
    ticker: '',
    quantity: 0,
    buyPrice: 0,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchStock();
    }
  }, [id]);

  const fetchStock = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/stocks/${id}`);
      const data = await response.json();
      setStock(data);
    } catch (error) {
      console.error('Error fetching stock:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStock((prevStock) => ({
      ...prevStock,
      [name]: name === 'quantity' ? parseInt(value) : name === 'buyPrice' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = id
        ? `http://localhost:5000/api/stocks/${id}`
        : `http://localhost:5000/api/stocks`;
      const method = id ? 'PUT' : 'POST';
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stock),
      });
      navigate('/stocks');
    } catch (error) {
      console.error('Error saving stock:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">{id ? 'Edit Stock' : 'Add New Stock'}</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Stock Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={stock.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ticker">
            Ticker
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="ticker"
            type="text"
            name="ticker"
            value={stock.ticker}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
            Quantity
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="quantity"
            type="number"
            name="quantity"
            value={stock.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="buyPrice">
            Buy Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="buyPrice"
            type="number"
            name="buyPrice"
            step="0.01"
            value={stock.buyPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {id ? 'Update Stock' : 'Add Stock'}
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => navigate('/stocks')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default StockForm;
