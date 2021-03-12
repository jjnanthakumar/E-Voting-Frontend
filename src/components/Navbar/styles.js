import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 40px',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none !important',
  },
  image: {
    marginLeft: '15px',
  },
  logout: {
    fontSize: '1rem',
    textTransform: 'capitalize'
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'coloumn',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  userName: {
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center',
    fontSize: '1rem',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  [theme.breakpoints.down('sm')]: {
    button: {
      fontSize: '0.4rem',
    },
    heading:{
        marginLeft: '-30px',
    },
    image:{
      marginLeft: '6px'
    },
    profile: {
      marginLeft: '-40px'
    }
  }
}));