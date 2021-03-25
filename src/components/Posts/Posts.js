import { useSelector } from "react-redux";
import { Grid, CircularProgress } from '@material-ui/core';
import Post from "./Post/Post";
// import useStyles from './styles';
import partys from '../../partys.json';

const Posts = ({ setCurrentId, log, setLog }) => {
    // const classes = useStyles();
    const posts=partys;
    return (
        !posts.length ? <CircularProgress /> : (
            <Grid container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post.id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId} log={log} setLog={setLog} />
                    </Grid>

                ))}
            </Grid>
        )

    )
}

export default Posts;