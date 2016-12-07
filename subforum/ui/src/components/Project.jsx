import React from 'react';
import {render} from 'react-dom';
import Shell from './Shell.jsx';
import Contributor from './Contributor.jsx';
import Markdown from 'react-remarkable';

class Article extends React.Component {
    render () {
        let article = this.props.article;
        let link = '/topic/' + this.props.topic_id + '/project/' + this.props.project_id + '/article/' + article.id + '/';

        return (
            <tr>
                <td style={{minWidth:"18.75rem"}}><a href={link}>{article.name}</a></td>
                <td>
                    {article.authors.map(function(author, index) {
                        return <Contributor key={author.email} contributor={author} index={index} length={article.authors.length} />;
                    })}
                </td>
                <td>{article.edit_date}</td>
            </tr>
        );
    }
}

class Project extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        let project = this.props.subforum_data;
        let topic_id = this.props.params.id[0];
        let project_id = project.id;

        return (
            <Shell>
                <header className="Topic-heading">
                    <div className="Grid Grid--gutterHorizontal">
                        <div className="Grid-item">
                            <h1 className="Topic-title">{project.name}</h1>
                        </div>

                        <div className="Grid-item Grid-item--autoSize u-textRight">
                            <h2 className="Topic-status">Leads</h2>
                            <span className="Topic-status-text">{project.contributors}</span>
                        </div>
                    </div>
                </header>

                <div className="Topic-body">
                    <p>{project.description}</p>

                    <table className="Table Table--dividers">
                        <thead className="Table-head">
                            <tr>
                                <th>Title</th>
                                <th>Authors</th>
                                <th>Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {project.articles.map(function(article) {
                                return <Article key={article.id} article={article} topic_id={topic_id} project_id={project_id} />;
                            })}
                        </tbody>
                    </table>
                </div>
            </Shell>
        );
    }
}

export default Project;