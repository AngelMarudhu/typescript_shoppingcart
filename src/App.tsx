import React, { useState } from 'react';
import './App.css';
import Drawer from '@mui/material/Drawer';
import CircularProgress from '@mui/material/CircularProgress';
import Badge from '@mui/material/Badge';
import { useQuery } from 'react-query';
import Grid from '@mui/material/Grid';
import Item from './Components/Item';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import { BsCart } from 'react-icons/bs';
import Cart from './Components/Cart';

export type CartItem = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  amount: number;
};

const getProducts = async (): Promise<CartItem[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const { data, isLoading, error } = useQuery<CartItem[]>(
    'products',
    getProducts
  );

  console.log(data);

  const getTotalItem = (Items: CartItem[]) => [
    Items.reduce((ack: number, item) => ack + item.price, 0),
  ];

  const handleAddToCart = (clicked: CartItem) => {
    // Is item already added in the cart
    setCartItems((prev) => {
      const isItemCart = prev.find((item) => item.id === clicked.id);

      if (isItemCart) {
        return prev.map((item) =>
          item.id === clicked.id ? { ...item, amount: item.amount + 1 } : item
        );
      }
      // First time the item is added
      return [...prev, { ...clicked, amount: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItem[])
    );
  };

  if (isLoading) {
    return <CircularProgress />;
  }
  if (error) {
    return <div>'Something Went Wrong'</div>;
  }

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={removeFromCart}
        />
      </Drawer>

      <AddBasketButton>
        <IconButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItem(cartItems)} color="error">
            <BsCart />
          </Badge>
        </IconButton>
      </AddBasketButton>

      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 1500px;
  margin: auto;
`;

const AddBasketButton = styled.div`
  position: fixed;
  z-index: 100;
  right: 20px;
  top: 20px;
  transition: all 0.4s ease-in-out;
`;

export default App;
