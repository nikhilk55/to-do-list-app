import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import TodoItem from './TodoItem';
import { db } from '../services/firebase'; 
import { addDoc, collection, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { logout } from '../auth/auth'; 
import { auth } from '../services/firebase';

const TodoList: React.FC = () => {
  interface Todo {
    id: string;
    task: string;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        setTodos([]);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      if (!userId) return;

      try {
        const querySnapshot = await getDocs(collection(db, `users/${userId}/todos`));
        const fetchedTodos: Todo[] = [];
        querySnapshot.forEach((doc) => {
          fetchedTodos.push({ id: doc.id, task: doc.data().task } as Todo);
        });
        setTodos(fetchedTodos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [userId]);

  const addTodo = async () => {
    if (!userId) return;

    if (newTask.trim() !== '') {
      try {
        const docRef = await addDoc(collection(db, `users/${userId}/todos`), {
          task: newTask.trim(),
        });

        const newTodo: Todo = {
          id: docRef.id,
          task: newTask.trim(),
        };

        setTodos([...todos, newTodo]);
        setNewTask('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const deleteTodo = async (id: string) => {
    if (!userId) return;

    try {
      await deleteDoc(doc(db, `users/${userId}/todos`, id));
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const editTodo = async (id: string, newTask: string) => {
    if (!userId) return;

    try {
      const todoRef = doc(db, `users/${userId}/todos`, id);
      await updateDoc(todoRef, { task: newTask });
      setTodos(todos.map(todo => todo.id === id ? { ...todo, task: newTask } : todo));
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const searchTasks = () => {
    const query = searchQuery.toLowerCase().trim();
    const filteredTasks = todos.filter(todo => todo.task.toLowerCase().includes(query));
    setTodos(filteredTasks);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '16px' }}>
        <Button type="primary" onClick={logout}>Logout</Button>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <Input 
          placeholder="Enter task description"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ marginRight: '8px' }}
        />
        <Button type="primary" onClick={addTodo}>Add Todo</Button>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <Input 
          placeholder="Search tasks"
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ width: '200px', marginRight: '8px' }}
        />
        <Button type="primary" onClick={searchTasks}>Search</Button>
      </div>
      <table>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id}>
              <td>
                <TodoItem 
                  todo={todo} 
                  onDelete={() => deleteTodo(todo.id)} 
                  onEdit={(newTask: string) => editTodo(todo.id, newTask)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
