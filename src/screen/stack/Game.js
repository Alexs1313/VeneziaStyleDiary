import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

import QuizCard from '../../components/QuizCard';
import {useStore} from '../../store/context';

const Game = () => {
  const navigation = useNavigation();
  const [showResult, setShowResult] = useState(false);
  const [step, setStep] = useState(1);
  const {selectedImg, setSelectedImg} = useStore();

  const quiz = [
    require('../../assets/images/1.jpg'),
    require('../../assets/images/2.jpg'),
    require('../../assets/images/3.jpg'),
    require('../../assets/images/4.jpg'),
    require('../../assets/images/11.jpg'),
    require('../../assets/images/12.jpg'),
    require('../../assets/images/13.jpg'),
    require('../../assets/images/14.jpg'),
    require('../../assets/images/15.jpg'),
    require('../../assets/images/16.jpg'),
    require('../../assets/images/5.jpg'),
    require('../../assets/images/6.jpg'),
    require('../../assets/images/7.jpg'),
    require('../../assets/images/8.jpg'),
    require('../../assets/images/9.jpg'),
    require('../../assets/images/10.jpg'),
    require('../../assets/images/11.jpg'),
    require('../../assets/images/12.jpg'),
    require('../../assets/images/13.jpg'),
    require('../../assets/images/14.jpg'),
    require('../../assets/images/15.jpg'),
    require('../../assets/images/16.jpg'),
  ];

  const randomNumber = Math.floor(Math.random() * (90 - 70 + 1)) + 70;

  const handleNextStep = () => {
    setShowResult(true);
    if (showResult) {
      setShowResult(false);
      setStep(step + 1);
      if (step > 5) {
        setSelectedImg(null);
      }
    }
    if (step === 6) {
      navigation.goBack();
      setSelectedImg(null);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/gameBg.png')}
        style={{flex: 1}}>
        <ScrollView>
          <View style={styles.header}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.goBack(), setSelectedImg(null);
                }}>
                <Image source={require('../../assets/icons/back.png')} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Back</Text>
            </View>
            {step !== 6 && <Text style={styles.headerTitle}>{step}/5</Text>}
          </View>

          {step !== 6 && (
            <View style={{marginHorizontal: 65, marginTop: 42}}>
              <Text style={styles.title}>Look №{step}</Text>
              {!showResult && (
                <View style={styles.questionContainer}>
                  <Text style={styles.questionText}>
                    Select the photos you want to use to create an outfit
                  </Text>
                </View>
              )}
            </View>
          )}

          {step === 1 && (
            <View>
              {showResult ? (
                <View style={{marginHorizontal: 90, marginTop: 180}}>
                  <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>
                      {`This image was chosen by ${randomNumber}% of users`}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.imagesWrap}>
                  {quiz.slice(0, 6).map(img => (
                    <QuizCard img={img} key={img} />
                  ))}
                </View>
              )}
            </View>
          )}

          {step === 2 && (
            <View>
              {showResult ? (
                <View style={{marginHorizontal: 90, marginTop: 180}}>
                  <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>
                      {`This image was chosen by ${randomNumber}% of users`}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.imagesWrap}>
                  {quiz.slice(6, 12).map(img => (
                    <QuizCard img={img} key={img} />
                  ))}
                </View>
              )}
            </View>
          )}

          {step === 3 && (
            <View>
              {showResult ? (
                <View style={{marginHorizontal: 90, marginTop: 180}}>
                  <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>
                      {`This image was chosen by ${randomNumber}% of users`}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.imagesWrap}>
                  {quiz.slice(12, 18).map(img => (
                    <QuizCard img={img} key={img} />
                  ))}
                </View>
              )}
            </View>
          )}

          {step === 4 && (
            <View>
              {showResult ? (
                <View style={{marginHorizontal: 90, marginTop: 180}}>
                  <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>
                      {`This image was chosen by ${randomNumber}% of users`}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.imagesWrap}>
                  {quiz.slice(11, 17).map(img => (
                    <QuizCard img={img} key={img} />
                  ))}
                </View>
              )}
            </View>
          )}

          {step === 5 && (
            <View>
              {showResult ? (
                <View style={{marginHorizontal: 90, marginTop: 180}}>
                  <View style={styles.questionContainer}>
                    <Text style={styles.questionText}>
                      {`This image was chosen by ${randomNumber}% of users`}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.imagesWrap}>
                  {quiz.slice(8, 14).map(img => (
                    <QuizCard img={img} key={img} />
                  ))}
                </View>
              )}
            </View>
          )}

          {step === 6 && (
            <View>
              <View style={{marginHorizontal: 90, marginTop: 250}}>
                <View style={styles.questionContainer}>
                  <Text style={styles.questionText}>
                    Thanks for playing! We hope you were inspired and had a
                    great time!
                  </Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
        <View style={{marginHorizontal: 16}}>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={selectedImg === null}
            onPress={() => handleNextStep()}>
            <LinearGradient
              colors={['#FFDF5F', '#FFB84C']}
              style={styles.gradientButton}>
              {step === 6 ? (
                <Text style={styles.btnText}>Try again</Text>
              ) : (
                <Text style={styles.btnText}>
                  {showResult ? 'Next' : 'Collect'}
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 239,
    borderRadius: 36,
    marginTop: 24,
    marginBottom: 38,
  },
  quizImg: {
    width: 115,
    height: 115,
    borderRadius: 4,
  },
  imagesWrap: {
    marginHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    gap: 7,
    marginBottom: 60,
  },
  questionContainer: {
    width: '100%',
    backgroundColor: '#E8BB08',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginTop: 28,
    marginBottom: 55,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000',
    textAlign: 'center',
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

export default Game;
