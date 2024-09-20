import { Box, IconButton, Tab, Tabs } from "@mui/material";
import Badge from '@mui/material/Badge';
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ItemHandler } from "./ItemHandler";

import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Typography } from '@mui/material';

import { AddListModal } from './AddListModal';

export const ListManager = () => {
    const [lists, setLists] = useState(() => {
        const savedLists = localStorage.getItem("lists");
        return savedLists ? JSON.parse(savedLists) : [{ id: uuidv4(), name: "Primer lista", color: "#ffffff" }];
    });

    const [collapsed, setCollapsed] = useState(false);
    const [currentListId, setCurrentListId] = useState(lists[0].id);
    const [addListModalOpen, setAddListModalOpen] = useState(false);

    const getIncompleteTodosCount = (listId) => {
        const savedTodos = localStorage.getItem(`todos-${listId}`);
        const todos = savedTodos ? JSON.parse(savedTodos) : [];
        return todos.filter(todo => !todo.isComplete).length;
    };

    const [incompleteCounts, setIncompleteCounts] = useState(() => {
        const counts = {};
        lists.forEach(list => {
            counts[list.id] = getIncompleteTodosCount(list.id);
        });
        return counts;
    });

    useEffect(() => {
        localStorage.setItem("lists", JSON.stringify(lists));
    }, [lists]);

    const addList = ({ name, color }) => {
        console.log(name, color);
        const newList = { id: uuidv4(), name: name, color: color };
        setLists([...lists, newList]);
        setCurrentListId(newList.id);
    };

    const getTextColor = (backgroundColor) => {
        const color = backgroundColor.substring(1);
        const rgb = parseInt(color, 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >> 8) & 0xff;
        const b = (rgb >> 0) & 0xff;
        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luma > 128 ? 'black' : 'white';
    };


    const updateIncompleteCount = (listId, count) => {
        setIncompleteCounts({ ...incompleteCounts, [listId]: count });
    };

    return (
        <>
            <AppBar position="static" style={{ marginBottom: '20px' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setCollapsed(!collapsed)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Mis Listas
                    </Typography>
                    <IconButton color="inherit" onClick={() => setAddListModalOpen(true)}>
                        <AddIcon />
                    </IconButton>
                </Toolbar>
                {!collapsed && (
                    <Tabs value={currentListId} onChange={(e, newValue) => setCurrentListId(newValue)} variant="scrollable" scrollButtons="auto">
                        {lists.map(list => (
                            <Tab
                                key={list.id}
                                label={
                                    <Box display="flex" alignItems="center">
                                        <span style={{ marginRight: '12px' }}>{list.name}</span>
                                        <Badge badgeContent={incompleteCounts[list.id]} color="success" />
                                    </Box>
                                }
                                value={list.id}
                                style={{
                                    backgroundColor: list.id === currentListId ? list.color : '#f0f0f0',
                                    color: list.id === currentListId ? getTextColor(list.color) : 'black',
                                    marginRight: '3px',
                                    borderRadius: list.id === currentListId ? '3px' : '20px',
                                    transition: 'all 0.3s ease-in-out'
                                }}
                            />
                        ))}
                    </Tabs>
                )}
            </AppBar>
            <ItemHandler listId={currentListId} updateIncompleteCount={updateIncompleteCount} />
            <AddListModal
                open={addListModalOpen}
                onClose={() => setAddListModalOpen(false)}
                onSave={addList}
            />
        </>
    );
};