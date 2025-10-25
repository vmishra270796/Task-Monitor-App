import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,Box
} from "@mui/material";
import AuditDialog from "./AuditDialog.jsx";
export default function TaskCard({ task, index, canEdit, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [showHistory, setShowHistory] = useState(false);
  const save = () => {
    onUpdate(task.id, { title });
    setEditing(false);
  };

  return (
    <>
      <Draggable
        draggableId={String(task.id)}
        index={index}
        isDragDisabled={!canEdit}
      >
        {(provided) => (
          <Card
            variant="outlined"
            sx={{ mb: 1 }}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <CardContent>
              {editing ? (
                <TextField
                  fullWidth
                  size="small"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              ) : (
                <Typography variant="h6">{task.title}</Typography>
              )}
              <Typography variant="body2" color="text.secondary">
                By: {task.createdBy.name} ({task.createdBy.role})
              </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', px: 2, pt: 0, pb: 1.5 }}>
              <Box>
              {canEdit ? (
                editing ? (
                  <>
                    <Button size="small" onClick={save}>
                      Save
                    </Button>
                    <Button size="small" onClick={() => setEditing(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="small" onClick={() => setEditing(true)}>
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => onDelete(task.id)}
                    >
                      Delete
                    </Button>
                  </>
                )
              ) : (
                <Typography variant="caption" color="text.secondary">
                  Read-only
                </Typography>
              )}
              </Box>
               <Button size="small" onClick={() => setShowHistory(true)}>
                History
              </Button>
            </CardActions>
            <AuditDialog
              open={showHistory}
              onClose={() => setShowHistory(false)}
              taskId={task.id}
            />
          </Card>
        )}
      </Draggable>
      
    </>
  );
}
