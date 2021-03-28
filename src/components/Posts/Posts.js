import { useSelector } from "react-redux";
import { Grid, CircularProgress } from '@material-ui/core';
import Post from "./Post/Post";
import useStyles from './styles';

const Posts = ({ setCurrentId, log, setLog }) => {
    const classes = useStyles();
    const partys=useSelector((state) => state.partys);;
    const user = JSON.parse(localStorage.getItem('profile'))
    return (
        !partys.length || !user ? <CircularProgress /> : (
            <Grid container alignItems="stretch" spacing={3}>
                {partys.map((party) => (
                    <Grid key={party.id} item xs={12} sm={6}>
                        <Post party={party} setCurrentId={setCurrentId} log={log} setLog={setLog} />
                    </Grid>

                ))}
            </Grid>
        )

    )
}

export default Posts;