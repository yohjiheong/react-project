import React, {useState} from 'react';
import { Modal } from 'antd';
import { Button } from '@mui/material';


function EditNote({data, getNotes, noteId}) {
    // console.log(data)
    // console.log(getNotes)
    // console.log(noteId)

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [id, setId] = useState({});
    const [edit, setEditing] = useState({});
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);


    const showEditModal = (id) => {
        setId(id)
        setIsEditModalVisible(true);
    };
    // console.log(id)

    const onChangeEditHandler = (e) => {
        setEditing({...edit, [e.target.name]: e.target.value})
    }
  
    const handleEditOk = () => {
        // console.log(`http://localhost:4000/notes/${noteId}`)
        fetch('http://localhost:4000/notes/' + id, {
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
            setIsEditModalVisible(false);
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
        fetch('http://localhost:4000/notes/' + id, {
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
    
    return (

        <>
            <Button varaint="text" onClick={() => showEditModal(noteId)}> Edit </Button> 
            <Modal title="Basic Modal" visible={isEditModalVisible} onOk={() => handleEditOk(data._id)} onCancel={handleEditCancel} >
                <form method='PUT'>
                    <textarea style={{"width":"35vw"}} onChange={onChangeEditHandler} name="notes" ></textarea>
                </form>
            </Modal>

            <Button varaint="text" color="error" onClick={() => showDeleteModal(noteId)}> Delete </Button> 
            <Modal title="Basic Modal" visible={isDeleteModalVisible} onOk={() => handleDeleteOk(data._id)} onCancel={handleDeleteCancel} >
                <p>Are you sure?</p>
            </Modal>
        </>
    );
}

export default EditNote;