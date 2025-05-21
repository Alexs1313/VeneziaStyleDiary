import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ArticleInfo = ({route}) => {
  const navigation = useNavigation();
  const article = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/icons/back.png')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Info</Text>
        </View>
      </View>

      <ScrollView>
        <View style={{marginHorizontal: 16, marginBottom: 40}}>
          <Image source={article.image} style={styles.image} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.cardTitle}>{article.title}</Text>
          </View>

          <Text style={styles.optionText}>{article.text}</Text>
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
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  image: {
    width: '100%',
    height: 280,
    borderRadius: 36,
    marginTop: 24,
    marginBottom: 38,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 24,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
    lineHeight: 20,
  },
});

export default ArticleInfo;
