import React from 'react';
import { CartItem } from '../App';
import styled from 'styled-components';
import CartItemss from './CartItemss';

type Props = {
  cartItems: CartItem[];
  addToCart: (clickedItem: CartItem) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items: CartItem[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>

      {cartItems.length === 0 ? <h2>No Items Your Cart</h2> : null}
      {cartItems.map((item) => (
        <CartItemss
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}

      {cartItems.length === 0 ? (
        <h2>Add Something In Your Cart</h2>
      ) : (
        <h1>Total : ${calculateTotal(cartItems).toFixed(2)}</h1>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 700px;
  padding: 10px;

  h1 {
    position: absolute;
    bottom: 20px;
  }

  & > h2:nth-child(2) {
    color: red;
    text-align: center;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & > h2:last-child {
    text-align: center;
    position: absolute;
    bottom: 50%;
  }
`;

export default Cart;
