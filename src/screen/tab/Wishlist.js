import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useMemo, useRef, useState} from 'react';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import {useStore} from '../../store/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SegmentedControl from 'react-native-segmented-control-2';

const WhishList = () => {
  const navigation = useNavigation();
  const {
    setFavorites,
    getOutfit,
    userOutfit,
    getNotPurchasedOutfit,
    notPurchasedOutfit,
  } = useStore();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const bottomSheetModalRef = useRef(null);
  const [filteredData, setFilteredData] = useState(null);
  const snapPoints = useMemo(() => ['50%', '80%'], []);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = ['Clothes', 'Shoes', 'Accessories'];

  useFocusEffect(
    useCallback(() => {
      getFavorites();
      getOutfit();
      getNotPurchasedOutfit();
    }, []),
  );

  const handleShowModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const filteredOutfits = userOutfit.filter(
    outfit => outfit.category === filteredData,
  );

  const filteredNotPurchasedOutfit = notPurchasedOutfit.filter(
    outfit => outfit.category === filteredData,
  );

  const saveFilter = async () => {
    setFilteredData(selectedCategory);
  };

  const getFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favorites');
      let favoritesList = jsonValue !== null ? JSON.parse(jsonValue) : [];

      setFavorites(favoritesList);
    } catch (e) {
      console.error('Failed to add outfit to favorites:', e);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Whishlist</Text>
        </View>

        <View style={{paddingHorizontal: 16}}>
          <SegmentedControl
            style={styles.segmentControl}
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

              {filteredData === null && (
                <View style={styles.cardContainer}>
                  {userOutfit.map(outfit => (
                    <View style={styles.outfitCard} key={outfit.id}>
                      <Image
                        source={{uri: outfit.image}}
                        style={styles.image}
                      />
                      <Text style={styles.cardTitle}>{outfit.title}</Text>
                      <View style={styles.optionsWrap}>
                        <LinearGradient
                          colors={['#FFDF5F', '#FFB84C']}
                          style={styles.gradientBorder}>
                          <View style={styles.innerContainer}>
                            <Text style={styles.optionText}>
                              {outfit.category}
                            </Text>
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
              )}

              <View style={styles.cardContainer}>
                {filteredOutfits.map(outfit => (
                  <View style={styles.outfitCard} key={outfit.id}>
                    <Image source={{uri: outfit.image}} style={styles.image} />
                    <Text style={styles.cardTitle}>{outfit.title}</Text>
                    <View style={styles.optionsWrap}>
                      <LinearGradient
                        colors={['#FFDF5F', '#FFB84C']}
                        style={styles.gradientBorder}>
                        <View style={styles.innerContainer}>
                          <Text style={styles.optionText}>
                            {outfit.category}
                          </Text>
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

              {filteredData === null && (
                <View style={styles.cardContainer}>
                  {notPurchasedOutfit.map(outfit => (
                    <View style={styles.outfitCard} key={outfit.id}>
                      <Image
                        source={{uri: outfit.image}}
                        style={styles.image}
                      />
                      <Text style={styles.cardTitle}>{outfit.title}</Text>
                      <View style={styles.optionsWrap}>
                        <LinearGradient
                          colors={['#FFDF5F', '#FFB84C']}
                          style={styles.gradientBorder}>
                          <View style={styles.innerContainer}>
                            <Text style={styles.optionText}>
                              {outfit.category}
                            </Text>
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
              )}

              <View style={styles.cardContainer}>
                {filteredNotPurchasedOutfit.map(outfit => (
                  <View style={styles.outfitCard} key={outfit.id}>
                    <Image source={{uri: outfit.image}} style={styles.image} />
                    <Text style={styles.cardTitle}>{outfit.title}</Text>
                    <View style={styles.optionsWrap}>
                      <LinearGradient
                        colors={['#FFDF5F', '#FFB84C']}
                        style={styles.gradientBorder}>
                        <View style={styles.innerContainer}>
                          <Text style={styles.optionText}>
                            {outfit.category}
                          </Text>
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
        </View>

        <View>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backgroundStyle={{backgroundColor: '#272727'}}
            handleIndicatorStyle={{backgroundColor: '#fff'}}>
            <BottomSheetView>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Filters</Text>
                <Text style={styles.modalSecText}>Fashion seasons</Text>
                <View style={styles.seasonsWrap}>
                  {categories.map(season => (
                    <View key={season}>
                      {selectedCategory === season ? (
                        <LinearGradient
                          colors={['#FFDF5F', '#FFB84C']}
                          style={styles.activeItem}>
                          <Text style={styles.categoryText}>{season}</Text>
                        </LinearGradient>
                      ) : (
                        <TouchableOpacity
                          onPress={() => setSelectedCategory(season)}
                          activeOpacity={0.7}
                          style={styles.seasonContainer}>
                          <Text style={styles.categoryText}>{season}</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                </View>
              </View>
              <View style={{marginHorizontal: 16}}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    saveFilter();
                  }}>
                  <LinearGradient
                    colors={['#FFDF5F', '#FFB84C']}
                    style={styles.gradientFilterButton}>
                    <Text style={styles.btnFilterText}>Apply</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
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
        onPress={() => handleShowModal()}
        style={[styles.addButton, {bottom: 140, backgroundColor: '#272727'}]}>
        <Image source={require('../../assets/icons/filter.png')} />
      </TouchableOpacity>
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
  segmentControl: {
    marginTop: 24,
    marginBottom: 16,
    backgroundColor: '#272727',
    borderRadius: 100,
    height: 40,
    width: '100%',
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
  activeItem: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 99,
  },

  modalContainer: {
    padding: 20,
    paddingVertical: 40,
  },
  seasonContainer: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  seasonsWrap: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  gradientFilterButton: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: '100%',
    top: 30,
  },
  btnFilterText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  modalSecText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 10,
    marginTop: 16,
  },
});

export default WhishList;
