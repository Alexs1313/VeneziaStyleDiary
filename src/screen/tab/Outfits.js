import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {outfits} from '../../data/outfits';
import {useStore} from '../../store/context';

const Outfits = () => {
  const navigation = useNavigation();
  const {setFavorites} = useStore();
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '80%'], []);

  useEffect(() => {
    getFavorites();
  }, []);

  const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
  const bodyTypes = ['Hourglass', 'Pear', 'Apple', 'Rectangle'];
  const clothingStyles = [
    'Classic',
    'Athleisure',
    'Boho',
    'Grunge',
    'Romantic',
  ];

  const handleShowModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const filteredOutfits = outfits.filter(outfit =>
    outfit.options.some(i => filteredData.includes(i)),
  );

  const saveFilter = async () => {
    const newFilter = [selectedSeason, selectedStyle, selectedType];
    setFilteredData(newFilter);
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
          <Text style={styles.headerTitle}>Looks & Outfits</Text>
        </View>

        <View style={{paddingHorizontal: 16}}>
          <View style={styles.cardContainer}>
            {filteredOutfits.map(outfit => (
              <View style={styles.outfitCard} key={outfit.id}>
                <Image source={outfit.image} style={styles.image} />
                <Text style={styles.cardTitle}>{outfit.title}</Text>
                <View style={styles.optionsWrap}>
                  {outfit.options.map(option => (
                    <LinearGradient
                      colors={['#FFDF5F', '#FFB84C']}
                      style={styles.gradientBorder}
                      key={option}>
                      <View style={styles.innerContainer}>
                        <Text style={styles.optionText}>{option}</Text>
                      </View>
                    </LinearGradient>
                  ))}
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('OutfitInfo', outfit)}>
                  <LinearGradient
                    colors={['#FFDF5F', '#FFB84C']}
                    style={styles.gradientButton}>
                    <Text style={styles.btnText}>Read more</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ))}
            {filteredOutfits.length === 0 &&
              outfits.map(outfit => (
                <View style={styles.outfitCard} key={outfit.id}>
                  <Image source={outfit.image} style={styles.image} />
                  <Text style={styles.cardTitle}>{outfit.title}</Text>
                  <View style={styles.optionsWrap}>
                    {outfit.options.map(option => (
                      <LinearGradient
                        colors={['#FFDF5F', '#FFB84C']}
                        style={styles.gradientBorder}
                        key={option}>
                        <View style={styles.innerContainer}>
                          <Text style={styles.optionText}>{option}</Text>
                        </View>
                      </LinearGradient>
                    ))}
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('OutfitInfo', outfit)}>
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

        <View>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backgroundStyle={{backgroundColor: '#272727'}}
            handleIndicatorStyle={{backgroundColor: '#fff'}}>
            <BottomSheetView>
              <View style={styles.modalContainer}>
                <View>
                  <Text style={styles.modalTitle}>Filters</Text>
                  <Text style={styles.modalSecText}>Fashion seasons</Text>
                  <View style={styles.seasonsWrap}>
                    {seasons.map(season => (
                      <View key={season}>
                        {selectedSeason === season ? (
                          <LinearGradient
                            colors={['#FFDF5F', '#FFB84C']}
                            style={styles.activeItem}>
                            <Text style={styles.categoryText}>{season}</Text>
                          </LinearGradient>
                        ) : (
                          <TouchableOpacity
                            onPress={() => setSelectedSeason(season)}
                            activeOpacity={0.7}
                            style={styles.seasonContainer}>
                            <Text style={styles.categoryText}>{season}</Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    ))}
                  </View>
                  <View>
                    <Text style={styles.modalSecText}>Clothing styles</Text>
                    <View style={styles.seasonsWrap}>
                      {clothingStyles.map(item => (
                        <View key={item}>
                          {selectedStyle === item ? (
                            <LinearGradient
                              colors={['#FFDF5F', '#FFB84C']}
                              style={styles.activeItem}>
                              <Text style={styles.categoryText}>{item}</Text>
                            </LinearGradient>
                          ) : (
                            <TouchableOpacity
                              onPress={() => setSelectedStyle(item)}
                              activeOpacity={0.7}
                              style={styles.seasonContainer}>
                              <Text style={styles.categoryText}>{item}</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      ))}
                    </View>
                  </View>
                  <View>
                    <Text style={styles.modalSecText}>Body types</Text>
                    <View style={styles.seasonsWrap}>
                      {bodyTypes.map(type => (
                        <View key={type}>
                          {selectedType === type ? (
                            <LinearGradient
                              colors={['#FFDF5F', '#FFB84C']}
                              style={styles.activeItem}>
                              <Text style={styles.categoryText}>{type}</Text>
                            </LinearGradient>
                          ) : (
                            <TouchableOpacity
                              onPress={() => setSelectedType(type)}
                              activeOpacity={0.7}
                              style={styles.seasonContainer}>
                              <Text style={styles.categoryText}>{type}</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      ))}
                    </View>
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
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('CreateOutfit')}>
        <LinearGradient
          colors={['#FFDF5F', '#FFB84C']}
          style={styles.addButton}>
          <Image source={require('../../assets/icons/add.png')} />
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handleShowModal()}
        style={[styles.addButton, {bottom: 198, backgroundColor: '#272727'}]}>
        <Image source={require('../../assets/icons/filter.png')} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Favorites')}
        style={[styles.addButton, {bottom: 140}]}>
        <Image source={require('../../assets/icons/fav.png')} />
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
  categoryText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#151515',
  },
  addButton: {
    width: 46,
    height: 46,
    backgroundColor: 'red',
    position: 'absolute',
    right: 16,
    bottom: 258,
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
});

export default Outfits;
