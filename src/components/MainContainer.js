import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  // make a fetch for stocks
  // load stocks into state
  // pass down as prop to stock container
  // map over stocks in stock container

  const [stocks, setStocks] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((res) => res.json())
      .then((json) => {
        const newStocks = transformStocks(json);
        setStocks(newStocks);
      });
  }, []);

  function transformStocks(stocks) {
    return stocks.map((stock) => {
      return { ...stock, inPortfolio: false };
    });
  }

  function filterPortfolioStocks(stocks) {
    if (stocks) {
      return stocks.filter((stock) => stock.inPortfolio);
    }
    return [];
  }

  // function handleAddStock(stockId) {
  //   setStocks(prevState => {
  //     const oldStock = prevState.find(stock => stock.id === stockId)
  //     const oldStocks = prevState.filter(stock => stock.id !== stockId)
  //     const newStock = {...oldStock, inPortfolio: true}
  //     const newStocks = [...oldStocks, newStock]
  //     return newStocks
  //   })
  // }
  function handleAddStock(stockId) {
    setStocks((prevState) => {
      const oldStock = prevState.find((stock) => stock.id === stockId);
      oldStock.inPortfolio = true;
      const newStocks = [...prevState];
      return newStocks;
    });
  }
  function handleRemoveStock(stockId) {
    setStocks((prevState) => {
      const oldStock = prevState.find((stock) => stock.id === stockId);
      oldStock.inPortfolio = false;
      const newStocks = [...prevState];
      return newStocks;
    });
  }

  return (
    <div>
      <SearchBar />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocks} handleAddStock={handleAddStock} />
        </div>
        <div className="col-4">
          <PortfolioContainer
            stocks={filterPortfolioStocks(stocks)}
            handleRemoveStock={handleRemoveStock}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
