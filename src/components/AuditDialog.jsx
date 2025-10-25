import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import { getTaskHistory } from "../api/tasks.js";

export default function AuditDialog({ open, onClose, taskId }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (open && taskId) {
      getTaskHistory(taskId).then(setLogs);
    }
  }, [open, taskId]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Task History</DialogTitle>
      <DialogContent dividers>
        {logs.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No history yet.
          </Typography>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Action</TableCell>
                <TableCell>Actor</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell>Changes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log._id}>
                  <TableCell>{log.action.toUpperCase()}</TableCell>
                  <TableCell>{log.actor?.name}</TableCell>
                  <TableCell>{log.actor?.role}</TableCell>
                  <TableCell>
                    {new Date(log.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {log.changes
                      ? Object.entries(log.changes).map(([field, val]) => (
                          <div key={field}>
                            <strong>{field}:</strong>{" "}
                            {val.before !== null ? String(val.before) : "—"} →{" "}
                            {val.after !== null ? String(val.after) : "—"}
                          </div>
                        ))
                      : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DialogContent>
    </Dialog>
  );
}
