import { Container, Grid, Grow } from "@material-ui/core";
import Form from "../Forms/Form";
import Posts from "../Posts/Posts";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getPosts } from '../../actions/posts';
import useStyles from '../../style';

function Home({ log, setLog }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(0);
    useEffect(() => {
        dispatch(getPosts());
        // if (currentId !== 0) { dispatch(getusers()); }
    }, [dispatch, currentId])
    return (

        <Grow in>
            <Container>
                <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} log={log} setLog={setLog} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} log={log} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>

    )
}

export default Home;