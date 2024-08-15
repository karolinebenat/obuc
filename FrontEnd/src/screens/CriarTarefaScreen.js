import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Picker } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CriarTarefaStyles from '../styles/CriarTarefaStyles'

const CriarTarefaScreen = ({ navigation }) => {
    const [tarefa, setTarefa] = useState('');
    const [status, setStatus] = useState('não iniciada'); 

    const handleCriarTarefa = async () => {
        try {
            const token = await AsyncStorage.getItem('token');

            await axios.post('http://localhost:3333/tasks', 
                { tarefa: tarefa, status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            Alert.alert('Tarefa criada com sucesso!');
            navigation.navigate('Tarefas', { refresh: true });
        } catch (error) {
            Alert.alert('Erro', 'Falha ao criar a tarefa. Tente novamente.');
        }
    };

    return (
        <View style={CriarTarefaStyles.container}>
            <Text style={CriarTarefaStyles.title}>Criar Tarefa</Text>
            <TextInput 
                style={CriarTarefaStyles.input} 
                placeholder="Nome da Tarefa" 
                value={tarefa} 
                onChangeText={setTarefa} 
            />
            <Text style={CriarTarefaStyles.label}>Status:</Text>
            <Picker
                selectedValue={status}
                style={CriarTarefaStyles.picker}
                onValueChange={(itemValue) => setStatus(itemValue)}
            >
                <Picker.Item label="Não Iniciada" value="não iniciada" />
                <Picker.Item label="Em Andamento" value="em andamento" />
                <Picker.Item label="Concluída" value="concluída" />
            </Picker>
            <TouchableOpacity style={CriarTarefaStyles.button} onPress={handleCriarTarefa}>
                <Text style={CriarTarefaStyles.buttonText}>Criar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CriarTarefaScreen;