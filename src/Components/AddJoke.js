import React, { useState } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'

export default () => {
    const [joke, setJoke] = useState('')
    const [answer, setAnswer] = useState('')

    console.log(process.env.REACT_APP_BACKEND_API);

    const addJoke = (event) => {
        event.preventDefault()
        axios.post(process.env.REACT_APP_BACKEND_API + 'add', {
            joke: joke,
            answer: answer
        })
            .then((result) => {
                console.log('res', result)
                setJoke('')
                setAnswer('')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <Card style={{ maxWidth: '1000px', textAlign: 'center', margin: '25px auto 25px auto' }}>
            <Typography variant='h5' style={{ margin: '25px auto 25px auto' }} >Add Joke</Typography>
            <CardContent style={{ margin: '25px auto 25px auto' }}>
                <TextField
                    fullWidth
                    label='Question'
                    required
                    type='text'
                    value={joke}
                    onChange={(e) => { setJoke(e.target.value) }}
                    variant='outlined'
                    style={{
                        marginBottom: '25px'
                    }}
                />
                <TextField
                    fullWidth
                    label='Answer'
                    type='text'
                    value={answer}
                    onChange={(e) => { setAnswer(e.target.value) }}
                    variant='outlined'
                />
                <Button
                    style={{
                        textAlign: 'center',
                        margin: '25px 0px 0px 0px'
                    }}
                    variant='contained'
                    color="primary"
                    onClick={(event) => { addJoke(event) }}
                >
                    Add New Joke
                </Button>

            </CardContent>
        </Card>
    )
}