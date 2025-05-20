import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import {useStore} from '../store/context';

const QuizCard = ({img}) => {
  const {selectedImg, setSelectedImg} = useStore();
  return (
    <TouchableOpacity
      style={
        selectedImg === img && {
          borderWidth: 1,
          borderColor: '#FFB84C',
        }
      }
      activeOpacity={0.7}
      onPress={() => setSelectedImg(img)}>
      <Image source={img} style={styles.quizImg} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  quizImg: {
    width: 115,
    height: 115,
    borderRadius: 4,
  },
});

export default QuizCard;
