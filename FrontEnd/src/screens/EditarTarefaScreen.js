import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditarTarefaStyles from '../styles/EditarTarefaStyles';

const EditarTarefaScreen = ({ route, navigation }) => {
    const { tarefa, onEdit } = route.params;
    const [nomeTarefa, setNomeTarefa] = useState(tarefa.tarefa);
    const [status, setStatus] = useState(tarefa.status);

    const handleEditarTarefa = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            
            await axios.put(
                `http://localhost:3333/tasks/${tarefa.id}`, 
                { tarefa: nomeTarefa, status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            Alert.alert('Tarefa editada com sucesso!');
            onEdit();
            navigation.navigate('Tarefas');
        } catch (error) {
            Alert.alert('Erro', 'Falha ao editar a tarefa. Tente novamente.');
        }
    };

    const handleExcluirTarefa = async () => {
        Alert.alert(
            'Confirmar Exclusão',
            'Tem certeza que deseja excluir esta tarefa?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Sim',
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem('token'); // Obtém o token do AsyncStorage
                            console.log(`Excluindo tarefa com ID: ${tarefa.id}`);
                            await axios.delete(
                                `http://localhost:3333/tasks/${tarefa.id}`,
                                { headers: { Authorization: `Bearer ${token}` } } // Inclui o token no cabeçalho
                            );
                            Alert.alert('Tarefa excluída com sucesso!');
                            onEdit();
                            navigation.navigate('Tarefas');
                        } catch (error) {
                            console.error('Erro ao excluir tarefa:', error); // Log para depuração
                            Alert.alert('Erro', 'Falha ao excluir a tarefa. Tente novamente.');
                        }
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={EditarTarefaStyles.container}>
            <Text style={EditarTarefaStyles.title}>Editar Tarefa</Text>
            <TextInput 
                style={EditarTarefaStyles.input} 
                placeholder="Nome da Tarefa" 
                value={nomeTarefa} 
                onChangeText={setNomeTarefa} 
            />
            <Text style={EditarTarefaStyles.label}>Status:</Text>
            <Picker
                selectedValue={status}
                style={EditarTarefaStyles.picker}
                onValueChange={(itemValue) => setStatus(itemValue)}
            >
                <Picker.Item label="Não Iniciada" value="não iniciada" />
                <Picker.Item label="Em Andamento" value="em andamento" />
                <Picker.Item label="Concluída" value="concluída" />
            </Picker>
            <View style={EditarTarefaStyles.buttonContainer}>
                <TouchableOpacity style={[EditarTarefaStyles.button, EditarTarefaStyles.saveButton]} onPress={handleEditarTarefa}>
                    <Text style={EditarTarefaStyles.buttonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[EditarTarefaStyles.button, EditarTarefaStyles.deleteButton]} onPress={handleExcluirTarefa}>
                    <Text style={EditarTarefaStyles.buttonText}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditarTarefaScreen;
