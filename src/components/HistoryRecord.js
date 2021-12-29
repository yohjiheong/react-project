import React, {useState, useEffect} from 'react';
import HistoryRecordNotes from './forms/HistoryRecordNotes';
import HistoryRecordWorkouts from './forms/HistoryRecordWorkouts';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import '../App.css'
import { Tabs, Modal } from 'antd';
const { TabPane } = Tabs;


function HistoryRecord() {

    const [activities, setActivities] = useState({})
    const [note, setNote] = useState({})

    var getActivities = () => {
        fetch('https://yohji-project.herokuapp.com/exercise/user', {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
                'x-auth-token': localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data) {
                setActivities(data)
            }
        })
    }

    var getNotes = () => {
        fetch('https://yohji-project.herokuapp.com/notes/user', {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                'x-auth-token': localStorage.getItem('token')
            }
        })
        .then(res => res.json())
        .then(data => setNote(data))
    }

    useEffect( () => {
        getActivities()
        getNotes()
    }, [])

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    
    return (
        <div className='history'>
            <h1>History Data</h1>

            <Tabs defaultActiveKey="1">
                <TabPane tab="Workouts" key="1">
                    <small> *Please note that you can't edit past data, you can only delete them. </small> 
                    <>                        
                        <button className='button' onClick={showModal}><HelpOutlineOutlinedIcon fontSize="small" /></button>
                        <Modal title="A message from us" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <p> 
                                To prevent users <i>accidentally</i> edited the past data, we removed the edit funtion on the past data.
                                <br/>
                                You can only delete them, or edit them on the current day.
                                <br/>
                                Thanks!
                            </p>
                        </Modal>
                    </>
                    <HistoryRecordWorkouts data={activities} getActivities={getActivities} />
                </TabPane>

                <TabPane tab="Notes" key="2">
                    <small> *Please note that you can't edit past data, you can only delete them. </small> 
                    <>
                        <button className='button' onClick={showModal}><HelpOutlineOutlinedIcon fontSize="small" /></button>
                        <Modal title="A message from us" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <p> 
                                To prevent users <i>accidentally</i> edited the past data, we removed the edit funtion on the past data.
                                <br/>
                                You can only delete them, or edit them on the current day.
                                <br/>
                                Thanks!
                            </p>
                        </Modal>
                    </>
                    <HistoryRecordNotes data={note} getNotes={getNotes} />
                </TabPane>
            </Tabs>
            
        </div>
    );
}

export default HistoryRecord;