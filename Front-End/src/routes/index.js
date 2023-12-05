import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/Ionicons';

import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Map from '../pages/Map';

const Stack = createNativeStackNavigator();

const SettingsButton = ({ navigation }) => 
{
    return (
        <TouchableOpacity
            style = {styles.configButton}
            onPress={() => 
            {
                alert('Botão de configurações pressionado!');
            }}
        >
            <Icon name="settings" size={24} color="white" style={{ marginRight: 5 }} />
        </TouchableOpacity>
    );
};

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Map"
                component={Map}
                options={{
                    title: 'Mapa',
                    headerStyle: {
                        backgroundColor: 'blue',
                    },
                    headerTintColor: 'white',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                    headerRight: () => <SettingsButton />,
                }}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create(
    {
        configButton:
        {
            marginRight: 10
        }
    })