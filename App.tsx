import {NavigationContainer} from '@react-navigation/native';
import TabNav from './src/nav/TabNav';
import StackNavigation from './src/nav/StackNavigation';
import {StoreProvider} from './src/store/context';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <NavigationContainer>
      <StoreProvider>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <StackNavigation />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </StoreProvider>
    </NavigationContainer>
  );
};

export default App;
