import { StyleSheet, View } from 'react-native'

import CartNavigator from './CartNavigator'
import Feather from '@expo/vector-icons/Feather'
import OrdersNavigator from './OrdersNavigator'
import ProfileNavigator from './ProfileNavigator'
import StackNavigator from './StackNavigator'
import { colors } from '../constants/colors'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const BottomTab = createBottomTabNavigator()

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="CartNav"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <BottomTab.Screen
        name="Shop"
        component={StackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconContainer : null}>
              <Feather name="align-justify" size={24} color={colors.white} />
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="CartNav"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconContainer : null}>
              <Feather name="edit" size={24} color={colors.white} />
            </View>
          ),
        }}
      />

      <BottomTab.Screen
        name="ProfileNav"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconContainer : null}>
              <Feather name="user" size={24} color={colors.white} />
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#ffb800",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingTop: 5,
  },
  iconContainer: {
    backgroundColor: "#d82b59",
    borderRadius: 20,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    color: "#d82b59",
  },
});
