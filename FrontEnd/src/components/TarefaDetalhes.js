import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { getTaskById, deleteTask } from '../api/Tarefas';
import styles from '../styles/styles';

const TarefaDetalhes = ({ route, navigation }) => {
    const { tarefaId } = route.params;
    const [tarefa, setTarefa] = useState(null);

    useEffect(() => {
        const fetchTarefa = async () => {
            const fetchedTarefa = await getTaskById(tarefaId);
            setTarefa(fetchedTarefa);
        };

        fetchTarefa();
    }, [tarefaId]);

    const handleDelete = async () => {
        try {
            await deleteTask(tarefaId);
            Alert.alert('Tarefa deletada com sucesso!');
            navigation.navigate('Tarefas');
        } catch (error) {
            Alert.alert('Erro', 'Falha ao deletar a tarefa. Tente novamente.');
        }
    };

    if (!tarefa) {
        return <Text>Carregando...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhes da Tarefa</Text>
            <Text style={styles.taskTitle}>{tarefa.nome}</Text>
            <Text style={styles.taskStatus}>{tarefa.status}</Text>
            <Button title="Deletar Tarefa" onPress={handleDelete} />
        </View>
    );
};

export default TarefaDetalhes;