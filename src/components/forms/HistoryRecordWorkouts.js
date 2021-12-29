import React, {useState} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button} from '@mui/material';
import { Modal, Input, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons'
import moment from 'moment'

import { Select } from 'antd';
const { Option } = Select;

function HistoryRecordWorkouts({getActivities, data}) {
    // console.log(getActivities)
    // console.log(data)
    const currentDate = (moment(moment.now()).format("DD/MM/YYYY"))


    var check = false
    if (data.length >= 1) {
      check = true
    }


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
        fetch('https://yohji-project.herokuapp.com/exercise/' + id, {
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
            getActivities()
            setIsEditModalVisible(false)
            notification.open({
              message: 'Hooray!',
              description:
                'Changes Commited!',
              icon: <SmileOutlined style={{ color: '#108ee9' }} />,
          });
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
      fetch('https://yohji-project.herokuapp.com/exercise/' + id, {
          method: "DELETE",
          headers: {
              'x-auth-token': localStorage.getItem('token')
          }
      })
      .then(res => res.json())
      .then(data => {
          getActivities()
          setIsDeleteModalVisible(false)
      });
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
                  <TableCell align="right"> Workout </TableCell>
                  <TableCell align="right"> Difficulty </TableCell>
                  <TableCell align="right"> Duration &nbsp; (mins) </TableCell>
                  <TableCell align="right"> Action </TableCell>
                </TableRow>
              </TableHead>
        
                    
              <TableBody>
                {
                  check ? 
                  data.map(
                    result => 
                      (!selectedDate) ? 
                        <>
                          <TableRow key={result._id} >
  
                            <TableCell component="th" scope="row"> {result.date} </TableCell>
                            <TableCell align="right">{result.activity}</TableCell>
                            <TableCell align="right">{result.difficulty}</TableCell>
                            <TableCell align="right">{result.duration}</TableCell>
                    
                            <TableCell align='right'>
                              {
                                (result.date === currentDate) ?
                                <>
                                  <Button varaint="text" onClick={() => showEditModal(result._id)}> Edit </Button> 
                                  <Modal title="Basic Modal" visible={isEditModalVisible} onOk={() => handleEditOk(result._id)} onCancel={handleEditCancel} >
                                    <form method='PUT'>
                                      <Input className='input' onChange={onChangeEditHandler} name="activity" placeholder='Exercise' ></Input>
                                      <Input className='input' onChange={onChangeEditHandler} name="difficulty" placeholder='Difficulty' type="number" ></Input>
                                      <Input className='input' onChange={onChangeEditHandler} name="duration" placeholder='Duration' type="number" ></Input>
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
                          </TableRow>
                        </>
                      : 
                      (selectedDate === result.date) ?
                      <>
                          <TableRow key={result._id} >
  
                            <TableCell component="th" scope="row"> {result.date} </TableCell>
                            <TableCell align="right">{result.activity}</TableCell>
                            <TableCell align="right">{result.difficulty}</TableCell>
                            <TableCell align="right">{result.duration}</TableCell>
                    
                            <TableCell align='right'>
                              {
                                (result.date === currentDate) ?
                                <>
                                  <Button varaint="text" onClick={() => showEditModal(result._id)}> Edit </Button> 
                                  <Modal title="Basic Modal" visible={isEditModalVisible} onOk={() => handleEditOk(result._id)} onCancel={handleEditCancel} >
                                    <form method='PUT'>
                                      <Input className='input' onChange={onChangeEditHandler} name="activity" placeholder='Exercise' ></Input>
                                      <Input className='input' onChange={onChangeEditHandler} name="difficulty" placeholder='Difficulty' type="number" ></Input>
                                      <Input className='input' onChange={onChangeEditHandler} name="duration" placeholder='Duration' type="number" ></Input>
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
                          </TableRow>
                        </>
                      : null
                  )
                  : null
                }
              </TableBody>

            </Table>
          </TableContainer>
        </div>
    );
}

export default HistoryRecordWorkouts;