"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase-client'

interface Task {
    id: number;
    title: string;
    description: string;
    created_at: string;
}

export default function CampaignPage() {
    const [ newTask, setNewTask ] = useState({title: "", description: ""})
    const [tasks, setTasks] = useState<Task[]>([])

    const fetchTasks = async () =>{
        const { error, data } = await supabase.from("tasks").select("*").order("created_at", {ascending: true})

        if (error) {
            console.error("Error reading newTasks", error.message);
            return;
        }

        setTasks(data)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const {error} = await supabase.from("tasks").insert(newTask).single()

        if (error) {
            console.error("Error adding task", error.message);
        }

        setNewTask({title: "", description: ""})
    }

    const handleEdit = async () => {

    }

    const handleDelete = async () => {

    }

    useEffect(() => {
        fetchTasks();
    }, []);

    return(
        <div>
            <h2>Crud</h2>
            <form className="mb-1" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Task Title"
                    className="w-full mb-0.5 p-0.5"
                    onChange={(e) => {
                        setNewTask((prev) => ({...prev, title: e.target.value}))
                    }}
                />
                <textarea 
                    placeholder="Task Description" 
                    className="w-full mb-0.5 p-0.5"
                    onChange={(e) => setNewTask((prev) => ({...prev, description: e.target.value}))}
                ></textarea>
                <button type="submit" className="px-0.5 py-1">
                    Add Task
                </button>
            </form>

            <ul>
                {tasks.map((task, key) => <li>
                    <div className='p-1 border-2 border-red-600'>
                        <h1>{task.title}</h1>
                        <p>{task.description}</p>
                    </div>
                    </li>)}
            </ul>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )
};