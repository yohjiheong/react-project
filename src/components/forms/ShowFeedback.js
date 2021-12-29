import React from 'react';
import "../../App.css"
import { FrownOutlined } from '@ant-design/icons'
import { Collapse, notification } from 'antd';
import FeedbackReply from './FeedbackReply';
const { Panel } = Collapse;


function ShowFeedback({data, getFeedback}) {
    // console.log(data, getFeedback)


    const check = () => {
        if (getFeedback) {
            return true
        }
    }


    var deleteHandler = (id) => {
        // alert(id)
        fetch(`https://yohji-project.herokuapp.com/feedback/${id}`, {
            method: "DELETE",
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        })
        .then( res => res.json() )
        .then( data => {
            getFeedback()
            notification.open({
                message: 'Deleted!',
                description:
                  'Its deleted!',
                icon: <FrownOutlined style={{ color: '#108ee9' }} />,
            });
        })
    }

    const parsedData = JSON.parse(localStorage.getItem('userData')).user
    // console.log(parsedData)


    return (
        <div>
               {
                check ? 
                data.map(result => 
                    result.user === parsedData.id ?
                    <>
                        <Collapse accordion>
                            <Panel header={result.title} key={result._id}>
                                <p>
                                    {result.date} - {result.time}

                                    {
                                        parsedData.isAdmin !== true ?
                                        <button className='button' style={{ color: "red" }} onClick={() => deleteHandler(result._id)}> Delete </button>
                                        : null
                                    }


                                </p>

                                <h5>{result.description}</h5>

                                <FeedbackReply getFeedback={getFeedback} id={result._id} data={data} />


                            </Panel>
                        </Collapse>
                    </>
                    : null
                )
                : 
                null
            }
        </div>
    );
}

export default ShowFeedback;