import React from 'react';
import {render} from 'react-dom';
import Shell from './Shell.jsx';
import Markdown from 'react-remarkable';

class Topic extends React.Component {
    render () {
        let topic = this.props.topic;
        let link = '/topic/' + topic.id + '/';
        let options = {
            xhtmlOut:     true,
            breaks:       true,
            linkify:      true
        };

        return (
            <tr>
                <td><a href={link}>{topic.name}</a></td>
                <td><Markdown source={topic.description} options={options} /></td>
                <td>{topic.status}</td>
            </tr>
        );
    }
}

class TopicsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        const topics = this.props.subforum_data;
        const columnWidth = 150;

        console.log(this.props);

        return (
            <Shell>
                <header className="Topic-heading">
                    <div className="Grid Grid--gutterHorizontal">
                        <div className="Grid-item">
                            <h1 className="Topic-title">Topics</h1>
                        </div>
                    </div>
                </header>

                <div className="Topic-body">
                    <table className="Table Table--dividers">
                        <thead className="Table-head">
                            <tr>
                                <th style={{width: columnWidth + 'px'}}>Name</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topics.map(function(topic) {
                                return <Topic key={topic.id} topic={topic} />;
                            })}
                        </tbody>
                    </table>
                </div>
            </Shell>
        );
    }
}

export default TopicsList;