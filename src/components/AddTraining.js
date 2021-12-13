import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import dayjs from 'dayjs';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';


function AddTraining(props) {
    const [open, setOpen] = React.useState(false);
    const [time, setTime] = React.useState()
    const [training, setTraining] = React.useState({date: '', activity: '', duration: '', customer: props.customer.data.links[0].href});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addTraining(training);
        console.log(training)
        handleClose();
    }

    const inputChanged = event => {
        setTraining({...training, [event.target.name]: event.target.value})
    }

    const timeChanged = time => {
        const date = dayjs(time).toISOString()
        setTime(date)
        setTraining({...training, date})
    }

    return(
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker 
                            value={time} 
                            onChange={timeChanged} 
                            margin="dense"
                            fullWidth
                            variant="standard"
                            />
                    </MuiPickersUtilsProvider>
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={inputChanged}
                        label="Duration"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
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
    )
}

export default AddTraining;