// client/src/pages/BoardPage.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';
import { listTasks, createTask, updateTask, deleteTask, reorderTask } from '../api/tasks.js';
import { socket } from '../sockets/socket.js';
import Board from '../components/Board.jsx';
import FeedbackSnackbar from '../components/FeedbackSnackbar.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import {  AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

export default function BoardPage() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [confirm, setConfirm] = useState({ open: false, taskId: null });

  const isAdmin = user.role === 'admin';

  useEffect(() => {
    listTasks().then(setTasks);
  }, []);

  useEffect(() => {
    const onCreate = (t) => setTasks(prev => [...prev, t]);
    const onUpdate = (t) => setTasks(prev => prev.map(x => x.id === t.id ? t : x));
    const onDelete = ({ id }) => setTasks(prev => prev.filter(x => x.id !== id));
    const onReorder = ({ status, tasks: columnTasks }) =>
      setTasks(prev => {
        const others = prev.filter(x => x.status !== status);
        return [...others, ...columnTasks];
      });

    socket.on('task:create', onCreate);
    socket.on('task:update', onUpdate);
    socket.on('task:delete', onDelete);
    socket.on('task:reorder', onReorder);
    return () => {
      socket.off('task:create', onCreate);
      socket.off('task:update', onUpdate);
      socket.off('task:delete', onDelete);
      socket.off('task:reorder', onReorder);
    };
  }, []);

  const grouped = useMemo(() => {
    const map = { 'To Do': [], 'In Progress': [], 'Done': [] };
    tasks.sort((a, b) => a.position - b.position).forEach(t => map[t.status].push(t));
    return map;
  }, [tasks]);

  const canEdit = (t) => isAdmin || t.createdBy.id === user.id;

const onDragEnd = async (result) => {
  const { destination, source, draggableId } = result;

  // 1. Exit if the user dropped outside of a valid droppable area
  if (!destination) return;

  // 2. Do nothing if the item was dropped in the same place
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  const task = tasks.find(t => String(t.id) === draggableId);

  // 3. Check for permissions
  if (!task || !canEdit(task)) {
    setSnackbar({ open: true, message: 'You do not have permission to move this task', severity: 'error' });
    return;
  }

  // 4. Optimistic State Update for immediate feedback
  const originalTasks = [...tasks]; // Keep a copy to revert on API failure
  
  const updatedTasks = Array.from(tasks);
  const [movedTask] = updatedTasks.splice(source.index, 1);
  movedTask.status = destination.droppableId; // Update the status
  updatedTasks.splice(destination.index, 0, movedTask);

  setTasks(updatedTasks); // Update the state immediately

  // 5. Make the API call to persist the change
  try {
    await reorderTask({
      taskId: draggableId,
      toStatus: destination.droppableId,
      toIndex: destination.index
    });
    // The success snackbar can be removed if the optimistic update is sufficient feedback
    setSnackbar({ open: true, message: 'Task moved successfully', severity: 'success' });
  } catch (e) {
    // 6. Revert the state if the API call fails
    setTasks(originalTasks);
    setSnackbar({ open: true, message: e.response?.data?.message || 'Move failed', severity: 'error' });
  }
};

  const handleCreate = async (title) => {
    try {
      await createTask({ title, status: 'To Do' });
      setSnackbar({ open: true, message: 'Task created', severity: 'success' });
    } catch (e) {
      setSnackbar({ open: true, message: e.response?.data?.message || 'Create failed', severity: 'error' });
    }
  };

  const handleUpdate = async (id, payload) => {
    try {
      await updateTask(id, payload);
      setSnackbar({ open: true, message: 'Task updated', severity: 'success' });
    } catch (e) {
      setSnackbar({ open: true, message: e.response?.data?.message || 'Update failed', severity: 'error' });
    }
  };

  const handleDelete = (id) => {
    setConfirm({ open: true, taskId: id });
  };

  const confirmDelete = async () => {
    try {
      await deleteTask(confirm.taskId);
      setSnackbar({ open: true, message: 'Task deleted', severity: 'success' });
    } catch (e) {
      setSnackbar({ open: true, message: e.response?.data?.message || 'Delete failed', severity: 'error' });
    } finally {
      setConfirm({ open: false, taskId: null });
    }
  };

  return (
    <>
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6f8' }}>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Task Board</Typography>
          <div>
            <Typography variant="body1" component="span" sx={{ mr: 2 }}>
              {user.name} ({user.role})
            </Typography>
            <Button color="inherit" onClick={logout}>Logout</Button>
          </div>
        </Toolbar>
        </Container>
      </AppBar>
     <Container maxWidth="xl" sx={{ py: 3 }}>
      <Board
        grouped={grouped}
        canEdit={canEdit}
        onDragEnd={onDragEnd}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      </Container>
      <FeedbackSnackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />

      <ConfirmDialog
        open={confirm.open}
        onClose={() => setConfirm({ open: false, taskId: null })}
        onConfirm={confirmDelete}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
      />
      </Box>
    </>
  );
}
