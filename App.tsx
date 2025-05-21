import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/nav/StackNavigation';
import {StoreProvider} from './src/store/context';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Loader from './src/components/Welcome';
import {useEffect, useState} from 'react';

const App = () => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 4000);
  }, []);

  return (
    <NavigationContainer>
      <StoreProvider>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            {loader ? <StackNavigation /> : <Loader />}
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </StoreProvider>
    </NavigationContainer>
  );
};

export default App;
