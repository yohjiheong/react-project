import React, {useState, useEffect} from 'react';
import { Button, TextField } from '@mui/material';
import { notification } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { Tabs } from 'antd';
import ShowFeedback from './forms/ShowFeedback';
import { Collapse } from 'antd';
const { Panel } = Collapse;
const { TabPane } = Tabs;

function Contact() {

    
    const [feedbacks, setFeedbacks] = useState([])
    
    var getFeedback = () => {
        fetch('https://yohji-project.herokuapp.com/feedback/', {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => setFeedbacks(data) )
    }
    
    useEffect( () => {
        getFeedback()
    }, [])
    // console.log(feedback)

    const check = () => {
        if (getFeedback) {
            return true
        }
    }

    const [newFeedback, setNewFeedback] = useState({})
    const onChangeHandler = (e) => {
        setNewFeedback({...newFeedback, [e.target.name]: e.target.value})
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        fetch('http://:4000/feedback', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(newFeedback)
        })
        .then(res => res.json())
        .then(data => {
            setNewFeedback(data)
            getFeedback()
            notification.open({
                message: 'Hooray!',
                description:
                  'Feedback Sent!',
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            });
        })
    }

    var viewHandler = (id) => {
        fetch(`https://yohji-project.herokuapp.com/feedback/isViewed/${id}`, {
            method: 'PUT',
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        })
        .then( res => res.json() )
        .then( data => {
            getFeedback()
            notification.open({
                message: 'Hooray!',
                description:
                  'Feedback Reviewed!',
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            });
        })
    }
    // console.log(view)


    
    const [reply, setReply] = useState({})
    
    const replyChangeHandler = (e) => {
        setReply({...reply, [e.target.name]: e.target.value})
    }
    // console.log(reply)
    
    const replySubmitHandler = (id) => {
        fetch(`https://yohji-project.herokuapp.com/feedback/${id}`, {
            method: 'POST',
            headers: {
                'x-auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reply)
        })
        .then(res => res.json())
        .then(data => {
            setReply(data.replies)
            // console.log(data.replies)
            getFeedback()
        })
    }
    
    
    const parsedData = JSON.parse(localStorage.getItem('userData')).user


    return (
        <div className='feedback'>
        {
            parsedData.isAdmin === false ?

            <>
                <h1> Have a Question? </h1> <small> Tell us! We'll reply...(maybe) </small>

                <Tabs defaultActiveKey="1">
                    <TabPane tab="Send Feedback" key="1" >
                        <form method='POST'>
                            <div className='input' align="center">
                                <TextField id="standard-basic" label="Title" variant="standard" style={{ width: "50vw"}} name="title" onChange={onChangeHandler} />
                            </div>
                            <div className='input' align="center">
                                <TextField
                                    id="standard-multiline-static"
                                    label="Your Feedback"
                                    multiline
                                    rows={5}
                                    variant="standard"
                                    name="description"
                                    onChange={onChangeHandler}
                                    style={{ width: "50vw"}}
                                />
                            </div>
                            <div align="center">
                                <Button align="center" sx={{m:4}} onClick={onSubmitHandler}> Send </Button>
                            </div>
                        </form>
                    </TabPane>

                    <TabPane tab="Sent" key="2">
                    
                        <ShowFeedback getFeedback={getFeedback} data={feedbacks} />
                    </TabPane>
                </Tabs>
            </>

            :

            <>
                <h3> All Feedbacks </h3>

                
                {
                    check ?
                        feedbacks?.map( result => 
                            <Collapse accordion key={result._id}>
                                <Panel header={result.title}>
                                    <small> {result.time} - {result.date} </small>
                                    {
                                        result.isViewed === false ?
                                        <button className='button' style={{ color: "green" }} onClick={() => viewHandler(result._id)}> Mark as viewed </button>
                                        : 
                                        <button className='button' style={{ color: "red" }} > Viewed </button>
                                    }
                                    <p>{result.description}</p>

                                    <hr/>
        
                                    <form method='PUT'>
                                        <TextField id="outlined-basic" label="Enter Reply" variant="outlined" style={{ width: "50vw"}} sx={{m: 1}} name="reply" onChange={replyChangeHandler} />
                                        <Button variant="outlined" sx={{m: 1}} onClick={() => replySubmitHandler(result._id)}> Send </Button>
                                    </form>

                                    <h5><i> Replies </i></h5>

                                    {
                                        result.replies.map(results => 
                                            <>
                                                {
                                                    results.postId === result._id ?
                                                    <p> Anonymous: {results.reply} </p>
                                                    
                                                    : null
                                                }
                                            </>
                                        )
                                    }

                                </Panel>
                            </Collapse>
                        )
                    : null
                }
     
            </>
            
        }

        </div>
    );
}

export default Contact;