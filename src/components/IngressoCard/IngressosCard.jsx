import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { BsFillCartPlusFill } from 'react-icons/bs';

import '../IngressoCard/IngressoCard.css';
import AppContext from '../../Context/AppContext';

function IngressoCard() {
  const { eventos, cartItems, setCartItems } = useContext(AppContext);

  const handleAddCart = (evento) => {
    // Adicione o evento ao carrinho (cartItems)
    setCartItems([...cartItems, evento]);
  };

  return (
    <div>
      {eventos.map((evento) => (
        <section className="product-card" key={evento.id}>
          <div className="card__infos">
            <h2 className="card__price">{evento.id}</h2>
            <h2 className="card__title">{evento.data}</h2>
            <h2 className="card__title">{evento.nome}</h2>
          </div>

          <button
            type="button"
            className="button__add-cart"
            onClick={() => handleAddCart(evento)}
          >
            <BsFillCartPlusFill />
          </button>
        </section>
      ))}
    </div>
  );
}

export default IngressoCard;

IngressoCard.propTypes = {
  data: propTypes.shape({}),
}.isRequired;
