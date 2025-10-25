import React, { useState } from 'react';
import { Grid, TextField, Button, Box,Paper,Typography } from '@mui/material';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column.jsx';

export default function Board({ grouped, canEdit, onDragEnd, onCreate, onUpdate, onDelete }) {
  const [newTitle, setNewTitle] = useState('');

  return (
    <>
    <Paper elevation={2} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Add a New Task</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="New Task"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          size="small"
        />
        <Button
          variant="contained"
          onClick={() => {
            if (newTitle.trim()) {
              onCreate(newTitle.trim());
              setNewTitle('');
            }
          }}
          sx={{ flexShrink: 0 }}
        >
          Add Task
        </Button>
      </Box>
      </Paper>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={3}>
          {['To Do', 'In Progress', 'Done'].map((status) => (
            <Grid item xs={12} md={4} key={status}>
              <Column
                status={status}
                tasks={grouped[status]}
                canEdit={canEdit}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </>
  );
}
