import React from 'react';
import './LoginError.css';
import {Link} from "react-router-dom";

class LoginError extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error) {
        return {hasError: true};
    }

    render() {
        
        if (this.state.hasError) { 
            return (
                <section className="login-error">
                    <div className="error"><p>User Access Error - please log in again using the test account;</p> </div>
                    <Link to="/" style={{textDecoration: 'none'}}>
                    <button>
                        LOGIN TO SPOTIFY
                    </button>
                    </Link>
                </section>
            )
        }
        
        return this.props.children;
    }
}

export default LoginError;