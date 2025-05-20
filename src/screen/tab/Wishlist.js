import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {outfits} from '../../data/outfits';
import LinearGradient from 'react-native-linear-gradient';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {useStore} from '../../store/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SegmentedControl from 'react-native-segmented-control-2';

const WhishList = () => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['70%', '80%'], []);
  const {
    setFavorites,
    getOutfit,
    userOutfit,
    getNotPurchasedOutfit,
    notPurchasedOutfit,
  } = useStore();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   getFavorites();
  //   getOutfit();
  //   getNotPurchasedOutfit();
  // }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      getFavorites();
      getOutfit();
      getNotPurchasedOutfit();
    }, []),
  );

  console.log('userOutfit', userOutfit);
  console.log('notPurchasedOutfit', notPurchasedOutfit);

  const getFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favorites');
      let favoritesList = jsonValue !== null ? JSON.parse(jsonValue) : [];

      setFavorites(favoritesList);
    } catch (e) {
      console.error('Failed to add outfit to favorites:', e);
    }
  };

  // Hide tab bar when sheet is open, show when closed
  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({
        tabBarStyle: sheetOpen ? {display: 'none'} : undefined,
      });
      return () => {
        // Always show tab bar when leaving screen
        navigation.getParent()?.setOptions({
          tabBarStyle: undefined,
        });
      };
    }, [sheetOpen, navigation]),
  );

  const handleSheetChange = index => {
    setSheetOpen(index >= 0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Whishlist</Text>
      </View>

      <ScrollView style={{paddingHorizontal: 16}}>
        <SegmentedControl
          style={{
            marginTop: 24,
            marginBottom: 16,
            backgroundColor: '#272727',
            borderRadius: 100,
            height: 40,
            width: '100%',
          }}
          activeTabColor="#151515"
          activeTextColor="#fff"
          gap={4}
          textStyle={{color: '#fff'}}
          tabs={['I want to buy', 'Bought']}
          selectedTabStyle={{
            borderRadius: 100,
          }}
          onChange={index => setSelectedIdx(index)}
        />

        {selectedIdx === 0 && (
          <View>
            {userOutfit.length === 0 && (
              <View style={{marginHorizontal: 16}}>
                <Text style={styles.emptyListText}>
                  Wishlist is empty, add your desired purchase now
                </Text>
              </View>
            )}

            <View style={styles.cardContainer}>
              {userOutfit.map(outfit => (
                <View style={styles.outfitCard} key={outfit.id}>
                  <Image source={{uri: outfit.image}} style={styles.image} />
                  <Text style={styles.cardTitle}>{outfit.title}</Text>
                  <View style={styles.optionsWrap}>
                    <LinearGradient
                      colors={['#FFDF5F', '#FFB84C']}
                      style={styles.gradientBorder}>
                      <View style={styles.innerContainer}>
                        <Text style={styles.optionText}>{outfit.category}</Text>
                      </View>
                    </LinearGradient>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      navigation.navigate('CreatedOutfitInfo', {
                        outfit,
                        selectedIdx,
                      })
                    }>
                    <LinearGradient
                      colors={['#FFDF5F', '#FFB84C']}
                      style={styles.gradientButton}>
                      <Text style={styles.btnText}>Read more</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}

        {selectedIdx === 1 && (
          <View>
            {notPurchasedOutfit.length === 0 && (
              <View style={{marginHorizontal: 16}}>
                <Text style={styles.emptyListText}>
                  Wishlist is empty, add your desired purchase now
                </Text>
              </View>
            )}

            <View style={styles.cardContainer}>
              {notPurchasedOutfit.map(outfit => (
                <View style={styles.outfitCard} key={outfit.id}>
                  <Image source={{uri: outfit.image}} style={styles.image} />
                  <Text style={styles.cardTitle}>{outfit.title}</Text>
                  <View style={styles.optionsWrap}>
                    <LinearGradient
                      colors={['#FFDF5F', '#FFB84C']}
                      style={styles.gradientBorder}>
                      <View style={styles.innerContainer}>
                        <Text style={styles.optionText}>{outfit.category}</Text>
                      </View>
                    </LinearGradient>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      navigation.navigate('CreatedOutfitInfo', {
                        outfit,
                        selectedIdx,
                      })
                    }>
                    <LinearGradient
                      colors={['#FFDF5F', '#FFB84C']}
                      style={styles.gradientButton}>
                      <Text style={styles.btnText}>Read more</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('CreateOutfit', selectedIdx)}>
        <LinearGradient
          colors={['#FFDF5F', '#FFB84C']}
          style={styles.addButton}>
          <Image source={require('../../assets/icons/add.png')} />
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => bottomSheetRef.current?.expand()}
        style={[styles.addButton, {bottom: 140, backgroundColor: '#272727'}]}>
        <Image source={require('../../assets/icons/filter.png')} />
      </TouchableOpacity>

      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: 900,
          bottom: 0,
        }}>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={{backgroundColor: '#272727'}}
          onChange={handleSheetChange}
          handleIndicatorStyle={{backgroundColor: '#fff'}}>
          <BottomSheetView>
            <View style={styles.modalContainer}>
              <Text style={styles.headerTitle}>
                This is a bottom sheet. Swipe down to close.
              </Text>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151515',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#272727',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  emptyListText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
    marginTop: 200,
  },
  image: {
    width: '100%',
    height: 326,
    borderRadius: 16,
  },
  cardContainer: {
    gap: 16,
    marginTop: 24,
    marginBottom: 130,
  },
  outfitCard: {
    padding: 16,
    backgroundColor: '#272727',
    borderRadius: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginTop: 16,
    marginBottom: 12,
  },
  gradientBorder: {
    borderRadius: 50,
    padding: 1,
  },
  innerContainer: {
    backgroundColor: '#272727',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  optionText: {
    fontSize: 10,
    fontWeight: '400',
    color: '#fff',
  },
  optionsWrap: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  gradientButton: {
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: '100%',
  },
  btnText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
  addButton: {
    width: 46,
    height: 46,
    backgroundColor: 'red',
    position: 'absolute',
    right: 16,
    bottom: 200,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  modalContainer: {
    padding: 20,
    paddingVertical: 40,
  },
});

export default WhishList;
