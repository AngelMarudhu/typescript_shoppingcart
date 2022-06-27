import React from 'react';
import { CartItem } from '../App';
import styled from 'styled-components';
import { MdLocalOffer } from 'react-icons/md';
import Button from '@mui/material/Button';

type Props = {
  item: CartItem;
  handleAddToCart: (clicked: CartItem) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  return (
    <Container>
      <Wrapper>
        <img src={item.image} alt={item.title} />
        <div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <Price>
            <MdLocalOffer />
            <h2>{item.price} $</h2>
          </Price>
        </div>
        <Button onClick={() => handleAddToCart(item)}>Add To Cart</Button>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  margin-top: 4rem;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid yellow;
  border-radius: 20px;
  padding: 10px;
  transition: all 0.3s ease-in-out;

  /* :hover {
    transform: scale(0.8);
  } */

  img {
    width: 300px;
    height: 400px;
    object-fit: cover;
    transition: all 0.3s ease-in-out;
    border: none;

    :hover {
      transform: scale(0.8);
    }

    & > div {
      width: 70%;
      margin-top: 1rem;
    }
    button {
      width: 70%;
      padding: 10px;
      border: none;
      background-color: lightcyan;
      border-radius: 20px;
      font-weight: bold;
      font-size: 18px;
      cursor: pointer;
    }
  }
`;

const Price = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  float: right;
  h2 {
    margin-left: 5px;
  }
`;

export default Item;
