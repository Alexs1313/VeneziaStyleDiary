import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useState} from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({children}) => {
  const [favorites, setFavorites] = useState([]);
  const [userOutfit, setUserOutfit] = useState([]);
  const [notPurchasedOutfit, setNotPurchasedOutfit] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);

  const saveOutfit = async data => {
    try {
      const jsonValue = await AsyncStorage.getItem('outfit');
      let parced = jsonValue !== null ? JSON.parse(jsonValue) : [];

      const userOutfit = [...parced, data];
      await AsyncStorage.setItem('outfit', JSON.stringify(userOutfit));
      console.log('saved');
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getOutfit = async () => {
    try {
      const savedData = await AsyncStorage.getItem('outfit');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setUserOutfit(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeOutfit = async selectedId => {
    const jsonValue = await AsyncStorage.getItem('outfit');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];
    const filtered = data.filter(item => item.id !== selectedId);

    setUserOutfit(filtered);
    await AsyncStorage.setItem('outfit', JSON.stringify(filtered));

    console.log('remove');
  };

  const saveNotPurchasedOutfit = async data => {
    try {
      const jsonValue = await AsyncStorage.getItem('notPurchasedOutfit');
      let parced = jsonValue !== null ? JSON.parse(jsonValue) : [];

      const userOutfit = [...parced, data];
      await AsyncStorage.setItem(
        'notPurchasedOutfit',
        JSON.stringify(userOutfit),
      );
      console.log('saved');
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getNotPurchasedOutfit = async () => {
    try {
      const savedData = await AsyncStorage.getItem('notPurchasedOutfit');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setNotPurchasedOutfit(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeNotPurchasedOutfit = async selectedId => {
    const jsonValue = await AsyncStorage.getItem('notPurchasedOutfit');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];
    const filtered = data.filter(item => item.id !== selectedId);

    setNotPurchasedOutfit(filtered);
    await AsyncStorage.setItem('notPurchasedOutfit', JSON.stringify(filtered));

    console.log('remove');
  };

  const value = {
    favorites,
    setFavorites,
    saveOutfit,
    getOutfit,
    userOutfit,
    removeOutfit,
    saveNotPurchasedOutfit,
    getNotPurchasedOutfit,
    removeNotPurchasedOutfit,
    notPurchasedOutfit,
    selectedImg,
    setSelectedImg,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
