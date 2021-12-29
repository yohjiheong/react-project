import React, {useState, useEffect} from 'react';
import {Box, TextField, Button} from '@mui/material';
import {SearchOutlined} from '@ant-design/icons'
import {Card, CardContent, CardMedia, Typography} from '@mui/material';
import "../App.css"
import LearnMore from './forms/LearnMore'



function Nutrix() {

    let apiKey = "91774ddf771b4569a0f9428328d80358"

    const [randomResult, setRandomResult] = useState({})
    const [query, setQuery] = useState({})
    const [queryData, setQueryData] = useState()

    const results = () => {
        fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=9&addRecipeNutrition=true`)
        .then(res => res.json())
        .then(data => {
            setRandomResult(data.recipes)
        })
    }

    useEffect( () => {
        results()
    }, [])
    // console.log(randomResult)

    const onChangeHandler = (e) => {
        setQuery(e.target.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&addRecipeNutrition=true`)
        .then(res => res.json())
        .then(data => {
            setQueryData(data.results)
        })
    }
    // console.log(queryData)

    return (
        <div>

            <div align="center">
                <Box
                    sx={{
                        '& > :not(style)': { m: 2, width: '25ch' },
                    }}
                    autoComplete="off"
                    >
                    <TextField id="standard-basic" label="query" variant="standard" name="query" onChange={onChangeHandler} />
                    <Button variant="text" onClick={onSubmitHandler}> <SearchOutlined /> &nbsp; Search </Button>
                </Box>
            </div>

            <div className='card'>
                
            {
                ! query ?
                randomResult?.map( result => {
                    return (
                        <Card sx={{ maxWidth: 300 }} className="cardItem" key={result.id}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={result.image}
                            />

                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {result.title}
                                </Typography>
                            </CardContent>

                        </Card>
                    )
                })

                :
                
                queryData?.map( result => {
                    return (
                        <Card sx={{ maxWidth: 300 }} className="cardItem" key={result.id}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={result.image}
                            />

                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                {result.title}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    <LearnMore data={result.nutrition.nutrients} />
                                </Typography>
                            </CardContent>

                        </Card>
                    )
                })
            }


            </div>

        </div>
    );
}

export default Nutrix;