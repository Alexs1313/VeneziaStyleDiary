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
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useStore} from '../../store/context';

const Favorites = () => {
  const navigation = useNavigation();
  const {setFavorites, favorites} = useStore();

  useEffect(() => {
    getFavorites();
  }, []);

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
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/icons/back.png')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Favorites</Text>
        </View>

        <View style={{paddingHorizontal: 16}}>
          <View style={styles.cardContainer}>
            {favorites.map(outfit => (
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
    height: 326,
    borderRadius: 16,
  },
  cardContainer: {
    gap: 16,
    marginTop: 24,
    marginBottom: 40,
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
});

export default Favorites;
