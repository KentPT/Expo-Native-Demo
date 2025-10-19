import { View, Text, TextInput, Button, TouchableOpacity, Alert, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { supabase } from '@/services/supabase'

interface Task {
    id: number
    title: string
    description: string
}

export default function task() {
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [getTask, setGetTask] = useState<Task[]>([]);

    const handleSubmit = async () => {

        const { error } = await supabase
                    .from('tasks')
                    .insert({title: newTitle, description: newDesc})
                    .single()

        if (error) {
            Alert.alert("Error Inserting Data to Supabase")
            return;
        } else {
            Alert.alert("Successful Send")
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

        {/* {getTask.map((task, key) => (
            // <View className="bg-lime-200 p-4 m-4"key={key}>
            //     <Text className='text-black'>{task.title}</Text>
            //     <Text className='text-black'>{task.description}</Text>
            // </View>
            
        ))} */}


        {/* Use Flatlist instead for reliability */}
         <FlatList
            data={getTask}
            keyExtractor={(task) => task.id.toString()}
            renderItem={({item}) => (
                <View className='bg-slate-700 p-4 m-4'>
                    <Text className='text-white'>{item.title}</Text>
                    <Text className='text-white'>{item.description}</Text>
                </View>
            )}
            />

    </View>
  )
}