import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, View} from 'react-native';
import Outfits from '../screen/tab/Outfits';
import Wishlist from '../screen/tab/Wishlist';
import Articles from '../screen/tab/Articles';
import Quiz from '../screen/tab/Quiz';

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarItemStyle: {
          borderRadius: 100,
          padding: 10,
        },
        tabBarActiveTintColor: '#FFB84C',
        tabBarInactiveTintColor: '#fff',
        // tabBarActiveBackgroundColor: 'grey', // Grey background when focused
      }}>
      <Tab.Screen
        name="Looks & Outfits"
        component={Outfits}
        options={{
          tabBarIcon: ({color, focused}) => (
            <View>
              {focused ? (
                <Image source={require('../assets/icons/active1.png')} />
              ) : (
                <Image source={require('../assets/icons/outfits.png')} />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          tabBarIcon: ({color, focused}) => (
            <View>
              {focused ? (
                <Image source={require('../assets/icons/active2.png')} />
              ) : (
                <Image source={require('../assets/icons/wishlist.png')} />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Articles"
        component={Articles}
        options={{
          tabBarIcon: ({color, focused}) => (
            <View>
              {focused ? (
                <Image source={require('../assets/icons/active3.png')} />
              ) : (
                <Image source={require('../assets/icons/articles.png')} />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Quiz"
        component={Quiz}
        options={{
          tabBarIcon: ({color, focused}) => (
            <View>
              {focused ? (
                <Image source={require('../assets/icons/active4.png')} />
              ) : (
                <Image source={require('../assets/icons/quiz.png')} />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#272727',
    borderTopWidth: 0,
    height: 118,
    paddingBottom: 5,
    paddingTop: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
  },
  tabBarLabelStyle: {
    marginTop: 8,
    fontSize: 10,
    fontWeight: '600',
  },
});

export default TabNav;
