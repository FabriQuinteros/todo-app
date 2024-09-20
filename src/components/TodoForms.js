import AddIcon from '@mui/icons-material/Add';
import { Grid2 } from "@mui/material";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from "react";

export const TodoForm = ({ addTodo, editItem }) => {

    const [value, setValue] = useState("");
    const [prevValue, setPrevValue] = useState("");

    useEffect(() => {
        if (editItem) {
            setPrevValue(value);
            setValue(editItem.name);
        }
    }, [editItem]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (addTodo(value)) {
            setValue(prevValue);
            setPrevValue("");
        }
    };

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid2 container spacing={2} justifyContent="center" alignItems="center">
                    <form className="TodoForm" onSubmit={handleSubmit}>
                        <Grid2 container spacing={2} justifyContent="center" alignItems="center">
                            <Grid2 xs={8}>
                                <TextField value={value} onChange={(e) => setValue(e.target.value)} id="outlined-basic" label={editItem ? "Editar item" : "Nuevo item"} variant="outlined" fullWidth />
                            </Grid2>
                            <Grid2 xs={2}>
                                <Fab color="primary" aria-label="add" onClick={handleSubmit}>
                                    <AddIcon />
                                </Fab>
                            </Grid2>
                        </Grid2>
                    </form>
                </Grid2>
            </Box>
        </div>
    );
};