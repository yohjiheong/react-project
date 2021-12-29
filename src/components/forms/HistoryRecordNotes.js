import React, {useState} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button} from '@mui/material';
import moment from 'moment'
import { Modal, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons'

import { Select } from 'antd';
const { Option } = Select;


function HistoryRecordNotes({data, getNotes}) {
    // console.log(data, getNotes)

    const currentDate = (moment(moment.now()).format("DD/MM/YYYY"))

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [id, setId] = useState({});
    const [edit, setEditing] = useState({});
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const showEditModal = (id) => {
        setId(id)
        setIsEditModalVisible(true);
    };

    const onChangeEditHandler = (e) => {
        setEditing({...edit, [e.target.name]: e.target.value})
    }
  
    const handleEditOk = () => {
        // console.log('https://yohji-project.herokuapp.com/notes/' + id)
        fetch('https://yohji-project.herokuapp.com/notes/' + id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(edit)
        })
        .then(res => res.json())
        .then(data => {
            setEditing(data)
            getNotes()
            setIsEditModalVisible(false)
            notification.open({
                message: 'Hooray!',
                description:
                  "Changes Commited!",
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            });;
        })
    };
  
    const handleEditCancel = () => {
      setIsEditModalVisible(false);
    };

    const showDeleteModal = (id) => {
        setId(id)
        setIsDeleteModalVisible(true);
    };
    
    const handleDeleteOk = () => {
        // alert(id)
        fetch('https://yohji-project.herokuapp.com/notes/' + id, {
            method: "DELETE",
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(data => {
            getNotes()
            setIsDeleteModalVisible(false);
        })
    };
    
    const handleDeleteCancel = () => {
        setIsDeleteModalVisible(false);
    };

    var date = []
    for(var i = 0; i < data.length; i++) {
      date.push(data[i].date)
    }
    // console.log(date)
    var setDate = new Set(date)
    // console.log(setDate)

    var uniqueDate = []
    for(let x of setDate) {
      uniqueDate.push(x)
    }
    // console.log(uniqueDate)
  
    const [selectedDate, setSelectDate] = useState({})
    const onSelectHandler = (value) => {
      setSelectDate(value)
    }
    // console.log(selectedDate)

    return (
        <div>
        <TableContainer>
            <Table sx={{ minWidth: 650 }}>

              <TableHead>
                <TableRow>
                  <TableCell>
                    <Select defaultValue="Date" style={{ width: 120 }} onChange={onSelectHandler} allowClear>
                    {
                      uniqueDate.map(
                        result => 
                        <Option key={result} value={result} >{result}</Option>
                      )
                    }
                    </Select>
                  </TableCell>
                  <TableCell align="left"> Notes </TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right"> action </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
        
              <TableBody>
                {
                  getNotes ? 
                  data?.map(
                    result => 
                    <TableRow
                      key={result._id}
                    >
                        <TableCell component="th" scope="row"> {result.date} </TableCell>
                        <TableCell align="left">{result.notes}</TableCell>
                        <TableCell></TableCell>
                        
                        <TableCell align="right"> 
                        {
                            (result.date === currentDate) ? 
                            <>
                                <Button varaint="text" onClick={() => showEditModal(result._id)}> Edit </Button> 
                                <Modal title="Basic Modal" visible={isEditModalVisible} onOk={() => handleEditOk(result._id)} onCancel={handleEditCancel} >
                                    <form method='PUT'>
                                        <textarea style={{"width":"35vw"}} onChange={onChangeEditHandler} name="notes" ></textarea>
                                    </form>
                                </Modal>
                            </>
                            : null
                        }
                        <>
                            <Button varaint="text" onClick={() => showDeleteModal(result._id)}> Delete </Button> 
                            <Modal title="Delete the note?" visible={isDeleteModalVisible} onOk={() => handleDeleteOk(result._id)} onCancel={handleDeleteCancel}>
                                <p>Are you sure?</p>
                            </Modal>
                        </>
                        </TableCell>
                        
                        <TableCell></TableCell>
                    </TableRow>
                  )
                  : 
                  data.map( 
                      result =>
                      {
                        (selectedDate === result.date) ?
                        <>
                        <TableRow
                            key={result._id}
                            >
                                <TableCell component="th" scope="row"> {result.date} </TableCell>
                                <TableCell align="left">{result.notes}</TableCell>
                                <TableCell></TableCell>
                                
                                <TableCell align="right"> 
                                {
                                    (result.date === currentDate) ? 
                                    <>
                                        <Button varaint="text" onClick={() => showEditModal(result._id)}> Edit </Button> 
                                        <Modal title="Basic Modal" visible={isEditModalVisible} onOk={() => handleEditOk(result._id)} onCancel={handleEditCancel} >
                                            <form method='PUT'>
                                                <textarea style={{"width":"35vw"}} onChange={onChangeEditHandler} name="notes" ></textarea>
                                            </form>
                                        </Modal>
                                    </>
                                    : null
                                }
                                <>
                                    <Button varaint="text" onClick={() => showDeleteModal(result._id)}> Delete </Button> 
                                    <Modal title="Delete the note?" visible={isDeleteModalVisible} onOk={() => handleDeleteOk(result._id)} onCancel={handleDeleteCancel}>
                                        <p>Are you sure?</p>
                                    </Modal>
                                </>
                                </TableCell>
                                
                                <TableCell></TableCell>
                            </TableRow>
                        </>
                        : 
                        <>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>

                                <TableCell>
                                    <h3 align="center"> No data yet... </h3>
                                </TableCell>

                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </>
                })}
              </TableBody>

            </Table>
        </TableContainer>
        </div>
    );
}

export default HistoryRecordNotes;