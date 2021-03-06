import useStyles from './style';

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
import { sendOTP } from '../../api';
import { toast } from 'react-toastify';

function Auth({ Sign, setSign, validData, voterIds, setFormdata, formData, errors, setErrors, switchMode, setLog, verified, setVerification }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [sent, setSent] = useState(false);
    const [stateOTP, setOTP] = useState("");
    const handleOTP = async (e) => {
        e.preventDefault();
        var { data } = await sendOTP({ mobile: formData.mobile });
        setOTP(data.otp);
        setSent(true);
    }
    const verify = (e) => {
        e.preventDefault();
        let otp = formData.otp
        if (otp === stateOTP) {
            setVerification(true)
            toast.success("Mobile verified successfully :)")
            setSent(false);
        }
        else {
            setVerification(false)
        }
        setOTP("");

    }
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
            case 'mobile':
                var data = validData.filter((item) => item.mobile === e.target.value)[0]
                if (data?.mobile !== e.target.value) {
                    setErrors({ ...errors, mobile: { bool: true, text: 'Mobile Number not exists :(' } })
                }
                else if (data.mobile === e.target.value) {
                    setErrors({ ...errors, mobile: { bool: false, text: '' } })
                }
                break;
            case 'voterid':
                let voterid = e.target.value
                if (!voterIds.includes(voterid)) {
                    setErrors({ ...errors, voterid: { bool: true, text: 'Voter Id is invalid :(' } })
                } else {
                    setErrors({ ...errors, voterid: { bool: false, text: '' } })
                }
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
                        <Input verified={verified} sent={sent} data={formData.mobile} Sign={Sign} setSent={setSent} helperText={errors.mobile.text} error={errors.mobile.bool} value={formData.mobile} name="mobile" label="Mobile Number" handleChange={handleChange} sendOTP={handleOTP} />
                        {sent && (
                            <>
                                <Input name="otp" helperText={errors.otp.text} error={errors.otp.bool} value={formData.otp} handleChange={handleChange} label="Enter OTP here" />
                                <Button onClick={verify} size="small" color="primary"><small>&nbsp; Verify OTP</small></Button>
                            </>
                        )}
                        <Input helperText={errors.voterid.text} error={errors.voterid.bool} value={formData.voterid} name="voterid" label="Voter Id" handleChange={handleChange} />
                        <Input helperText={errors.password.text} id="pass" error={errors.password.bool} value={formData.password} name="password" type={showPass ? "text" : "password"} handleShowpassword={handleShowpassword} label="Password" handleChange={handleChange} />

                        {Sign && (
                            <Input helperText={errors.confirmpass.text} error={errors.confirmpass.bool} value={formData.confirmpass} name="confirmpass" label="Confirm Password" type={showPass ? "text" : "password"} handleShowpassword={handleShowpassword} handleChange={handleChange} />
                        )}
                    </Grid>
                    <Button type="submit" disabled={!Sign ? !verified : false} className={classes.submit} fullWidth variant="contained" color="primary">
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