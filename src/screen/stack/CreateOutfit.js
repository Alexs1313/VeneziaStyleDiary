import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

import {useStore} from '../../store/context';
import {launchImageLibrary} from 'react-native-image-picker';

const CreateOutfit = ({route}) => {
  const navigation = useNavigation();
  const outfitIdx = route.params;
  const {saveOutfit, saveNotPurchasedOutfit} = useStore();
  const [changePhoto, setChangePhoto] = useState(false);
  const [outfitData, setOutfitData] = useState({
    id: Date.now(),
    title: '',
    image: '',
    price: '',
    category: '',
  });

  let options = {
    storageOptions: {
      path: 'image',
    },
  };

  const imagePicker = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) return;

      setOutfitData(prev => ({...prev, image: response.assets[0].uri}));
      setChangePhoto(true);
    });
  };

  const handleSaveOutfit = () => {
    if (outfitIdx === 0) {
      saveOutfit(outfitData);
      setTimeout(() => {
        navigation.goBack();
      }, 300);
    } else {
      saveNotPurchasedOutfit(outfitData);
      setTimeout(() => {
        navigation.goBack();
      }, 300);
    }
  };
  const {title, image, price, category} = outfitData;

  const isDisabled = !title || !image || !price || !category;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/icons/back.png')} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>New object</Text>
        </View>

        <View style={{marginHorizontal: 16, marginTop: 24}}>
          {changePhoto ? (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image source={{uri: outfitData.image}} style={styles.uriImage} />
              <TouchableOpacity
                onPress={() => imagePicker()}
                activeOpacity={0.7}
                style={styles.addBtnContainer}>
                <Image source={require('../../assets/icons/plus.png')} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View style={styles.userImgContainer}></View>
              <TouchableOpacity
                onPress={() => imagePicker()}
                activeOpacity={0.7}
                style={styles.addBtnContainer}>
                <Image source={require('../../assets/icons/plus.png')} />
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.sectionTitle}>Title</Text>
          <TextInput
            style={styles.input}
            maxLength={20}
            value={outfitData.title}
            placeholder="Enter title"
            onChangeText={value =>
              setOutfitData(prev => ({...prev, title: value}))
            }
          />
          <Text style={styles.sectionTitle}>Price</Text>
          <TextInput
            style={styles.input}
            maxLength={20}
            value={outfitData.price}
            placeholder="Enter price"
            onChangeText={value =>
              setOutfitData(prev => ({...prev, price: value}))
            }
          />

          <Text style={styles.sectionTitle}>Category </Text>
          <TextInput
            style={[styles.input, {marginBottom: 60}]}
            maxLength={20}
            value={outfitData.category}
            placeholder="Enter category"
            onChangeText={value =>
              setOutfitData(prev => ({...prev, category: value}))
            }
          />
        </View>
      </ScrollView>
      <View style={{marginHorizontal: 16}}>
        <TouchableOpacity
          disabled={isDisabled}
          activeOpacity={0.7}
          onPress={() => handleSaveOutfit()}>
          <LinearGradient
            colors={['#FFDF5F', '#FFB84C']}
            style={styles.gradientButton}>
            <Text style={styles.btnText}>Continue</Text>
          </LinearGradient>
        </TouchableOpacity>
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
  uriImage: {width: '100%', height: 202, borderRadius: 16, marginBottom: 10},
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
  input: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingLeft: 20,
    paddingRight: 20,
    height: 46,
    fontSize: 12,
    fontWeight: '400',
    color: '#000',
    width: '100%',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 10,
  },
  userImgContainer: {
    width: '100%',
    height: 202,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 10,
  },
  addBtnContainer: {
    position: 'absolute',
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

export default CreateOutfit;
