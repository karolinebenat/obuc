import { StyleSheet } from 'react-native';

const TarefasStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#B0E0E6',
        borderRadius: 25, 
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    kanbanContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        flex: 1,
    },
    column: {
        flex: 1,
        margin: 5,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    columnTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    listContent: {
        paddingVertical: 10
    },
});

export default TarefasStyles;