import React, {useState} from 'react';
import moment from 'moment';
import {Box, Button, Modal, TextField, Typography} from '@mui/material';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import { Row, Col } from 'react-bootstrap';
import EditNote from './EditNote'

function AddNote({data, getNotes}) {
    // console.log(data)

    const [notes, setNotes] = useState({})

    const noteChangeHandler = (e) => {
        setNotes({...notes, [e.target.name]: e.target.value})
        // setNotes(e.target.value)
    }
    // console.log(notes)

    const noteSubmitHandler = () => {
        fetch('https://yohji-project.herokuapp.com/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(notes)
        })
        .then(res => res.json() )
        .then(data => {
            setNotes(data)
            getNotes()
            handleClose()
        })
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 24,
        p: 4,
    };

    const currentDate = (moment(moment.now()).format("DD/MM/YYYY"))
    var note = []
    for (var i = 0; i < data.length; i++) {
        if (data[i].date === currentDate) {
            note.push(data[i])
        }
    }
    // console.log(note)

    return (
        <div className='notes'>
             {
                !data ? 
                    <>
                    <div>
                        <Row className='icon'>
                            <Button onClick={handleOpen}> <BorderColorRoundedIcon /> </Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                            >
                                <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    How's Your Day?
                                </Typography>
                                <form method='POST'>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                                        <TextField
                                            id="standard-textarea"
                                            label="Enter Notes herer"
                                            multiline
                                            variant="standard"
                                            name='notes'
                                            onChange={noteChangeHandler}
                                        />
                                    </Typography>
                                    <Button variant="outlined" onClick={noteSubmitHandler}> Post </Button>
                                </form>
                                </Box>
                            </Modal>
                        </Row>
                        <h1 className='noteText'>Write some notes down... </h1>
                    </div>
                    </>
                :
                    <>
                    <div>
                        <Row className='icon'>
                            <Button onClick={handleOpen}> <BorderColorRoundedIcon /> &nbsp; Write Note </Button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                            >
                                <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    How's Your Day?
                                </Typography>
                                <form method='POST'>
                                    <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                                        <TextField
                                        id="standard-multiline-static"
                                        label="Enter Notes Here"
                                        rows={4}
                                        variant="standard"
                                        multiline
                                        name="notes"
                                        onChange={noteChangeHandler}
                                        /> 
                                    </Typography>
                                    <Button variant="outlined" onClick={noteSubmitHandler} > Post </Button>
                                </form>
                                </Box>
                            </Modal>
                        </Row>

                        <hr/>

                        <div>
                            <Row className='noteContainer'>
                                { 
                                    note.map(item => 
                                        <Row key={item._id} >
                                            <div className='noteHeader'>
                                                <b>
                                                    <p align="left">
                                                    {item.date}
                                                    &nbsp; &nbsp; &nbsp;
                                                    <span>{item.time}</span>
                                                    <span> 
                                                        <EditNote data={data} getNotes={getNotes} noteId={item._id} />
                                                    </span>
                                                    {/* <span> <Button variant="text" color="error"> Delete </Button> </span> */}
                                                    </p>
                                                </b>

                                            </div>

                                            <Col>
                                                <p className='noteText'> {item.notes} </p>
                                            </Col>
                                        </Row>
                                    )
                                }
                            </Row>
                        </div>
                    </div>
                    </>
                }
        </div>
    );
}

export default AddNote;