import { Box, Button, Modal, TextField } from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import React, { useState } from 'react';


export const AddListModal = ({ open = false, onClose = () => { }, onSave = () => { } }) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#ffffff');

    const handleSave = () => {
        if (name.trim() === '') {
            alert('El nombre de la lista no puede estar vacío.');
            return;
        }
        onSave({ name, color });
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4
            }}>
                <TextField
                    fullWidth
                    label="Nombre de la lista"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    margin="normal"
                />
                <MuiColorInput
                    value={color}
                    onChange={(value) => setColor(value)}
                    fullWidth
                    style={{ marginTop: '16px' }}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    style={{ marginTop: '16px' }}
                >
                    Guardar
                </Button>
            </Box>
        </Modal>
    );
};
