import { supabase } from '@/services/supabase';
import { Task } from '@/types';
import { } from "@/types/FunctionTypes";
import * as Haptics from 'expo-haptics';
import { Alert } from 'react-native';

// Add here you're table name, make sure to double check it too
const tableName = 'appnotes';

export const fetchTask = async (
    setGetTask: (tasks: Task[]) => void, 
    setLoading: (loading: boolean) => void
) => {
    setLoading(true);
    try {
        const { error, data } = await supabase
            .from(tableName)
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching data", error.message);
            Alert.alert("Error", "Failed to load notes");
            return;
        }

        setGetTask(data || []);

    } catch (error) {
        console.error("Unexpected error:", error);
        Alert.alert("Error", "An unexpected error occurred");
    } finally {
        setLoading(false);
    }
};

export const handleSubmit = async (
    newTitle: string,
    newDesc: string,
    setNewTitle: (title: string) => void,
    setNewDesc: (desc: string) => void,
    setIsAddModalVisible: (visible: boolean) => void,
    setGetTask: (tasks: Task[]) => void,
    setLoading: (loading: boolean) => void
) => {
    if (!newTitle.trim()) {
        Alert.alert("Error", "Please enter a title");
        return;
    }

    setLoading(true);
    try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
        alert("You must be logged in to create notes.");
        setLoading(false);
        return;
        }

        const { error } = await supabase
            .from(tableName)
            .insert({ user_id: user.id,title: newTitle, description: newDesc });

        if (error) {
            Alert.alert("Error", "Failed to create note");
            return;
        }

        setNewTitle('');
        setNewDesc('');
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setIsAddModalVisible(false);
        await fetchTask(setGetTask, setLoading);

    } catch (error) {
        console.error("Error creating note:", error);
        Alert.alert("Error", "Failed to create note");
    } finally {
        setLoading(false);
    }
};

export const updateTask = async (
    selectedTask: Task | null,
    updateTitle: string,
    updateDesc: string,
    setIsEditModalVisible: (visible: boolean) => void,
    setSelectedTask: (task: Task | null) => void,
    setGetTask: (tasks: Task[]) => void,
    setLoading: (loading: boolean) => void
) => {
    if (!selectedTask) return;

    setLoading(true);
    try {
        const { error } = await supabase
            .from(tableName)
            .update({
                title: updateTitle,
                description: updateDesc
            })
            .eq('id', selectedTask.id);

        if (error) {
            Alert.alert("Error", "Failed to update note");
            return;
        }

        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setIsEditModalVisible(false);
        setSelectedTask(null);
        await fetchTask(setGetTask, setLoading);
    } catch (error) {
        console.error("Error updating note:", error);
        Alert.alert("Error", "Failed to update note");
    } finally {
        setLoading(false);
    }
};

export const deleteTask = async (
    id: number,
    setGetTask: (tasks: Task[]) => void,
    setLoading: (loading: boolean) => void
) => {
    Alert.alert(
        "Delete Note",
        "Are you sure you want to delete this note?",
        [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    setLoading(true);
                    try {
                        const { error } = await supabase
                            .from(tableName)
                            .delete()
                            .eq('id', id);

                        if (error) {
                            Alert.alert("Error", "Failed to delete note");
                            return;
                        }

                        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                        await fetchTask(setGetTask, setLoading);
                    } catch (error) {
                        console.error("Error deleting note:", error);
                        Alert.alert("Error", "Failed to delete note");
                    } finally {
                        setLoading(false);
                    }
                }
            }
        ]
    );
};