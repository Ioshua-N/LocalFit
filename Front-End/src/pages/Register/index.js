import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

export default function Register()
{
    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    async function handleRegister()
    {
        if(username == '' || password == '' || passwordAgain == '')
        {
            alert("Por favor preencha todos os campos!");
            return;
        }
        if (password != passwordAgain)
        {
            alert("As senhas não coincidem!")
            return;
        }

        try
        {
            const response = await axios.post('http://10.0.0.72:3000/register', 
            {
                username, 
                password
            });

            navigation.navigate('Welcome');
            alert(response.data.message);

            alert("Cadastro realizado com sucesso!");
        }
        catch(error)
        {
            console.error(error);
        }
    }

    return(
        <View style = {styles.container}>
            <Animatable.View style = {styles.containerHeader} animation = "fadeInLeft" delay = {500}>
                <Text style = {styles.message}>Cadastro</Text>
            </Animatable.View>

            <Animatable.View animation = "fadeInUp" style = {styles.containerForm}>
                <Text style = {styles.title}>Usuário</Text>
                <TextInput onChangeText = {setUsername} value = {username} style = {styles.input} placeholder = "Digite um Usuário"/>

                <Text style = {styles.title}>Senha</Text>
                <TextInput secureTextEntry = {true} onChangeText = {setPassword} value = {password} style = {styles.input} placeholder = "Digite sua Senha"/>

                <Text style = {styles.title}>Senha</Text>
                <TextInput secureTextEntry = {true} onChangeText = {setPasswordAgain} value = {passwordAgain} style = {styles.input} placeholder = "Digite sua Senha novamente"/>

                <TouchableOpacity style ={styles.button} onPress = {() => handleRegister()}>
                    <Text style = {styles.buttonText}>Criar Conta</Text>
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
    });