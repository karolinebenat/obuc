import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import CadastroScreen from '../screens/CadastroScreen';
import TarefasScreen from '../screens/TarefasScreen';
import CriarTarefaScreen from '../screens/CriarTarefaScreen';
import EditarTarefaScreen from '../screens/EditarTarefaScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Cadastro" component={CadastroScreen} />
                <Stack.Screen name="Tarefas" component={TarefasScreen} />
                <Stack.Screen name="Criar Tarefa" component={CriarTarefaScreen} />
                <Stack.Screen name="Editar Tarefa" component={EditarTarefaScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;