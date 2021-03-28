import useStyles from './style';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Avatar, TextField } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { voteParty } from '../../../actions/partys';
import 'react-autocomplete-input/dist/bundle.css';
import './style.css';
import { useState, useEffect } from 'react';
import $ from 'jquery';
import axios from 'axios';

const Post = ({ party, setCurrentId, log, setLog }) => {
    const [val, setValue] = useState(false);
    // const options = JSON.parse(localStorage.getItem('users'))
    // const users = options.map(({ _id, name }) => { return name })
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'))
    if (user === null) {
        setLog(true)
    }
    const classes = useStyles();
    const [check, setCheck] = useState(false);
    useEffect(() => {
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        let com_elem = document.getElementById('0')
        $('#for_comment').focus();
        if (!check && com_elem) {
            com_elem.scrollIntoView({ behavior: 'smooth' })
        }
        // eslint-disable-next-line
    }, [])
    const Votes = () => {
        if (party.votes.length > 0) {
            if (party.votes.find((vote) => vote === (user?.result?._id || user?.result?.userID))) {
                setValue(true)
                return (
                    <>You have already voted</>
                )

            } else {
                return (
                    <>&nbsp;Vote</>
                )
            }
        }

        return <>&nbsp;Vote</>;

    };

    console.log(party.selectedFile)

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={party.selectedFile} title={party.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{party.name}</Typography>
                <Typography variant="body2">{moment(party.date).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                {(user?.result?.googleId === party?.creator || user?.result?._id === party?.creator || user?.result?.userID === party?.creator || user?.id === party?.creator) && (
                    <Button style={{ color: 'white' }} size="small" onClick={() => { setCurrentId(party._id) }}><MoreHorizIcon fontSize="default" /></Button>)}
            </div>
            <div className={classes.details}>
            </div>
            <Typography variant="h6" className={classes.title} gutterBottom>{party.name}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{party.description}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => { dispatch(voteParty(party._id)) }} disabled={val}><Votes /></Button>
            </CardActions>

        </Card >
    )
}

export default Post;
