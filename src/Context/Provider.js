import React, { useState } from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {

  const [eventos, setEventos] = useState([]); 
  const [ingressos, setIngressos] = useState([]); 
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const value = {
    eventos,
    setEventos,
    ingressos,
    setIngressos,
    loading,
    setLoading,
    cartItems,
    setCartItems,
    isCartVisible,
    setIsCartVisible,
  };

  return (
    <AppContext.Provider value={ value }>
      {children}
    </AppContext.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: propTypes.any,
}.isRequired;