import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function EditCustomer(props) {

  const emptyCustomerValues = {
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: ""
  }

  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState(emptyCustomerValues);

  const handleClickOpen = () => {
    setCustomer({
        firstname: props.customer.data.firstname,
        lastname: props.customer.data.lastname,
        streetaddress: props.customer.data.streetaddress,
        postcode: props.customer.data.postcode,
        city: props.customer.data.city,
        email: props.customer.data.email,
        phone: props.customer.data.phone
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
      props.updateCustomer(props.customer.value, customer);
      handleClose();
  }

  const inputChanged = (event) => {
      setCustomer({...customer, [event.target.name]: event.target.value});
  };

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
          <TextField
            name="firstname"
            value={customer.firstname}
            onChange={inputChanged}
            margin="dense"
            label="Firstname"
            fullWidth
            variant="standard"
          />
          <TextField
            name="lastname"
            value={customer.lastname}
            onChange={inputChanged}
            margin="dense"
            label="Lastname"
            fullWidth
            variant="standard"
          />
          <TextField
            name="streetaddress"
            value={customer.streetaddress}
            onChange={inputChanged}
            margin="dense"
            label="Streetaddress"
            fullWidth
            variant="standard"
          />
          <TextField
            name="postcode"
            value={customer.postcode}
            onChange={inputChanged}
            margin="dense"
            label="Postcode"
            fullWidth
            variant="standard"
          />
          <TextField
            name="city"
            value={customer.city}
            onChange={inputChanged}
            margin="dense"
            label="City"
            fullWidth
            variant="standard"
          />
          <TextField
            name="email"
            value={customer.email}
            onChange={inputChanged}
            margin="dense"
            label="Email"
            fullWidth
            variant="standard"
          />
          <TextField
            name="phone"
            value={customer.phone}
            onChange={inputChanged}
            margin="dense"
            label="Phone"
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

export default EditCustomer;
