import React, { useState } from 'react';
import { ListItemIcon, MenuItem, Menu, IconButton, Fade } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ShareIcon from '@material-ui/icons/Share';
import Tooltip from '@material-ui/core/Tooltip';
import {
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    PinterestIcon,
    RedditIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";
import {
    EmailShareButton, FacebookShareCount,
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import b64toBlob from 'b64-to-blob';
import { uploadImage } from '../api';
const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
    },
}));

function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();
    return <Tooltip arrow classes={classes} {...props} />;
}

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.success.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);
function blobToFile(theBlob, fileName) {
    return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
}
async function uploadImageFile(file) {
    const { signature, timestamp } = await (await uploadImage()).data
    const form = new FormData()
    form.append('file', file)
    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload?api_key=${process.env.REACT_APP_CLOUDINARY_KEY}&timestamp=${timestamp}&signature=${signature}`,
        {
            method: 'POST',
            body: form,
        }
    )
    const data = await res.json()
    return data.secure_url
}
async function base64tofile(base64) {
    var base64data = base64.split('base64,')[1];

    if (base64data !== undefined) {
        const blob = b64toBlob(base64data)
        const file = blobToFile(blob, `image${Math.floor(Math.random() * 10000)}`)
        return uploadImageFile(file).then(res => res)
    }
    return "https://mempro.netlify.app/mem.jpg"
}
export default function CustomizedMenus({ post, user, log }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [url, setUrl] = useState('');

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        base64tofile(post?.selectedFile).then(res => setUrl(res))
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-controls="customized-menu"
                aria-haspopup="true"
                onClick={handleClick}
                TransitionComponent={Fade}
                disabled={log}
            >
                <ShareIcon color="primary" style={{ color: log ? 'grey' : 'blue' }} />
            </IconButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem>
                    <ListItemIcon onClick={handleClose} style={{ justifyContent: "center" }}>
                        <BootstrapTooltip title="Share on Facebook">
                            <FacebookShareButton url="https://mempro.netlify.app/" style={{ cursor: log ? 'default' : 'pointer' }} quote={post.title + '\n\n' + post.message} hashtag={'#' + post.tags[0]}><FacebookIcon size="25" round={true} /></FacebookShareButton>
                        </BootstrapTooltip>
                        <FacebookShareCount url="https://mempro.netlify.app/">
                            {shareCount => <span>{shareCount}</span>}
                        </FacebookShareCount>
                    </ListItemIcon>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon onClick={handleClose} style={{ justifyContent: "center" }}>
                        <BootstrapTooltip title="Share on Whatsapp">
                            <WhatsappShareButton url="https://mempro.netlify.app/" style={{ cursor: log ? 'default' : 'pointer' }} title={post.title} separator=" "><WhatsappIcon size="25" round={true} /></WhatsappShareButton></BootstrapTooltip>
                    </ListItemIcon>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon onClick={handleClose} style={{ justifyContent: "center" }}>
                        <BootstrapTooltip title="Share on Twitter">
                            <TwitterShareButton url={url} title={post.title} hashtags={post.tags} via={'memories'} style={{ cursor: log ? 'default' : 'pointer' }}><TwitterIcon size="25" round={true} /></TwitterShareButton></BootstrapTooltip>
                    </ListItemIcon>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon onClick={handleClose} style={{ justifyContent: "center" }}>
                        <BootstrapTooltip title="Share on Telegram">
                            <TelegramShareButton url="https://mempro.netlify.app/" title={post.title} style={{ cursor: log ? 'default' : 'pointer' }}><TelegramIcon size="25" round={true} /></TelegramShareButton></BootstrapTooltip>
                    </ListItemIcon>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon onClick={handleClose} style={{ justifyContent: "center" }}>
                        <BootstrapTooltip title="Share on Linkedin">
                            <LinkedinShareButton url={url} title={post.title} summary={post.message} source="Memories App" color="primary"><LinkedinIcon size="25" round={true} /></LinkedinShareButton>
                        </BootstrapTooltip>
                    </ListItemIcon>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon onClick={handleClose} style={{ justifyContent: "center" }}>
                        <BootstrapTooltip title="Share on Pinterest">
                            <PinterestShareButton url="https://mempro.netlify.app/" media={url} title={post.title} style={{ cursor: log ? 'default' : 'pointer' }} description={post.message}><PinterestIcon size="25" round={true} /></PinterestShareButton></BootstrapTooltip>
                    </ListItemIcon>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon onClick={handleClose} style={{ justifyContent: "center" }}>
                        <BootstrapTooltip title="Share on Reddit">
                            <RedditShareButton url="https://mempro.netlify.app/" media={url} title={post.title} style={{ cursor: log ? 'default' : 'pointer' }} description={post.message}><RedditIcon size="25" round={true} /></RedditShareButton></BootstrapTooltip>
                    </ListItemIcon>
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon onClick={handleClose} style={{ justifyContent: "center" }}>
                        <BootstrapTooltip title="Share on E-mail">
                            <EmailShareButton url="https://mempro.netlify.app/" body={post.message} separator="\n" subject={post.title} style={{ color: "red", cursor: log ? 'default' : 'pointer' }} ><EmailIcon size="25" round={true} /></EmailShareButton></BootstrapTooltip>
                    </ListItemIcon>
                </StyledMenuItem>

            </StyledMenu>
        </div>
    );
}