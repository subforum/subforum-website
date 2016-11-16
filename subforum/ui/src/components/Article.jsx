import React from 'react';
import {render} from 'react-dom';
import Shell from './Shell.jsx';
import Markdown from 'react-remarkable';

class Article extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        let article = this.props.subforum_data;
        let options = {
            xhtmlOut:     true,
            breaks:       true,
            linkify:      true
        };

        return (
            <Shell>
                <header className="Topic-heading">
                    <div className="Grid Grid--gutterHorizontal">
                        <div className="Grid-item">
                            <h1 className="Topic-title">{article.name}</h1>
                        </div>

                        <div className="Grid-item Grid-item--autoSize u-textRight">
                            <h2 className="Topic-status">Authors</h2>
                            <span className="Topic-status-text">{article.authors}</span>
                        </div>
                    </div>
                </header>

                <div className="Topic-body">
                    <p className="u-muted u-fontWeightBold">{article.edit_date}</p>

                    <Markdown source={article.content} options={options} />
                </div>
            </Shell>
        );
    }
}

export default Article;