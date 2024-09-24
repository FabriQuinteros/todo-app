import React, { useEffect, useState } from "react";
import { v4 as uuiv4 } from "uuid";
import { TodoTable } from "./Table";
import { TodoForm } from "./TodoForms";

export const ItemHandler = ({ listId, updateIncompleteCount }) => {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem(`todos-${listId}`);
        // Ex item: { id: uuiv4(), name: "Primer todo", isComplete: false , quantity: 1}
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [editItem, setEditItem] = useState(null);

    useEffect(() => {
        const savedTodos = localStorage.getItem(`todos-${listId}`);
        setTodos(savedTodos ? JSON.parse(savedTodos) : []);
    }, [listId]);

    useEffect(() => {
        localStorage.setItem(`todos-${listId}`, JSON.stringify(todos));
    }, [todos, listId]);

    useEffect(() => {
        localStorage.setItem(`todos-${listId}`, JSON.stringify(todos));
        updateIncompleteCount(listId, todos.filter(todo => !todo.isComplete).length);
    }, [todos, listId, updateIncompleteCount]);

    const addTodo = (text, quantity) => {
        if (!text || /^\s*$/.test(text) || isNaN(quantity) || quantity < 0) {
            return false;
        }
        setTodos([{ id: uuiv4(), name: text, isComplete: false, quantity }, ...todos]);
        setEditItem(null);
        return true;
    }

    const completeTodo = id => {
        let updatedTodos = todos.map(item => {
            if (item.id === id) {
                item.isComplete = !item.isComplete;
            }
            return item;
        });
        updatedTodos.sort((a, b) => a.isComplete - b.isComplete);
        setTodos(updatedTodos);
    }

    const removeTodo = id => {
        let updatedTodos = todos.filter(item => {
            return (item.id !== id)
        });
        setTodos(updatedTodos);
    }

    const editTodo = id => {
        const itemToEdit = todos.find(item => item.id === id);
        setEditItem(itemToEdit);
        removeTodo(id);
    }

    return (
        <>
            <TodoForm addTodo={addTodo} editItem={editItem} />
            <TodoTable todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} editTodo={editTodo} />
        </>
    );
};