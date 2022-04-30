import React, { useState, useReducer } from 'react';
import styles from './app.module.css';
import { Title } from '../../ui/title/title';
import { Cart } from '../cart';
import { TotalPrice } from '../common/total-price';

import { TotalPriceContext, DiscountContext } from '../../services/appContext';

const discountInitialState = { discount: null }; 

function reducer(state, action) {
  switch (action.type) {
    case "set":
      return { discount: action.payload };
    case "reset":
      return discountInitialState;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
} 

function App() {
  const [totalPrice, setTotalPrice] = useState(0);

  const [discountState, discountDispatcher] = useReducer(reducer, discountInitialState, undefined);

  return (
    <div className={styles.app}>
      <TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>
        <DiscountContext.Provider value={{ discountState, discountDispatcher }}>
          <Title text={'Корзина'} />
          <Cart />
          <TotalPrice />
        </DiscountContext.Provider>
      </TotalPriceContext.Provider>
    </div>
  );
}

export default App;

/////////////////////////ProductsContainer
/*import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { applyPromoCodeRequest, getItemsRequest } from '../../services/fakeApi';
import styles from './products-container.module.css';
import { Product } from './product';
import { Input } from '../../ui/input/input';
import { MainButton } from '../../ui/main-button/main-button';
import { PromoButton } from '../../ui/promo-button/promo-button';
import { Loader } from '../../ui/loader/loader';

import { DiscountContext, TotalCostContext } from '../../services/appContext';
import { DataContext, PromoContext } from '../../services/productsContext';

export const ProductsContainer = () => {
  const { setTotalPrice } = useContext(TotalCostContext);
  const { setDiscount } = useContext(DiscountContext);

  const [data, setData] = useState([]);///////////////
  const [promo, setPromo] = useState('');

  const [itemsRequest, setItemsRequest] = useState(false);
  const [promoFailed, setPromoFailed] = useState(false);
  const [promoRequest, setPromoRequest] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    setItemsRequest(true);
    getItemsRequest()
      .then(res => {
        if (res && res.success) {
          setData(res.data);/////////////////////////
          setItemsRequest(false);
        }
      })
      .catch(err => {
        console.log(err);
        setItemsRequest(false);
      });
  }, []);

  useEffect(
    () => {
      let total = 0;
      data.map(item => (total += item.price * item.qty));///////////////////
      setTotalPrice(total);
    },
    [data, setTotalPrice]////////////////////
  );

  const applyPromoCode = useCallback(
    () => {
      const inputValue = inputRef.current.value;
      setPromoRequest(true);
      applyPromoCodeRequest(inputValue)
        .then(res => {
          if (res && res.success) {
            setPromo(inputValue);
            setDiscount(res.discount);
            setPromoRequest(false);
            setPromoFailed(false);
          } else {
            setPromoFailed(true);
            setPromoRequest(false);
            setDiscount(0);
            setPromo('');
          }
        })
        .catch(err => {
          console.log(err);
          setPromoRequest(false);
        });
    },
    [setDiscount]
  );

  const content = useMemo(
    () => {
      return itemsRequest ? (
        <Loader size="large" />
      ) : (
        data.map((item, index) => {
          return <Product key={index} {...item} />;//////////////////////////////////
        })
      );
    },
    [itemsRequest, data]///////////////////////////////////
  );

  const promoCodeStatus = useMemo(
    () => {
      return promoFailed ? (
        <p className={styles.text}>Произошла ошибка! Проверьте корректность введенного промокода</p>
      ) : promoRequest ? (
        ''
      ) : promo ? (
        <p className={styles.text}>Промокод успешно применён!</p>
      ) : (
        ''
      );
    },
    [promoRequest, promo, promoFailed]
  );

  return (
    <div className={`${styles.container}`}>
      <DataContext.Provider value={{ data, setData }}>//////////////////////
        <PromoContext.Provider value={{ promo, setPromo }}>
          {content}
          <div className={styles.promo}>
            <div className={styles.inputWithBtn}>
              <Input
                type="text"
                placeholder="Введите промокод"
                extraClass={styles.input}
                inputWithBtn={true}
                inputRef={inputRef}
              />
              <MainButton
                type="button"
                extraClass={styles.promo_button}
                inputButton={true}
                onClick={applyPromoCode}
              >
                {promoRequest ? <Loader size="small" inverse={true} /> : 'Применить'}
              </MainButton>
            </div>
            {promo && <PromoButton extraClass={styles.promocode}>{promo}</PromoButton>}
          </div>
          {promoCodeStatus}
        </PromoContext.Provider>
      </DataContext.Provider>
    </div>
  );
};*/
///////////////////////////////////////////////////////////////////Product
/*import React, { useContext, useMemo } from 'react';
import { AmountButton } from '../../ui/amount-button/amount-button';
import { DeleteButton } from '../../ui/delete-button/delete-button';
import styles from './product.module.css';

import { DiscountContext, TotalCostContext } from '../../services/appContext';
import { DataContext } from '../../services/productsContext';

export const Product = ({ src, id, text, qty, price }) => {
  const { totalPrice, setTotalPrice } = useContext(TotalCostContext);
  const { discount } = useContext(DiscountContext);
  const { data, setData } = useContext(DataContext);

  const discountedPrice = useMemo(() => ((price - price * (discount / 100)) * qty).toFixed(0), [
    discount,
    price,
    qty
  ]);

  const onDelete = () => {
    setData(data.filter(item => item.id !== id));
  };

  const decrease = () => {
    if (qty === 1) {
      onDelete();
    } else {
      setTotalPrice(totalPrice - price);
      const newData = data.map(item => {
        if (item.id === id) {
          item.qty -= 1;
          return item;
        }
        return item;
      });
      setData(newData);
    }
  };

  const increase = () => {
    setTotalPrice(totalPrice + price);
    const newData = data.map(item => {
      if (item.id === id) {
        item.qty += 1;
        return item;
      }
      return item;
    });
    setData(newData);
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
        <p className={`${styles.price} ${discount && styles.exPrice}`}>{price * qty} руб.</p>
        {discount && <p className={styles.price}>{discountedPrice} руб.</p>}
      </div>
      <DeleteButton onDelete={onDelete} />
    </div>
  );
};*/