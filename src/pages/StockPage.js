import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const StockPage = () => {
  const { id } = useParams();
  const [stock, setStock] = useState();
  
  return (
    <div>StockPage</div>
  )
}

export default StockPage