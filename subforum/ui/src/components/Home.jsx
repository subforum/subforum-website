import React from 'react';
import {render} from 'react-dom';
import Shell from './Shell.jsx';
import Markdown from 'react-remarkable';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        const topics = this.props.subforum_data;
        console.log(topics);

        return (
            <Shell>
                <div id="Main">
                    <h1>Welcome!</h1>
                    
                    <p><a href="/topics/">See all topics</a></p>
                </div>
            </Shell>
        );
    }
}

export default Home;