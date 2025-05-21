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

import {useStore} from '../../store/context';

const CreatedOutfitInfo = ({route}) => {
  const navigation = useNavigation();
  const outfit = route.params;
  const {
    removeOutfit,
    saveNotPurchasedOutfit,
    removeNotPurchasedOutfit,
    saveOutfit,
  } = useStore();

  const handleToggleOutfit = () => {
    if (outfit.selectedIdx === 0) {
      saveNotPurchasedOutfit(outfit.outfit);
      removeOutfit(outfit.outfit.id);
      setTimeout(() => {
        navigation.goBack();
      }, 300);
    } else {
      saveOutfit(outfit.outfit);
      removeNotPurchasedOutfit(outfit.outfit.id);
      setTimeout(() => {
        navigation.goBack();
      }, 300);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}>
              <Image source={require('../../assets/icons/back.png')} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Info</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              if (outfit.selectedIdx === 0) {
                removeOutfit(outfit.outfit.id),
                  setTimeout(() => {
                    navigation.goBack();
                  }, 300);
              } else {
                removeNotPurchasedOutfit(outfit.outfit.id),
                  setTimeout(() => {
                    navigation.goBack();
                  }, 300);
              }
            }}>
            <Image source={require('../../assets/icons/del.png')} />
          </TouchableOpacity>
        </View>

        <View style={{marginHorizontal: 16}}>
          <Image source={{uri: outfit.outfit.image}} style={styles.image} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.cardTitle}>{outfit.outfit.title}</Text>
          </View>
          <View style={styles.optionWrap}>
            <Text style={styles.secText}>Price:</Text>
            <Text style={styles.optionText}>{outfit.outfit.price}</Text>
          </View>

          <View style={[styles.optionWrap, {marginBottom: 110}]}>
            <Text style={styles.secText}>Clothing styles:</Text>
            <LinearGradient
              colors={['#FFDF5F', '#FFB84C']}
              style={styles.gradientBorder}>
              <View style={styles.innerContainer}>
                <Text style={styles.optionText}>{outfit.outfit.category}</Text>
              </View>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
      <View style={{marginHorizontal: 16}}>
        {outfit.selectedIdx === 0 ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleToggleOutfit()}>
            <LinearGradient
              colors={['#FFDF5F', '#FFB84C']}
              style={styles.gradientButton}>
              <Text style={styles.btnText}>Bought</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleToggleOutfit()}>
            <View style={styles.button}>
              <Text style={styles.btnText}>Not purchased</Text>
            </View>
          </TouchableOpacity>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginBottom: 16,
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
  button: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    width: '100%',
    backgroundColor: '#272727',
    bottom: 40,
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
  gradientButton: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: '100%',
    bottom: 40,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default CreatedOutfitInfo;
