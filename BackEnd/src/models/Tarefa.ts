export interface Task {
    id: number;
    tarefa: string;
    status: 'não iniciada' | 'em andamento' | 'concluída';
}