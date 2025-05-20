import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Quiz = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Game</Text>
      </View>

      <ImageBackground
        source={require('../../assets/images/quizBg.jpg')}
        style={{flex: 1, alignItems: 'center'}}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.image}
          onPress={() => navigation.navigate('Game')}>
          <Image source={require('../../assets/images/play.png')} />
        </TouchableOpacity>
      </ImageBackground>
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
  image: {
    position: 'absolute',
    bottom: 141,
  },
});

export default Quiz;
