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
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useStore} from '../../store/context';

const OutfitInfo = ({route}) => {
  const navigation = useNavigation();
  const outfit = route.params;
  const [iconColor, setIconColor] = useState(false);
  const {setFavorites} = useStore();

  useEffect(() => {
    renderFavoritesIcon(outfit);
  }, []);

  const addToFavorites = async item => {
    try {
      setIconColor(true);
      const jsonValue = await AsyncStorage.getItem('favorites');
      let favoritesList = jsonValue !== null ? JSON.parse(jsonValue) : [];

      const filtered = favoritesList.find(val => val.id === item.id);

      if (!filtered) {
        favoritesList.push(item);

        setFavorites(favoritesList);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesList));
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const removeFavorites = async item => {
    setIconColor(false);
    const jsonValue = await AsyncStorage.getItem('favorites');
    let favoritesList = jsonValue != null ? JSON.parse(jsonValue) : [];
    const filtered = favoritesList.filter(fav => fav.id !== item.id);
    await AsyncStorage.setItem('favorites', JSON.stringify(filtered));

    setFavorites(filtered);
  };

  const renderFavoritesIcon = async item => {
    const jsonValue = await AsyncStorage.getItem('favorites');
    const favoritesList = JSON.parse(jsonValue);

    if (favoritesList != null) {
      let data = favoritesList.find(fav => fav.id === item.id);

      return data == null ? setIconColor(false) : setIconColor(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/icons/back.png')} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Info</Text>
      </View>

      <ScrollView>
        <View style={{marginHorizontal: 16}}>
          <Image source={outfit.image} style={styles.image} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.cardTitle}>{outfit.title}</Text>
            <TouchableOpacity
              onPress={() =>
                iconColor ? removeFavorites(outfit) : addToFavorites(outfit)
              }>
              {iconColor ? (
                <Image source={require('../../assets/icons/filledheart.png')} />
              ) : (
                <Image source={require('../../assets/icons/heart.png')} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.optionWrap}>
            <Text style={styles.secText}>Fashion seasons:</Text>
            <LinearGradient
              colors={['#FFDF5F', '#FFB84C']}
              style={styles.gradientBorder}>
              <View style={styles.innerContainer}>
                <Text style={styles.optionText}>{outfit.options[0]}</Text>
              </View>
            </LinearGradient>
          </View>
          <View style={styles.optionWrap}>
            <Text style={styles.secText}>Clothing styles:</Text>
            <LinearGradient
              colors={['#FFDF5F', '#FFB84C']}
              style={styles.gradientBorder}>
              <View style={styles.innerContainer}>
                <Text style={styles.optionText}>{outfit.options[1]}</Text>
              </View>
            </LinearGradient>
            {outfit.id === 1 ||
              (outfit.id === 2 && (
                <LinearGradient
                  colors={['#FFDF5F', '#FFB84C']}
                  style={styles.gradientBorder}>
                  <View style={styles.innerContainer}>
                    <Text style={styles.optionText}>{outfit.options[2]}</Text>
                  </View>
                </LinearGradient>
              ))}
          </View>
          <View style={styles.optionWrap}>
            <Text style={styles.secText}>Body types:</Text>
            <LinearGradient
              colors={['#FFDF5F', '#FFB84C']}
              style={styles.gradientBorder}>
              <View style={styles.innerContainer}>
                <Text style={styles.optionText}>{outfit.options[2]}</Text>
              </View>
            </LinearGradient>
          </View>
          <Text style={styles.useText}>Use:</Text>
        </View>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {outfit.use.map(img => (
              <Image source={img} key={img} style={styles.scrollImage} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  image: {
    width: '100%',
    height: 239,
    borderRadius: 36,
    marginTop: 24,
    marginBottom: 38,
  },
  scrollImage: {
    width: 150,
    height: 150,
    borderRadius: 26,
    marginLeft: 16,
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
    marginBottom: 38,
  },
  secText: {fontSize: 12, fontWeight: '400', color: '#fff'},
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
  useText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginTop: 30,
    marginBottom: 16,
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
  optionWrap: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
});

export default OutfitInfo;
