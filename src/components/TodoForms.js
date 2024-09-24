import AddIcon from "@mui/icons-material/Add";
import { Grid2 } from "@mui/material";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";

export const TodoForm = ({ addTodo, editItem }) => {
  const [name, setName] = useState("");
  const [prevName, setPrevName] = useState("");

  const [quantity, setQuantity] = useState("");
  const [prevQuantity, setPrevQuantity] = useState("");

  useEffect(() => {
    if (editItem) {
      setPrevName(name);
      setName(editItem.name || "");

      setPrevQuantity(quantity);
      setQuantity(editItem.quantity || 1);
    }
  }, [editItem]);

  const handleChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]+(,[0-9]*)?$/;
    if (regex.test(value) || value === "") {
      setQuantity(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addTodo(name, quantity)) {
      setName(prevName);
      setPrevName("");

      setQuantity(prevQuantity);
      setPrevQuantity("");
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid2
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <form className="TodoForm" onSubmit={handleSubmit}>
            <Grid2
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid2 xs={8} container spacing={2}>
                <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="outlined-basic"
                  label={editItem ? "Editar item" : "Nuevo item"}
                  variant="outlined"
                />
                <TextField
                  value={quantity}
                  onChange={handleChange}
                  id="outlined-basic"
                  label={editItem ? "Cantidad" : "Cantidad"}
                  variant="outlined"
                  error={quantity < 0 ? true : false}
                  helperText={quantity < 0 && "Solo números positivos"}
                />
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
