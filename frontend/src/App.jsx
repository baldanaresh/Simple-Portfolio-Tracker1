// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import StockList from './components/StockList';
import StockForm from './components/StockForm';

function App() {
  return (
    <Router>
      <div className="container mx-auto px-4 ">
        <h1 className="text-4xl font-bold text-center my-8">Portfolio Tracker</h1>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stocks" element={<StockList />} />
          <Route path="/add-stock" element={<StockForm />} />
          <Route path="/edit-stock/:id" element={<StockForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
