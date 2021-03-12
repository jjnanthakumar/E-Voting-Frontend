import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    borderRadius: '50%',
    border: 'solid 1px red',
    marginLeft: '10px'
  },
  gitbtn: {
    borderRadius: '50%',
    border: 'solid 1px black',
    marginLeft: '10px',
    color: 'black'

  },
  linkedinbtn:{
    borderRadius: '50%',
    border: 'solid 1px blue',
    marginLeft: '10px'
  },
  fbbtn: {
    borderRadius: '50%',
    border: 'solid 1px blue',
    marginLeft: '10px'

  }
}));