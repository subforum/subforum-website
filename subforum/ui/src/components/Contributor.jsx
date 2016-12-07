import React from 'react';
import {render} from 'react-dom';

class Contributor extends React.Component {
    render () {
        let contributor = this.props.contributor;
        let contributor_text = contributor.first_name + ' ' + contributor.last_name;

        if(this.props.index < this.props.length - 1) {
            contributor_text = contributor_text + ', ';
        }

        return (
            <span>{contributor_text}</span>
        );
    }
}

export default Contributor;