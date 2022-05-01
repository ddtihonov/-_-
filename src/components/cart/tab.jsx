import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './tab.module.css';
import {TAB_SWITCH} from '../../services/actions/cart';

export const Tab = ({ text, active }) => {

  const dispatch = useDispatch();

  const switchTab = () => {  dispatch({type: TAB_SWITCH})
      
    };

  const className = `${styles.tab} ${active ? styles.tab_type_current : ''}`;
  return (
    <div className={`${className}`} onClick={switchTab}>
      {text}
    </div>
  );
};