import React from 'react';
import {render} from 'react-dom';
import Shell from './Shell.jsx';
import Contributor from './Contributor.jsx';
import Markdown from 'react-remarkable';

class Project extends React.Component {
    render () {
        const project = this.props.project;
        let link = '/topic/' + this.props.topicId + '/project/' + project.id + '/';

        return (
            <tr>
                <td style={{minWidth:"18.75rem"}}><a href={link}>{project.name}</a></td>
                <td>
                    {project.leads.map(function(lead, index) {
                        return <Contributor key={lead.email} contributor={lead} index={index} length={project.leads.length} />;
                    })}
                </td>
                <td className="u-textRight">{project.edit_date}</td>
            </tr>
        );
    }
}

class Article extends React.Component {
    render () {
        const article = this.props.article;
        let projectLink = '/topic/' + this.props.topicId + '/project/' + article.project_id + '/';
        let articleLink = '/topic/' + this.props.topicId + '/project/' + article.project_id + '/article/' + article.id + '/';

        return (
            <tr>
                <td style={{minWidth:"18.75rem"}}><a href={articleLink}>{article.name}</a></td>
                <td><a href={projectLink}>{article.project_name}</a></td>
                <td>
                    {article.authors.map(function(author, index) {
                        return <Contributor key={author.email} contributor={author} index={index} length={article.authors.length} />;
                    })}
                </td>
                <td className="u-textRight">{article.edit_date}</td>
            </tr>
        );
    }
}

class Topic extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        const id = this.props.routeParams.id - 1;
        const topic = this.props.subforum_data[id];
        const projectCount = topic.projects.length;
        const articleCount = topic.articles.length;
        let options = {
            xhtmlOut:     true,
            breaks:       true,
            linkify:      true
        };
        const columnWidth = 200;
        console.log(topic);

        let imgSrc = '';
        if(topic.image) {
            let src = "/static/" + topic.image;
            imgSrc = <div className="Grid-item Grid-item--autoSize"><img src={src} className="Topic-image" alt="" /></div>;
        }

        return (
            <Shell>
                <header className="Topic-heading">
                    <div className="Grid Grid--gutterHorizontal">
                        <div className="Grid-item">
                            <h1 className="Topic-title">{topic.name}</h1>
                        </div>

                        <div className="Grid-item Grid-item--autoSize u-textRight">
                            <h2 className="Topic-status">Status</h2>
                            <span className="Topic-status-text">{topic.status}</span>
                        </div>

                        <div className="Grid-item Grid-item--autoSize u-textRight">
                            <h2 className="Topic-status">Projects</h2>
                            <span className="Topic-status-text">{projectCount}</span>
                        </div>

                        <div className="Grid-item Grid-item--autoSize u-textRight">
                            <h2 className="Topic-status">Articles</h2>
                            <span className="Topic-status-text">{articleCount}</span>
                        </div>
                    </div>
                </header>

                <div className="Topic-body">
                    <div className="Grid Grid--full b2-Grid--fit Grid--gutterHorizontal u-marginBottom">
                        {imgSrc}

                        <div className="Grid-item">
                            <h2 className="u-subheadText u-paddingTop b2-u-paddingFlush">About this Topic</h2>

                            <div className="u-fontWeightLight">
                                <Markdown source={topic.description} options={options} />
                            </div>
                        </div>
                    </div>


                    <h2 className="Topic-statusHeading">Projects</h2>

                    <table className="Table Table--dividers u-marginBottomOneAndHalf">
                        <thead className="Table-head">
                            <tr>
                                <th style={{width: columnWidth + 'px'}}>Name</th>
                                <th>Leads</th>
                                <th className="u-textRight">Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topic.projects.map(function(project) {
                                return <Project key={project.id} project={project} topicId={topic.id} />;
                            })}
                        </tbody>
                    </table>

                    <h2 className="Topic-statusHeading">Articles</h2>

                    <table className="Table Table--dividers">
                        <thead className="Table-head">
                            <tr>
                                <th style={{width: columnWidth + 'px'}}>Name</th>
                                <th>Project</th>
                                <th>Authors</th>
                                <th className="u-textRight">Published</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topic.articles.map(function(article) {
                                return <Article key={article.id} article={article} topicId={topic.id} />;
                            })}
                        </tbody>
                    </table>
                </div>
            </Shell>
        );
    }
}

export default Topic;