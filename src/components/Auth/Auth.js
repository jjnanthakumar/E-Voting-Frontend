import useStyles from './style';
// import axios from 'axios';
import { Paper, Grid, Avatar, Button, Typography, Container } from '@material-ui/core';
import React from 'react';
import LockOutline from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getusers, signin, signup } from '../../actions/auth';
import { validate } from 'email-validator';
import './style.css';
import emailjs from 'emailjs-com';
// import ActionAlerts from '../AlertMessage';
// import CustomTicker from './customTicker';

function Auth({ Sign, setSign, setFormdata, formData, errors, setErrors, switchMode, setLog }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (Sign) {
            dispatch(signup(formData, history));
            setLog(true);
            setTimeout(() => {
                const users = JSON.parse(localStorage.getItem('users'))
                emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, { to_name: users?.result?.name, from_name: "Nandy" }, process.env.REACT_APP_USER_ID)
            }, 1000);
        } else {
            dispatch(signin(formData, history));
            setLog(true);
        }

    };
    useEffect(() => {
        dispatch(getusers())
        // eslint-disable-next-line
    }, [])

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'email':
                if (Sign) {
                    const users = JSON.parse(localStorage.getItem('users'))
                    let emails = [];
                    if (users) emails = users.map((item) => { return item.email })
                    if (emails.indexOf(e.target.value) !== -1) {
                        setErrors({ ...errors, email: { bool: true, text: 'User Already Exists!!' } })
                    }
                    else if (!validate(e.target.value)) {
                        setErrors({ ...errors, email: { bool: true, text: 'Provide a valid Email Address !!' } })
                    }
                    else {
                        setErrors({ ...errors, email: { bool: false, text: '' } })
                    }
                } else {
                    if (!validate(e.target.value)) {
                        setErrors({ ...errors, email: { bool: true, text: 'Provide a valid Email Address !!' } })
                    }
                    else {
                        setErrors({ ...errors, email: { bool: false, text: '' } })
                    }
                }
                break;
            case 'firstName':
                if (e.target.value.length <= 3) {
                    setErrors({ ...errors, firstName: { bool: true, text: 'Name should be > than 3 characters!!' } })
                } else {
                    setErrors({ ...errors, firstName: { bool: false, text: '' } })
                }
                break;
            case 'password':
                if (Sign) {
                    let messages = [];
                    if (e.target.value.length < 7) {
                        messages.push('Password should be > than 6 characters!!')
                    }
                    if (!/[A-Z]/.test(e.target.value)) {
                        messages.push('Password should contain atleast 1 Uppercase character!')
                    }
                    if (!/[!@#$&*^%~+=]/.test(e.target.value)) {
                        messages.push('Password should contain atleast 1 Special character!')
                    }
                    if (messages.length !== 0) {
                        setErrors({ ...errors, password: { bool: true, text: messages } })
                    } else {
                        setErrors({ ...errors, password: { bool: false, text: [] } })
                    }
                }
                break;
            case 'confirmpass':
                let pass = formData.password
                if (pass !== e.target.value) {
                    setErrors({ ...errors, confirmpass: { bool: true, text: 'Passwords doesn\'t match !' } })
                } else {
                    setErrors({ ...errors, confirmpass: { bool: false, text: '' } })
                }
                break
            case 'voterid':
                let voterid = formData.voterid
                // Validate voter id and setError if any occurs
                break
            default:
                break;
        }
        setFormdata({ ...formData, [e.target.name]: e.target.value })
    }
    const handleShowpassword = () => {
        setShowPass(!showPass);
    };
    const [showPass, setShowPass] = useState(false);
    const history = useHistory();

    return (
        <Container component="main" maxWidth="xs">
            {/* <CustomTicker message="Twitter Authentication will be
             available soon!!" /> */}
            {/* <ActionAlerts severity="info" message="LinkedIn Authentication is now Available! If there is any issue ping me via https://jjnanthakumar.github.io :)" /> */}
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutline />
                </Avatar>
                <Typography variant="h5">{Sign ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Input helperText={errors.mobile.text} error={errors.mobile.bool} value={formData.mobile} name="mobile" label="Mobile Number" handleChange={handleChange} />
                        <Input helperText={errors.voterid.text} error={errors.voterid.bool} value={formData.voterid} name="voterid" label="Voter Id" handleChange={handleChange} />
                        <Input helperText={errors.password.text} id="pass" error={errors.password.bool} value={formData.password} name="password" type={showPass ? "text" : "password"} handleShowpassword={handleShowpassword} label="Password" handleChange={handleChange} />
                        {Sign && (
                            <Input helperText={errors.confirmpass.text} error={errors.confirmpass.bool} value={formData.confirmpass} name="confirmpass" label="Confirm Password" type={showPass ? "text" : "password"} handleShowpassword={handleShowpassword} handleChange={handleChange} />
                        )}
                    </Grid>
                    <Button type="submit" className={classes.submit} fullWidth variant="contained" color="primary">
                        {Sign ? 'Sign Up' : 'Sign In'}
                    </Button>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button style={{ textTransform: 'capitalize' }} onClick={switchMode}>
                                {Sign ? "Already Have an Account? Log in" : "Don't have an account? Sign Up"}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container >

    )
}

export default Auth