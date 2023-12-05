import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native'

export default function Welcome()
{
    const navigation = useNavigation();

    return(
        <View style = {styles.container}>
            <View>
                <Animatable.Image
                    animation = "flipInY"
                    source = { require('../../assets/academia.jpg') }
                    style = {{ width: '100%' }}
                    resizeMode = 'contain'
                />
            </View>

            <Animatable.View delay = {600} animation = "fadeInUp" style = {styles.containerForm}>
                <Text style = {styles.phrase}>O controle da sua saúde na palma da sua mão!</Text>
                <Text style = {styles.text}>Faça o Login para acessar</Text>

                <TouchableOpacity style = {styles.button} onPress = {() => navigation.navigate('Login')}>
                    <Text style = {styles.buttonText}>Acessar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: 
        {
            flex: 1,
            backgroundColor: '#fff'
        },
        containerImage:
        {
            flex: 2,
            backgroundColor: 'green',
            justifyContent: 'center',
            alignItems: 'center'
        },
        containerForm:
        {
            flex: 1,
            backgroundColor: '#025BAD',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            paddingStart: '5%',
            paddingEnd: '5%'
        },
        phrase:
        {
            color: '#fff',
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 28,
            marginBottom: 12
        },
        text:
        {
            color: '#fff',
        },
        button:
        {
            position: 'absolute',
            backgroundColor: '#FBEE1E',
            borderRadius: 50,
            paddingVertical: 8,
            width: '60%',
            alignSelf: 'center',
            bottom: '15%',
            alignItems: 'center',
            justifyContent: 'center'
        },
        buttonText:
        {
            fontSize: 18,
            color: '#025BAD',
            fontWeight: 'bold',
        }
    })