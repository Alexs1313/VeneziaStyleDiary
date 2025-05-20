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

import {articles} from '../../data/articles';

const Articles = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Useful articles</Text>
      </View>

      <ScrollView style={{paddingHorizontal: 16}}>
        <View style={styles.cardContainer}>
          {articles.map(article => (
            <View style={styles.outfitCard} key={article.id}>
              <Image source={article.image} style={styles.image} />

              <View
                style={{
                  width: '60%',
                  paddingLeft: 16,
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.cardTitle}>{article.title}</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('ArticleInfo', article)}>
                  <LinearGradient
                    colors={['#FFDF5F', '#FFB84C']}
                    style={styles.gradientButton}>
                    <Text style={styles.btnText}>Read more</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 26,
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
    flexDirection: 'row',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  gradientButton: {
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: '100%',
  },
});

export default Articles;
