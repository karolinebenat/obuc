import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TaskItem = ({ tarefa, navigation, onEdit }) => {

    const isConcluida = tarefa.status === 'concluída';

    const handlePress = () => {
        if (!isConcluida) {
            navigation.navigate('Editar Tarefa', { tarefa, onEdit });
        }
    };

    return (
        <TouchableOpacity onPress={handlePress} disabled={isConcluida}>
            <View style={[styles.taskContainer, isConcluida && styles.concluida]}>
                <Text style={styles.taskText}>{tarefa.tarefa}</Text>
                <Text style={styles.taskStatus}>{tarefa.status}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    taskContainer: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    taskText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    taskStatus: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    concluida: {
        backgroundColor: '#d3d3d3',
    },
});

export default TaskItem;
