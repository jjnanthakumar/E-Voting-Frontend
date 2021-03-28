import $ from "jquery";
import Chip from '@material-ui/core/Chip';
import useStyles from './style.js';
import { Autocomplete } from '@material-ui/lab';
import { TextField, Typography, Button, Paper } from '@material-ui/core'
import { useEffect, useState, useRef } from 'react';
import FileBase from 'react-file-base64';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createParty, updateParty } from '../../actions/partys';

const Form = ({ setCurrentId, currentId, log }) => {
    const autoC = useRef(null);

    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)
    const dispatch = useDispatch();
    const [postData, setPostdata] = useState({ title: '', message: '', tags: [], selectedFile: '' });
    const user = JSON.parse(localStorage.getItem('profile'))
    useEffect(() => {
        if (post) {
            setPostdata(post)
        }
    }, [post]);
    const classes = useStyles();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(postData)
        if (currentId === 0) {
            dispatch(createParty({ ...postData, name: user?.result?.name }));
        } else {
            dispatch(updateParty(currentId, { ...postData, name: user?.result?.name }));
        }
        clear();
    };
    console.log(user?.result?.name)
    if (log) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">Please Sign in to create your own memories and view other's Memory :)</Typography>
            </Paper>
        )
    }
    const clear = () => {
        setCurrentId(0);
        setPostdata({ title: '', message: '', tags: [], selectedFile: '' })
        $("input[type='file']").val('');
        let elem = autoC.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0];
        setTimeout(() => { if (elem) elem.click(); $("input[name='title']").focus(); }, 500)
    }
    const handleFilechange = ({ name, base64, size, type }) => {
        if (type.split('/')[0] !== 'image' || (Number(size.split(" ")[0]) > 10000)) {
            toast.error('Only Images allowed!!')
            return
        }
        setPostdata({ ...postData, selectedFile: base64 })
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
                <Typography variant="h6">{`${currentId ? 'Editing' : 'Creating'}`} a Memory</Typography>
                <TextField required name="title" variant="outlined" label="Title" fullWidth onChange={(e) => setPostdata({ ...postData, title: e.target.value })} value={postData.title} />
                <TextField multiline rows={5} required name="message" variant="outlined" label="Message" fullWidth onChange={(e) => setPostdata({ ...postData, message: e.target.value })} value={postData.message} />

                <Autocomplete
                    multiple
                    ref={autoC}
                    id="tags-filled"
                    options={[]}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip variant="outlined" color="primary" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    onChange={(e, v, r) => {
                        let em = document.getElementById('tags-filled')
                        console.log(em)
                        setPostdata({ ...postData, tags: v })
                    }}
                    fullWidth
                    required
                    renderInput={(params) => (
                        <TextField {...params} name="tags" variant="outlined" label="Tags (press enter)" placeholder="Tags" fullWidth />
                    )}
                />
                {/* <TextField required name="tags" variant="outlined" label="Tags (comma sep)" fullWidth onChange={(e) => setPostdata({ ...postData, tags: e.target.value.split(',') })} value={postData.tags} /> */}
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={handleFilechange}
                    />
                </div>
                <Button disabled={!postData?.title || !postData.message} type="submit" className={classes.buttonSubmit} color="primary" variant="contained" size="large" fullWidth>Submit</Button>
                <Button color="secondary" variant="contained" size="small" onClick={clear} fullWidth>Clear</Button>

            </form>
        </Paper>
    )
}

export default Form;