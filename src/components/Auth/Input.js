import { TextField, Grid, InputAdornment, Button, IconButton, FormHelperText } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
const Input = ({ sent, setSent, data, id, inputRef, value, half, name, handleChange, label, autoFocus, type, handleShowpassword, error, helperText, sendOTP, Sign, verified }) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField id={id} error={error} ref={inputRef} value={value} name={name} onChange={handleChange} required fullWidth variant="outlined" label={label} autoFocus={autoFocus} type={type} InputProps={name === 'password' ? {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowpassword}>
                            {type === 'password' ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment >
                ),
            } : null}
            ></TextField >{(name === 'mobile' && !Sign) ? (<Button onClick={sendOTP} disabled={data.length !== 10 || verified} size="small" color="primary"><small>{sent ? 'Resend OTP' : (verified ? 'Verified Successfully' : 'Send OTP')}</small></Button>) : null}
            {name === 'password' && typeof (helperText) === 'object' ?
                <FormHelperText id={name} error={error}>
                    {helperText.map((item) => {
                        return (
                            <>
                                {item}<br />
                            </>
                        )
                    })}
                </FormHelperText> :
                <FormHelperText id={name} error={error}>{helperText}</FormHelperText>
            }

        </Grid >
    )
}
export default Input;