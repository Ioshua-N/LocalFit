import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

export default function Login()
{
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin()
    {
        if(username == '' || password == '')
        {
            alert("Por favor preencha todos os campos!");
            return;
        }

        try
        {
            const response = await axios.post('http:10.0.0.72:3000/login', {username, password})
            if(response.data.success)
            {
                navigation.navigate('Map');
            }
            else
            {
                alert("Usuário ou senha não existem.");
            }
        }
        catch(error)
        {
            console.log(error);
            alert("Usuário ou senha não existem.");
        }
    }

    return(
        <View style = {styles.container}>
            <Animatable.View style = {styles.containerHeader} animation = "fadeInLeft" delay = {500}>
                <Text style = {styles.message}>Bem-vindo(a)</Text>
            </Animatable.View>

            <Animatable.View animation = "fadeInUp" style = {styles.containerForm}>
                <Text style = {styles.title}>Usuário</Text>
                <TextInput onChangeText = {setUsername} value = {username} style = {styles.input} placeholder = "Digite um Usuário"/>

                <Text style = {styles.title}>Senha</Text>
                <TextInput secureTextEntry = {true} onChangeText = {setPassword} value = {password} style = {styles.input} placeholder = "Digite uma Senha"/>

                <TouchableOpacity style ={styles.button} onPress = {() => handleLogin()}>
                    <Text style = {styles.buttonText}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity style ={styles.buttonRegister} onPress = {() => navigation.navigate('Register')}>
                    <Text style = {styles.registerText}>Criar uma Conta</Text>
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
            backgroundColor: '#025BAD'
        },
        containerHeader:
        {
            marginTop: '14%',
            marginBottom: '8%',
            paddingStart: '5%',
            paddingEnd: '5%'
        },
        message:
        {
            fontSize: 28,
            fontWeight: 'bold',
            color: '#fff',
        },
        containerForm:
        {
            backgroundColor: '#fff',
            flex: 1,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            paddingStart: '5%',
            paddingEnd: '5%'
        },
        title:
        {
            fontSize: 20,
            marginTop: 28,
        },
        input:
        {
            borderBottomWidth: 1,
            height: 40,
            marginBottom: 12,
            fontSize: 16
        },
        button:
        {
            backgroundColor: '#FBEE1E',
            width: '100%',
            borderRadius: 4,
            paddingVertical: 8,
            marginTop: 14,
            justifyContent: 'center',
            alignItems: 'center'
        },
        buttonText:
        {
            color: '#025BAD',
            fontSize: 18,
            fontWeight: 'bold',
        },
        buttonRegister:
        {
            marginTop: 14,
            alignSelf: 'center'
        }
        ,registerText:
        {
            color: '#a1a1a1'
        }
    });