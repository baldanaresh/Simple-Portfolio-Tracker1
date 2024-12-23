import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const baseURL = import.meta.env.VITE_API_URL;
const StockList = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await fetch(`${baseURL}/api/stocks`);
      const data = await response.json();
      setStocks(data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  const deleteStock = async (id) => {
    try {
      await fetch(`${baseURL}/api/stocks/${id}`, {
        method: 'DELETE',
      });
      fetchStocks();
    } catch (error) {
      console.error('Error deleting stock:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Stock Holdings</h2>
      <Link to="/add-stock" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4 inline-block">
        Add New Stock
      </Link>
      <table className="w-full bg-white shadow-md rounded my-6">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Ticker</th>
            <th className="py-3 px-6 text-center">Quantity</th>
            <th className="py-3 px-6 text-center">Buy Price</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {stocks.map((stock) => (
            <tr key={stock.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{stock.name}</td>
              <td className="py-3 px-6 text-left">{stock.ticker}</td>
              <td className="py-3 px-6 text-center">{stock.quantity}</td>
              <td className="py-3 px-6 text-center">${stock.buyPrice.toFixed(2)}</td>
              <td className="py-3 px-6 text-center">
                <Link to={`/edit-stock/${stock.id}`} className="text-blue-500 hover:text-blue-700 mr-4">
                  Edit
                </Link>
                <button onClick={() => deleteStock(stock.id)} className="text-red-500 hover:text-red-700">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default StockList;
