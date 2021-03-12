import SocialLogin from 'react-social-login';
import React from 'react';
import { Button } from '@material-ui/core';
class SocialLoginButton extends React.Component {

    render() {
        return (
            <Button onClick={this.props.triggerLogin} {...this.props}>
                { this.props.children}
            </Button>
        );
    }
}

export default SocialLogin(SocialLoginButton);