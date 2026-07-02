import React, { createContext, useContext, useState } from "react";
import { View, Text, Button } from "react-native";

// Define the Task type and the context value type
type Task = {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
};
// Define the context value type
type TaskContextType = {
    tasks: Task[];
    addTask: (task: Task) => void;
    removeTask: (taskId: string) => void;
    toggleTaskCompletion: (taskId: string) => void;
    loadTasks: (task: Task) => void;
};


const TaskContext = createContext<TaskContextType | null>(null);
// TaskProvider component to wrap the app and provide task context
export function TaskProvider({ children}: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = (task: Task) => {
        setTasks((prevTasks) => [...prevTasks, task]); 
    }
    const removeTask = (taskId: string) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }
    
    const toggleTaskCompletion = (taskId: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };
    
    const loadTasks = (task: Task) => { 
        setTasks((prevTasks) => [...prevTasks, task]);
    }

    return ( 
        <TaskContext.Provider value ={{ tasks, addTask, removeTask, toggleTaskCompletion, loadTasks }}>
            {children}
        </TaskContext.Provider>
    );
}
// Custom hook to use the TaskContext
export function useTaskContext() {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
}
