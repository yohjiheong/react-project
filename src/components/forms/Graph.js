import React, {useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import moment from 'moment';
import {Accordion, AccordionSummary, AccordionDetails,Box, TextField, Button, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


  
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
  
  
function Graph({getActivities, activities}) {
    // console.log(getActivities)
    // console.log(activities)

    const activity = activities

    const currentDate = (moment(moment.now()).format("DD/MM/YYYY"))

    var exercises = []
    var duration = []
    var difficulty = []
    var id = []
    var totalDuration = 0
    for(var i = 0; i < activity.length; i++) {
        if (activity[i].date === currentDate) {
            exercises.push(activity[i].activity)
            duration.push(activity[i].duration)
            difficulty.push(activity[i].difficulty)
            id.push(activity[i].user)
            totalDuration += parseInt(activity[i].duration)
        }
    }
    // console.log(exercises, duration, difficulty, id)
    // console.log(totalDuration)

    
    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'top',
            },  
            title: {
                display: true,
                text: 'Exercise Summary',
            }
        },
    };

    const data = {
        labels: exercises,
        datasets: [{
            label: "Duration",
            fill: true,
            borderColor: "rgba(255, 0, 0, 0.3)",
            borderWidth: 1,
            pointRadius: 1,
            data: duration
        }]
    };


    const options2 = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'top',
            },  
            title: {
                display: true,
                text: 'Difficulty Summary',
            }
        },
    };
      
    const data2 = {
        labels: exercises,
        datasets: [{
            label: "Difficulty",
            fill: true,
            borderColor: "rgba(255, 0, 0, 0.3)",
            borderWidth: 1,
            pointRadius: 1,
            data: difficulty
        }]
    };



    const [exercise, setExercise] = useState({})

    const onChangeHandler = (e) => {
        setExercise({...exercise, [e.target.name]: e.target.value})
    }
    console.log(exercise)

    const onSubmitHandler = (e) => {
        e.preventDefault()
        fetch('https://yohji-project.herokuapp.com/exercise', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(exercise)
        })
        .then(res => res.json())
        .then(data => {
            setExercise(data)
            getActivities()

        })
    }

    var timeConvert = () => {
        var hours = ( totalDuration / 60);
        var rHours = Math.floor(hours);
        var minutes = (hours - rHours) * 60;
        var rMinutes = Math.round(minutes);
        return rHours + " hour(s) and " + rMinutes + " minute(s)";
    }
    // console.log(timeConvert())


    return (
        <>
            <div align='center'>
                <form method='POST' id="form">
                <Box
                    sx={{
                        '& > :not(style)': { m: 3, width: '25ch' },
                    }}
                    autoComplete="off"
                    >
                    <TextField id="standard-basic" label="Exercise" variant="standard" name="activity" type='text' placeholder="Eg: Burpees" onChange={onChangeHandler}/>
                    <TextField id="standard-basic" label="Difficulty Level" variant="standard" name="difficulty" type='number' placeholder='Scale 1-5' onChange={onChangeHandler} />
                    <TextField id="standard-basic" label="Duration" variant="standard" name='duration' type="number" placeholder='By minutes' onChange={onChangeHandler} />
                    <Button variant="outlined" onClick={onSubmitHandler}>Submit</Button>
                </Box>
                </form>
            </div>

            <div>
                <Accordion className="accordion">
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="panel1a-header"
                    >
                        <Typography> Duration Summary </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Line data={data} options={options} width={50} height={10}/>
                        {
                            totalDuration ?
                            <h3 align="center"> Total Duration : {timeConvert()}</h3>
                            :
                            <h3 align="center"> Total Duration : - </h3>
                        }
                    </AccordionDetails>
                </Accordion>

                <Accordion className="accordion">
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="panel1a-header"
                    >
                        <Typography> Difficulty Summary </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Bar data={data2} options={options2} width={50} height={10}/>
                    </AccordionDetails>
                </Accordion>
            </div>


        </>
    )
}


export default Graph;