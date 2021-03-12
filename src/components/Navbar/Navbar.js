import memories from '../../images/memories.png';
import decode from 'jwt-decode';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom'
import useStyles from './styles';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';
import { getusers } from "../../actions/auth";
import { Dropdown } from 'react-bootstrap';
import $ from 'jquery';

function Navbar({ Sign, setSign, switchMode, log, setLog }) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    if (user) {
        dispatch(getusers());
    }
    useEffect(() => {
        const token = user?.token;
        if (token && user?.type !== 'github' && user?.type !== 'linkedin') {
            const decoded = decode(token);
            if (decoded.exp * 1000 < new Date().getTime()) {
                logoutHandler();
                setLog(false)
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
        //eslint-disable-next-line
    }, [location]);

    const logoutHandler = () => {
        dispatch({ type: LOGOUT })
        let elem = $('#comment_but')
        console.log(elem[0])
        $('#toggle').hide();
        elem[0].setAttribute('disabled', true)
        setSign(true);
        setUser(null);
        setLog(true);
        history.push('/');


    };

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" onClick={() => setSign(true)} className={classes.heading} variant="h4" align="center">E-Voting</Typography>
                <img className={classes.image} src={memories} alt="Voting" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Dropdown>
                            <Dropdown.Toggle variant="contained" id="dropdown-basic"><Button><Avatar className={classes.purple} alt={user?.result?.name} src={user?.result?.imageUrl || user?.result?.picture?.data?.url || user?.imageUrl || user?.result?.avatar_url}>{user?.result?.name?.charAt(0)}</Avatar></Button></Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.ItemText><Typography className={classes.userName} variant="h6">{user?.result?.name}</Typography></Dropdown.ItemText>
                                <Dropdown.Item as="button"><Button variant="contained" size="small" className={classes.logout} color="secondary" onClick={logoutHandler}><ExitToAppOutlinedIcon />Logout</Button>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </div>

                ) : (
                        <div>
                            <Button className={classes.button} onMouseOver={(e) => { e.target.style.color = 'white' }} component={Link} to="/auth" variant="contained" onClick={switchMode} color="primary">{Sign ? 'Sign In' : 'Sign Up'}</Button>
                        </div>
                    )}

            </Toolbar>
        </AppBar>
    )
}

export default Navbar