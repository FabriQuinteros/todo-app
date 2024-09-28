import { Box, Button, Modal, TextField } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import React, { useEffect, useState } from "react";

export const AddListModal = ({
  open,
  onClose,
  onSave,
  onEdit,
  isEditMode,
  listToEdit,
}) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (isEditMode && listToEdit) {
      setName(listToEdit.name);
      setColor(listToEdit.color);
    } else {
      setName("");
      setColor("");
    }
  }, [isEditMode, listToEdit]);

  const handleSave = () => {
    if (name.trim() === "") {
      alert("El nombre de la lista no puede estar vacío.");
      return;
    }

    if (
      !/^rgba?\(\d{1,3}, \d{1,3}, \d{1,3}(, \d(\.\d{1,2})?)?\)$/.test(color)
    ) {
      alert("El color no es válido.");
      return;
    }
    if (isEditMode) {
      onEdit(listToEdit.id, name, color);
    } else {
      onSave({ name, color });
    }
    onClose();
    setName("");
    setColor("");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "95%",
          maxWidth: "400px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <TextField
          fullWidth
          label="Nombre de la lista"
          value={name}
          onChange={(e) => {
            if (e.target.value.length <= 25) {
              setName(e.target.value);
            }
          }}
          margin="normal"
        />
        <MuiColorInput
          label="Color"
          placeholder="Color"
          value={color}
          onChange={(value) => setColor(value)}
          fullWidth
          style={{ marginTop: "16px" }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSave}
          style={{ marginTop: "16px" }}
        >
          {isEditMode ? "Guardar Cambios" : "Agregar"}
        </Button>
      </Box>
    </Modal>
  );
};
