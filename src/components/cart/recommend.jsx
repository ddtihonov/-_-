import React, { useMemo, useEffect } from 'react';
import styles from './recommend.module.css';
import { Title } from '../../ui/title/title';
import { RecommendItem } from './recommend-item';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../ui/loader/loader';
import {getRecommendedItems} from '../../services/actions/cart'

export const Recommend = ({ extraClass }) => {
    const { recommendedItems, recommendedItemsRequest } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getRecommendedItems());
    }, 
    [dispatch]
    );

    const content = useMemo(
        () => {
            return recommendedItemsRequest ? (
                <Loader size="large" />
            ) : (
                recommendedItems.map((item, index) => {
                    return <RecommendItem key={index} {...item} />;
                })
            );
    },
        [recommendedItemsRequest, recommendedItems]
    );

    return (
        <section className={`${styles.container} ${extraClass}`}>
        <Title
            text="Обычно с этим покупают"
            amount={(recommendedItems && recommendedItems.length) || ''}
        />
        <div className={styles.items}>{content}</div>
        </section>
    );
};
