import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';

const LoginScreen = ({ navigation }) => {
    const [nome, setUsername] = useState('');
    const [senha, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const userExistsResponse = await axios.get(`http://localhost:3333/users?nome=${nome}`);
            const userExists = userExistsResponse.data;

            if (!userExists) {
                Alert.alert('Usuário não cadastrado.');
                return;
            }

            const response = await axios.post('http://localhost:3333/login', { nome, senha });

            const { token } = response.data;

            await AsyncStorage.setItem('token', token);

            Alert.alert('Login bem-sucedido!');
            navigation.navigate('Tarefas');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                Alert.alert('Usuário não cadastrado.');
            } else if (error.response && error.response.status === 409) {
                Alert.alert('Usuário já cadastrado, realizando login...');
                const loginResponse = await axios.post('http://localhost:3333/login', { nome, senha });

                const { token } = loginResponse.data;
                
                await AsyncStorage.setItem('token', token);

                Alert.alert('Login bem-sucedido!');
                navigation.navigate('Tarefas');
            } else {
                Alert.alert('Erro', 'Falha no login. Tente novamente.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Usuário"
                value={nome}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                secureTextEntry
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                <Text style={{ textAlign: 'center', marginTop: 10 }}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;
