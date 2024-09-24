import { Box, IconButton, Tab, Tabs } from "@mui/material";
import Badge from "@mui/material/Badge";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ItemHandler } from "./ItemHandler";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Toolbar, Typography } from "@mui/material";

import { AddListModal } from "./AddListModal";
import { DeleteListModal } from "./DeleteListModal";

export const ListManager = () => {
  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem("lists");
    // Ex item: { id: uuidv4(), name: "Primer lista", color: "#ffffff" }
    return savedLists ? JSON.parse(savedLists) : [];
  });

  const [collapsed, setCollapsed] = useState(false);
  const [currentListId, setCurrentListId] = useState(lists[0]?.id);
  const [addListModalOpen, setAddListModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [listToEdit, setListToEdit] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const getIncompleteTodosCount = (listId) => {
    const savedTodos = localStorage.getItem(`todos-${listId}`);
    const todos = savedTodos ? JSON.parse(savedTodos) : [];
    return todos.filter((todo) => !todo.isComplete).length;
  };

  const [incompleteCounts, setIncompleteCounts] = useState(() => {
    const counts = {};
    lists.forEach((list) => {
      counts[list.id] = getIncompleteTodosCount(list.id);
    });
    return counts;
  });

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  const addList = ({ name, color }) => {
    const newList = { id: uuidv4(), name: name, color: color };
    setLists([...lists, newList]);
    setCurrentListId(newList.id);
  };

  const deleteList = () => {
    const updatedLists = lists.filter((list) => list.id !== currentListId);
    setLists(updatedLists);
    const updatedCounts = { ...incompleteCounts };
    delete updatedCounts[currentListId];
    setIncompleteCounts(updatedCounts);
    localStorage.setItem("lists", JSON.stringify(updatedLists));
    localStorage.removeItem(`todos-${currentListId}`);
    if (updatedLists.length > 0) {
      setCurrentListId(updatedLists[0].id);
    } else {
      setCurrentListId(null);
    }
    setDeleteModalOpen(false);
  };

  const openEditListModal = (list) => {
    setIsEditMode(true);
    setListToEdit(list);
    setAddListModalOpen(true);
  };

  useEffect(() => {
    if (!addListModalOpen) {
      setIsEditMode(false);
    }
  }, [addListModalOpen]);

  const editList = (id, name, color) => {
    const updatedLists = lists.map((list) => {
      if (list.id === id) {
        list.name = name;
        list.color = color;
      }
      return list;
    });
    setLists(updatedLists);
    localStorage.setItem("lists", JSON.stringify(updatedLists));
    setIsEditMode(false);
  };

  const getTextColor = (backgroundColor) => {
    const rgbValues = backgroundColor
      .replace("rgb(", "")
      .replace(")", "")
      .split(",")
      .map(Number);

    const [r, g, b] = rgbValues;

    const toLinear = (value) => {
      value /= 255;
      return value <= 0.03928
        ? value / 12.92
        : Math.pow((value + 0.055) / 1.055, 2.4);
    };

    const rLinear = toLinear(r);
    const gLinear = toLinear(g);
    const bLinear = toLinear(b);
    const luma = 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;

    return luma > 0.179 ? "black" : "white";
  };

  const updateIncompleteCount = (listId, count) => {
    setIncompleteCounts({ ...incompleteCounts, [listId]: count });
  };

  return (
    <>
      <AppBar position="static" style={{ marginBottom: "20px" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setCollapsed(!collapsed)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            {lists.length < 1 ? "Agregue una lista para comenzar" : "Listas"}
          </Typography>
          {currentListId && (
            <IconButton
              color="inherit"
              onClick={() => setDeleteModalOpen(true)}
              style={{ marginRight: "20px" }}
            >
              <DeleteIcon />
            </IconButton>
          )}
          {currentListId && (
            <IconButton
              color="inherit"
              onClick={() =>
                openEditListModal(
                  lists.find((list) => list.id === currentListId)
                )
              }
              style={{ marginRight: "20px" }}
            >
              <EditIcon />
            </IconButton>
          )}
          <IconButton color="inherit" onClick={() => setAddListModalOpen(true)}>
            <AddIcon />
          </IconButton>
        </Toolbar>
        {!collapsed && lists.length > 0 && (
          <Tabs
            value={currentListId}
            onChange={(e, newValue) => setCurrentListId(newValue)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {lists.map((list) => (
              <Tab
                key={list.id}
                label={
                  <Box display="flex" alignItems="center">
                    <span style={{ marginRight: "15px" }}>{list.name}</span>
                    <Badge
                      badgeContent={incompleteCounts[list.id]}
                      color="success"
                    />
                  </Box>
                }
                value={list.id}
                style={{
                  backgroundColor:
                    list.id === currentListId ? list.color : "#f0f0f0",
                  color:
                    list.id === currentListId
                      ? getTextColor(list.color)
                      : "black",
                  marginLeft: "5px",
                  borderRadius: list.id === currentListId ? "3px" : "20px",
                  transition: "all 0.3s ease-in-out",
                  textTransform: "none",
                }}
              />
            ))}
          </Tabs>
        )}
      </AppBar>
      {currentListId && (
        <ItemHandler
          listId={currentListId}
          updateIncompleteCount={updateIncompleteCount}
        />
      )}

      <AddListModal
        open={addListModalOpen}
        onClose={() => setAddListModalOpen(false)}
        onSave={addList}
        onEdit={editList}
        isEditMode={isEditMode}
        listToEdit={listToEdit}
      />
      <DeleteListModal
        lists={lists}
        deleteList={deleteList}
        incompleteCounts={incompleteCounts[currentListId]}
        currentListId={currentListId}
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      />
    </>
  );
};
