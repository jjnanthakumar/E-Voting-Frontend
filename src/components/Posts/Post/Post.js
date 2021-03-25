import useStyles from './style';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Avatar, TextField } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import Chat from '@material-ui/icons/ChatBubbleRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { commentPost, deleteComment, deletePost, likePost } from '../../../actions/posts';
import 'react-autocomplete-input/dist/bundle.css';
import './style.css';
import { useState, useEffect } from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import $ from 'jquery';
import CustomizedMenus from '../../Menu';
import axios from 'axios';
const topFunc = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};
const Post = ({ post, setCurrentId, log, setLog }) => {
    let temp = [...post.comments]
    const [comments, setComments] = useState([]);
    const [val, setValue] = useState('');
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
        $(`#toggle${post._id}`).hide();
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        sortHandler(true);
        let com_elem = document.getElementById('0')
        $('#for_comment').focus();
        if (!check && com_elem) {
            com_elem.scrollIntoView({ behavior: 'smooth' })
        }
        // eslint-disable-next-line
    }, [post.comments])
    const handleClick = () => {
        let id = `#toggle${post._id}`
        let comment = `#for_comment${post._id}`
        $(id).slideToggle('slow');
        $(comment).focus();
    }

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id || user?.result?.userID || user?.result?.id || user?.id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };
    const handleComments = (e) => {
        e.preventDefault();
        dispatch(commentPost(post._id, val))
        setCheck(false);
        setValue('')
    };

    const sortHandler = (arg) => {
        let btn1 = document.getElementById('sort_btn')
        let btn2 = document.getElementById('sort_btn1')
        if (btn1) {
            console.log(btn1)
            btn1.style.outline = 'none !important'
        }
        if (btn2) {
            console.log(btn2)
            btn2.style.outline = 'none !important'
        }
        if (arg) {
            temp.sort((a, b) => { return new Date(b.commentAt) - new Date(a.commentAt) });
            setComments(temp)
        } else {
            temp.sort((a, b) => { return new Date(a.commentAt) - new Date(b.commentAt) });
            setComments(temp)
        }
    }
    const getBase64 = (url) => {
        var img;
        axios.get(url, { responseType: 'arraybuffer' }).then(
            (res) => {
                window.img = Buffer.from(res.data).toString('base64');
            })
        console.log(window.img)
        return window.img;
    }
    console.log(getBase64(post.profile))
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={getBase64(post.profile)} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.date).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator || user?.result?.userID === post?.creator || user?.id === post?.creator) && (
                    <Button style={{ color: 'white' }} size="small" onClick={() => { setCurrentId(post._id) }}><MoreHorizIcon fontSize="default" /></Button>)}
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography variant="h6" className={classes.title} gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => { dispatch(likePost(post._id)) }} disabled={log}><Likes /></Button>

                <CustomizedMenus post={post} user={user} log={log} />

                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator || user?.result?.userID === post?.creator || user?.id === post?.creator || String(user?.result?.id) === post?.creator) && (<Button size="small" style={{ color: 'red' }} onClick={() => { dispatch(deletePost(post._id)) }}><DeleteIcon fontSize="small" /></Button>)}
            </CardActions>
            {/* <Button disabled={log} className={classes.comment} id="comment_but" onClick={handleClick} size="small" variant="contained" color="primary"><Chat />&nbsp;{comments.length < 2 ? comments.length + ' Comment' : comments.length + ' Comments'}</Button> */}
            <div id={`toggle${post._id}`} style={{ display: !user?.result ? 'none' : 'block' }}>
                <form onSubmit={handleComments}>
                    <CardContent>
                        {/* <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            options={JSON.parse(localStorage.getItem('users')).map((item) => item.name)}
                            renderInput={(params) => (
                            <TextField {...params} label="freeSolo" margin="normal" variant="outlined" />
                        )}
                        /> */}
                        <TextField multiline rows={5} variant="outlined" value={val} id={`for_comment${post._id}`} label="Comment here" onChange={({ target }) => setValue(target.value)} alignItems="center" style={{ height: '100%', width: '100%', fontSize: '1rem' }} placeholder="Type your comments here" />
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        <Button type="submit" size="small" color="primary" variant="contained">comment</Button>
                    </CardActions>
                </form>
                {comments.length !== 0 ?

                    <CardContent>
                        <Button style={{ justifyContent: 'start' }} color="primary" size="small" onClick={() => sortHandler(true)}><ArrowUpwardIcon /></Button>
                        <Button style={{ float: 'right' }} color="primary" size="small" onClick={() => sortHandler(false)}><ArrowDownwardIcon /></Button>

                        {comments.map((item, index) => {
                            return (
                                <div id={index} className="tip left">
                                    <div className={classes.profile}>
                                        <Avatar className={classes.purple} alt={item.name} src={item?.imageUrl || item?.picture?.data?.url}>{item.name.charAt(0)}</Avatar>
                                        <Typography className={classes.userName} variant="h6">{item.name}</Typography>
                                        <small style={{ color: 'grey', fontSize: '1rem', zoom: '50%', padding: '10px' }}>{moment(item.commentAt).fromNow()}</small>
                                    </div>
                                    <CardContent style={{ marginTop: '-8%' }}>{item.comment}</CardContent>
                                    {(user?.result?.googleId === item?.id || user?.result?._id === item?.id || user?.id === post?.creator || user?.result?.userID === item?.id || String(user?.result?.id) === item?.id) && (<Button size="small" style={{ color: 'red' }} onClick={() => { dispatch(deleteComment(post._id, item?.c_id)); topFunc(); setCheck(true) }}><DeleteIcon fontSize="small" /></Button>)}
                                </div>

                            )
                        })}

                    </CardContent> : <CardContent>No comments</CardContent>}

            </div>




        </Card >
    )
}

export default Post;
