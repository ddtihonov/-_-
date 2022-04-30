import React, { useContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AmountButton } from '../../ui/amount-button/amount-button';
import { DeleteButton } from '../../ui/delete-button/delete-button';
import styles from './product.module.css';
import {
  DELETE_ITEM,
  DECREASE_ITEM,
  INCREASE_ITEM,
} from '../../services/actions/cart';

import { DiscountContext, TotalPriceContext } from '../../services/appContext';

export const Product = ({ src, id, text, qty, price }) => {
  const { totalPrice, setTotalPrice } = useContext(TotalPriceContext);
  const { discountState } = useContext(DiscountContext);

  const dispatch = useDispatch();

  const discountedPrice = useMemo(() => ((price - price * (discountState.discount / 100)) * qty).toFixed(0), [
    discountState.discount,
    price,
    qty
  ]);

  const onDelete = () => {
    dispatch({
    type: DELETE_ITEM,
    id
} )
  };

  const decrease = () => {
    if (qty === 1) {
      onDelete();
    } else {
      setTotalPrice(totalPrice - price);
      dispatch({
        type: DECREASE_ITEM,
        id
    } )
    }
  };

  const increase = () => {
    setTotalPrice(totalPrice + price);
    dispatch({
      type: INCREASE_ITEM,
      id
  })
  };


  return (
    <div className={`${styles.product}`}>
      <img className={styles.img} src={src} alt="фото товара." />
      <p className={styles.text}>{text}</p>
      <div className={styles.amountbox}>
        <AmountButton onClick={decrease}>-</AmountButton>
        <p className={styles.amount}>{qty}</p>
        <AmountButton onClick={increase}>+</AmountButton>
      </div>
      <div className={styles.price}>
        <p className={`${styles.price} ${discountState.discount && styles.exPrice}`}>{price * qty} руб.</p>
        {discountState.discount && <p className={styles.price}>{discountedPrice} руб.</p>}
      </div>
      <DeleteButton onDelete={onDelete} />
    </div>
  );
};