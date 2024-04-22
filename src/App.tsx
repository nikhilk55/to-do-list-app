import React from 'react';
import './App.css';
import TodoList from './components/TodoList'; // Importing the TodoList component
import AuthWrapper from './components/AuthWrapper';



function App() {
  return (
    <div className="App">
      <header className="App-header">
      <AuthWrapper>
        <h1>Welcome to Nikhil's Todo App</h1>
        <p>Start adding your tasks!</p>
        <TodoList />
         {}
      </AuthWrapper>
      </header>
    </div>
  );
}

export default App;
