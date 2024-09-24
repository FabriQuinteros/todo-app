import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import React from "react";

import { Typography } from "@mui/material";

export const DeleteListModal = ({
  lists,
  deleteList,
  incompleteCounts,
  currentListId,
  open,
  onClose,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <Box
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          width: 400,
          backgroundColor: "white",
          padding: "16px",
          boxShadow: 24,
        }}
      >
        <Typography
          id="delete-modal-title"
          variant="h6"
          component="h2"
          style={{
            color: "black",
          }}
        >
          ¿Estás seguro que quieres eliminar la lista "
          {lists.find((list) => list.id === currentListId)?.name}"?
        </Typography>
        <Typography
          id="delete-modal-description"
          variant="body1"
          component="p"
          style={{ marginTop: "8px" }}
        >
          Elementos por completar: {incompleteCounts}
        </Typography>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={onClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={deleteList} color="secondary">
            Eliminar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
