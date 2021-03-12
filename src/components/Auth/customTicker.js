import './style.css';
import Ticker from 'react-ticker';
import { Typography } from '@material-ui/core';
export default function CustomTicker({ message }) {
    return (
        <Ticker mode="smooth">
            {({ index }) => (
                <div className="customticker">
                    <Typography variant="p" color="error">{message}</Typography>
                </div>
            )}
        </Ticker>
    )
}
