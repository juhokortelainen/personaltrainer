import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import dayjs from "dayjs";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";

function AddTraining(props) {
  const emptyTraingingState = {
    date: "",
    duration: "",
    activity: "",
    customer: "",
  };

  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState(emptyTraingingState);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
    setTraining({
      date: selectedDate,
      duration: "",
      activity: "",
      customer: props.customer.data.links[0].href,
    });
  };

  const handleClose = () => {
    setOpen(false);
    setTraining(emptyTraingingState);
  };

  const handleSave = () => {
    props.addTraining(training);
    handleClose();
    setTraining(emptyTraingingState);
  };

  const inputChanged = (event) => {
    setTraining({ ...training, [event.target.name]: event.target.value });
  };

  const dateChanged = (date) => {
    setSelectedDate(date);
    setTraining({ ...training, date });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          New training for{" "}
          {props.customer.data.firstname + " " + props.customer.data.lastname}
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            locale={dayjs.locale("en-gb")}
          >
            <DateTimePicker
              name="date"
              value={training.date}
              onChange={(date) => dateChanged(date)}
              margin="dense"
              label="Date and time"
              fullWidth
              variant="standard"
              renderInput={(props) => <TextField {...props} />}
            />
          </LocalizationProvider>
          <TextField
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            margin="dense"
            label="Duration"
            fullWidth
            variant="standard"
          />
          <TextField
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            margin="dense"
            label="Activity"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTraining;
