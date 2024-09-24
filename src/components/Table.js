import { Delete, Edit } from '@mui/icons-material';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

export const TodoTable = ({ todos, completeTodo, removeTodo, editTodo }) => {
    return (
        <TableContainer component={Paper} style={{ width: '90%', margin: 'auto', marginTop: '20px' }}>
            <Table style={{ tableLayout: 'fixed' }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Cantidad</TableCell>
                        <TableCell>Producto</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {todos.map((item) => (
                        <TableRow key={item.id} style={{ backgroundColor: item.isComplete ? '#f0f0f0' : '#fff' }}>
                            <TableCell onClick={() => completeTodo(item.id)} style={{ cursor: 'pointer', wordWrap: 'break-word', whiteSpace: 'normal' }}>
                                <span >
                                    {item.quantity || 1}
                                </span>
                            </TableCell>
                            <TableCell onClick={() => completeTodo(item.id)} style={{ cursor: 'pointer', wordWrap: 'break-word', whiteSpace: 'normal' }}>
                                <span style={{ textDecoration: item.isComplete ? 'line-through' : 'none' }}>
                                    {item.name}
                                </span>
                            </TableCell>
                            <TableCell style={{ whiteSpace: 'nowrap' }}>
                                <Button
                                    onClick={() => editTodo(item.id)}
                                    disabled={item.isComplete}
                                    variant="outlined"
                                    style={{ marginRight: '10px' }}
                                >
                                    <Edit />
                                </Button>
                                <Button
                                    onClick={() => removeTodo(item.id)}
                                    disabled={item.isComplete}
                                    variant="outlined"
                                    color="error"
                                >
                                    <Delete />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
