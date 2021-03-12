import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
export default makeStyles((theme) => ({
    media: {
        height: 0,
        paddingTop: '56.25%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
    },
    profile: {
        display: 'flex',
        padding: '10px',
        flexDirection: 'row'
    },
    userName: {
        padding: '4px',
        textTransform: 'capitalize',
        display: 'flex',
        fontSize: '1rem',
        alignItems: 'center',
    },
    border: {
        border: 'solid',
    },
    fullHeightCard: {
        height: '100%',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        position: 'relative',
    },
    overlay: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
    },
    overlay2: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        color: 'white',
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    comment: {
        borderRadius: '10px',
        boxShadow: '20px 2px 10px 10px pink'
    },
    comment_data: {
        borderRadius: '10px',
        border: 'solid 2px violet',
        marginLeft: '-30px',
        fontSize: '1rem',
        borderStyle: 'solid',
        borderWidth: '10px 0 0 20px !important',
        borderColor: 'transparent transparent transparent #ccc !important'
    },
    grid: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px',
    },
    title: {
        padding: '0 16px',
    },
    cardActions: {
        padding: '0 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-evenly',
    }
}))