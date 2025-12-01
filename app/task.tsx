import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { supabase } from '@/services/supabase'
import Video from 'react-native-video';

interface Task {
    id: number
    title: string
    description: string
    video_url: string
    image_url: string
}

export default function task() {
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [getTask, setGetTask] = useState<Task[]>([]);
    const [updateDesc, setUpdateDesc] = useState('');

    const handleSubmit = async () => {

        const { error } = await supabase
                    .from('tasks')
                    .insert({title: newTitle, description: newDesc})
                    .single()

        if (error) {
            Alert.alert("Error Inserting Data to Supabase")
            return;
        } else {
            Alert.alert("Successfully Send")
        }

        setNewTitle(newTitle)
        setNewDesc(newDesc)
    }

    const fetchTask = async () => {
        const { error, data } = await supabase  
                        .from('tasks')
                        .select('*')
                        .order('created_at' , {ascending: true})

        if (error) {
            Alert.alert("Error fetching Data to Supabase")
            console.error("Error fetching data", error.message)
            return;
        }

        setGetTask(data);

    }

    const updateTask = async (id: number) => {
        const {error} = await supabase
                    .from('tasks')
                    .update({description: updateDesc})
                    .eq('id', id)

        if (error) {
            Alert.alert("Error update task")
            return;
        } else {
            Alert.alert("Successfully updated")
        }

        setUpdateDesc(updateDesc);

    }

    const deleteTask = async (id: number) => {
        const { error } = await supabase
                    .from('tasks')
                    .delete()
                    .eq('id', id)
        
        if (error) {
            Alert.alert("Error delete task")
            return;
        } else {
            Alert.alert("Successfully deleted")
        }
    }

    useEffect(() => {
        fetchTask();
    })

  return (
    <View className='flex-1 justify-center items-center'>
      <Text>Supabase x React Native x Expo</Text>
      
    <Text>Title</Text>
    <TextInput 
    className='w-[200px] m-4 p-4'
    placeholder='Title'
    value={newTitle}
    onChangeText={setNewTitle}
    />

    <Text>Description</Text>
    <TextInput 
    className='w-[200px] m-4 p-4'
    placeholder='Description'
    value={newDesc}
    onChangeText={setNewDesc}
    />
    <TouchableOpacity className='w-[200px] m-3 p-4 bg-blue-600' onPress={handleSubmit}>
        <Text className='text-white'>Submit</Text>
    </TouchableOpacity>
        {/* Use Flatlist instead for reliability */}
         <FlatList
            data={getTask}
            keyExtractor={(task) => task.id.toString()}
            renderItem={({item}) => (
                <View className='bg-slate-700 p-4 m-4'>
                    <Text className='text-white'>{item.title}</Text>
                    <Text className='text-white'>{item.description}</Text>
                    <Image className="h-20 w-20" src={item.image_url}/>


                    <Text className='text-white'>Update Description</Text>
                    <TextInput 
                    className='w-[200px] m-4 p-4 bg-slate-100'
                    placeholder='Description'
                    value={updateDesc}
                    onChangeText={setUpdateDesc}
                    />

                    <Video source={{ uri: item.video_url }} controls/>

                    <TouchableOpacity className='w-[200px] m-3 p-4 bg-yellow-600' onPress={() => updateTask(item.id)}>
                        <Text className='text-white'>Update</Text>
                    </TouchableOpacity>


                    <TouchableOpacity className='w-[200px] m-3 p-4 bg-red-600' onPress={() => deleteTask(item.id)}>
                        <Text className='text-white'>Delete</Text>
                    </TouchableOpacity>
                </View>
            )}
            />

    </View>
  )
}