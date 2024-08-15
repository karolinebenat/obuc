import { StyleSheet } from 'react-native';

const CriarTarefaStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 50,
        width: '30%', 
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    label: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    picker: {
        height: 50,
        width: '30%', 
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#B0E0E6', 
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
        width: '30%', 
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CriarTarefaStyles;