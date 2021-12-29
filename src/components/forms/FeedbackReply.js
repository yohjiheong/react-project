import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function FeedbackReply({data, id, getFeedback}) {

    const [reply, setReply] = useState({})

    const onChangeHandler = (e) => {
        setReply({...reply, [e.target.name]: e.target.value})
    }
    // console.log(reply)

    const onSubmitHandler = (id) => {
        fetch(`http://localhost:4000/feedback/${id}`, {
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

    // const check = () => {
    //     if(getFeedback) {
    //         return true
    //     }
    // }

    var postId = [];
    for (var i =0; i < reply.length; i++) {
        console.log(reply[i].postId)
        console.log(postId === id)
        // console.log(reply[i] === id)
    }
    // console.log(postId)


    var dataId = [];
    for (var j=0; j<data.length; j++) {
        dataId.push(data[j]._id)
    }
    // console.log(dataId)



    return (
        <div>

            <hr/>
        
            <form method='PUT'>
                <TextField id="outlined-basic" label="Enter Reply" variant="outlined" style={{ width: "50vw"}} sx={{m: 1}} name="reply" onChange={onChangeHandler} />
                <Button variant="outlined" sx={{m: 1}} onClick={() => onSubmitHandler(id)}> Send </Button>
            </form>

            <h5><i> Replies </i></h5>

{
    data.map(result => 
        <> 
            {
                result.replies.map(results => 
                    <>
                        {
                            results.postId === id ?
                                <p> Anonymous: {results.reply} </p> 
                            : null
                        }
                    </>
                )
            }
        </>
    )

}

        </div>
    );
}

export default FeedbackReply;