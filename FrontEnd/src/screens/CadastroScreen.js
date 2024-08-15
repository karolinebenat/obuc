import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import styles from '../styles/styles';

const CadastroScreen = ({ navigation }) => {
    const [nome, setUsername] = useState('');
    const [senha, setPassword] = useState('');

    const handleCadastro = async () => {
        try {
            await axios.post('http://localhost:3333/register', { nome, senha });
            Alert.alert('Cadastro bem-sucedido!', 'Você pode agora fazer login.');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Erro', 'Falha no cadastro. Tente novamente.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>
            <TextInput style={styles.input} placeholder="Usuário" value={nome} onChangeText={setUsername} />
            <TextInput style={styles.input} placeholder="Senha" value={senha} secureTextEntry onChangeText={setPassword} />
            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CadastroScreen;