import React from 'react';
import {render} from 'react-dom';
import { Link } from 'react-router'

class Shell extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="Shell">
                <header className="Shell-heading">
                    <img src="/static/images/logo-subforum.png" alt="Subforum Design Group" className="Shell-logo" />

                    <nav className="Shell-navigation">
                        <span className="Shell-navigation-item Shell-navigation-item--label">Research</span>
                        <Link to="/topics/" className="Shell-navigation-item">Topics</Link>
                        <a href="#" className="Shell-navigation-item">Projects</a>
                        <a href="/" className="Shell-navigation-item">Articles</a>
                        <Link to="/team/" className="Shell-navigation-item">Team</Link>
                    </nav>
                </header>

                <section className="Shell-main">
                    {this.props.children}
                </section>

                <footer className="Shell-footer">
                    <nav className="Shell-navigation Shell-navigation--footer">
                        <span className="Shell-navigation-item Shell-navigation-item--label">&copy;2012 &ndash; 2016 Subforum</span>
                        <a href="/" className="Shell-navigation-item">Contact</a>
                        <a href="#" className="Shell-navigation-item">About Us</a>
                    </nav>

                    <a href="https://twitter.com/subforum/" target="_blank" className="Button u-marginBottomHalf">Follow @subforum</a>
                </footer>
            </div>
        );
    }
}

export default Shell;