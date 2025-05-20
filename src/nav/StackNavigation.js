import {createStackNavigator} from '@react-navigation/stack';
import TabNav from './TabNav';
import OutfitInfo from '../screen/stack/OutfitInfo';
import Favorites from '../screen/stack/Favorites';
import CreateOutfit from '../screen/stack/CreateOutfit';
import CreatedOutfitInfo from '../screen/stack/CreatedOutfitInfo';
import ArticleInfo from '../screen/stack/ArticleInfo';
import Game from '../screen/stack/Game';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TabNav" component={TabNav} />
      <Stack.Screen name="OutfitInfo" component={OutfitInfo} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="CreateOutfit" component={CreateOutfit} />
      <Stack.Screen name="CreatedOutfitInfo" component={CreatedOutfitInfo} />
      <Stack.Screen name="ArticleInfo" component={ArticleInfo} />
      <Stack.Screen name="Game" component={Game} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
