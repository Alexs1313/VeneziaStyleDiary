import {Image, View} from 'react-native';

const Welcome = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#131B28',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={require('../assets/images/loader.png')} />
    </View>
  );
};

export default Welcome;
