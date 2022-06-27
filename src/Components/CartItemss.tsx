import React from 'react';
import { CartItem } from '../App';
import styled from 'styled-components';
import Button from '@mui/material/Button';

type Props = {
  item: CartItem;
  addToCart: (clickedItem: CartItem) => void;
  removeFromCart: (id: number) => void;
};

const CartItemss: React.FC<Props> = ({ item, addToCart, removeFromCart }) => {
  return (
    <Container>
      <Content>
        <h3>${item.title}</h3>
        <div>
          <p>${item.price}</p>
          <Buttons>
            <Button
              size='small'
              disableElevation
              variant='contained'
              onClick={() => removeFromCart(item.id)}
            >
              -
            </Button>

            <Button
              size='small'
              disableElevation
              variant='contained'
              onClick={() => addToCart(item)}
            >
              +
            </Button>
            <p>${(item.amount * item.price).toFixed(2)}</p>
          </Buttons>
        </div>
        <img src={item.image} alt={item.title} />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 3rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 5px;
  border-bottom: 1px solid red;

  h3 {
    width: 200px;
  }

  img {
    width: 200px;
    height: 200px;
    object-fit: contain;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      margin: 10px;
    }
  }
`;

const Buttons = styled.div`
  Button {
    margin: 10px;
  }
`;

export default CartItemss;
