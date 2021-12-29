import React, {useState, useEffect} from 'react';
import "../App.css";
import Graph from './forms/Graph';
import AddNote from './forms/AddNote';

function Dashboard() {

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

    // console.log(note)
    // console.log(note.length)
    // console.log(JSON.parse(localStorage.getItem('userData').user))
    

    // const currentDate = (moment(moment.now()).format("DD/MM/YYYY"))
    // console.log(currentDate)


    return (
        <>

            <div>
            {
                activities ?
                <>
                    <Graph activities={activities} getActivities={getActivities} />
                </>
                : null
            }
            </div>

            <div>
                <AddNote data={note} getNotes={getNotes} />
            </div>


        </>
    );
}

export default Dashboard;