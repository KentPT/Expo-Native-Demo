import { Task } from '@/types';

export interface FetchTaskType {
    setGetTask: (tasks: Task[]) => void, 
    setLoading: (loading: boolean) => void
}

export interface HandleSumbitTypes {
    newTitle: string,
    newDesc: string,
    setNewTitle: (title: string) => void,
    setNewDesc: (desc: string) => void,
    setIsAddModalVisible: (visible: boolean) => void,
    setGetTask: (tasks: Task[]) => void,
    setLoading: (loading: boolean) => void
}

export interface UpdateTaskTypes {
    selectedTask: Task | null,
    updateTitle: string,
    updateDesc: string,
    setIsEditModalVisible: (visible: boolean) => void,
    setSelectedTask: (task: Task | null) => void,
    setGetTask: (tasks: Task[]) => void,
    setLoading: (loading: boolean) => void
}

export interface DeleteTaskTypes {
    id: number,
    setGetTask: (tasks: Task[]) => void,
    setLoading: (loading: boolean) => void
}