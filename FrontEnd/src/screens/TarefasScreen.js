import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import TaskItem from '../components/TaskItem';
import TarefasStyles from '../styles/TarefaStyles';

const TarefasScreen = ({ navigation }) => {
    const [tarefas, setTarefas] = useState([]);

    const fetchTarefas = async () => {
        try {
            const response = await axios.get('http://localhost:3333/tasks');
            setTarefas(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTarefas();
    }, []);

    const tarefasNaoIniciadas = tarefas.filter(task => task.status === 'não iniciada');
    const tarefasEmAndamento = tarefas.filter(task => task.status === 'em andamento');
    const tarefasConcluidas = tarefas.filter(task => task.status === 'concluída');

    const handleTaskEdit = () => {
        fetchTarefas();
    };

    return (
        <View style={TarefasStyles.container}>
            <View style={TarefasStyles.header}>
                <Text style={TarefasStyles.title}>Tarefas</Text>
                <TouchableOpacity style={TarefasStyles.button} onPress={() => navigation.navigate('Criar Tarefa')}>
                    <Text style={TarefasStyles.buttonText}>Criar Tarefa</Text>
                </TouchableOpacity>
            </View>
            <View style={TarefasStyles.kanbanContainer}>
                <View style={TarefasStyles.column}>
                    <Text style={TarefasStyles.columnTitle}>Não Iniciadas</Text>
                    <FlatList
                        data={tarefasNaoIniciadas}
                        renderItem={({ item }) => (
                            <TaskItem tarefa={item} navigation={navigation} onEdit={handleTaskEdit} />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={TarefasStyles.listContent}
                    />
                </View>
                <View style={TarefasStyles.column}>
                    <Text style={TarefasStyles.columnTitle}>Em Andamento</Text>
                    <FlatList
                        data={tarefasEmAndamento}
                        renderItem={({ item }) => (
                            <TaskItem tarefa={item} navigation={navigation} onEdit={handleTaskEdit} />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={TarefasStyles.listContent}
                    />
                </View>
                <View style={TarefasStyles.column}>
                    <Text style={TarefasStyles.columnTitle}>Concluídas</Text>
                    <FlatList
                        data={tarefasConcluidas}
                        renderItem={({ item }) => (
                            <TaskItem tarefa={item} navigation={navigation} onEdit={handleTaskEdit} />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={TarefasStyles.listContent}
                    />
                </View>
            </View>
        </View>
    );
};

export default TarefasScreen;
