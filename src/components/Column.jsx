import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Paper, Typography } from '@mui/material';
import TaskCard from './TaskCard.jsx';

export default function Column({ status, tasks, canEdit, onUpdate, onDelete }) {
  return (
    <Paper elevation={3} sx={{ p: 2, minHeight: 400 }}>
      <Typography variant="h6" gutterBottom>{status}</Typography>
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
        p: 2,
        height: '100%',
        backgroundColor: '#edf2f7', // A light, cool gray background
      }}
          >
            {tasks.map((t, idx) => (
              <TaskCard
                key={t.id}
                task={t}
                index={idx}
                canEdit={canEdit(t)}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Paper>
  );
}
