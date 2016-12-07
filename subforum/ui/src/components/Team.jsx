import React from 'react';
import {render} from 'react-dom';
import Shell from './Shell.jsx';

class Member extends React.Component {
    render () {
        const member = this.props.member;

        let memberImage = '';
        if(member.image) {
            let src = "/static/" + member.image;
            memberImage = <img src={src} className="Team-photo" />;
        }

        return (
            <article className="Grid-item u-textCenter">
                {memberImage}
                <p className="Team-name">{member.first_name} {member.last_name}</p>
            </article>
        );
    }
}

class Team extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        const team = this.props.team_data;

        return (
            <Shell>
                <header className="Team-heading">
                    <div className="Grid Grid--gutterHorizontal">
                        <div className="Grid-item">
                            <h1 className="Team-title">Team</h1>
                        </div>

                        <div className="Grid-item Grid-item--autoSize u-textRight">
                            <h2 className="Team-status">Members</h2>
                            <span className="Team-status-text">{team.length}</span>
                        </div>
                    </div>
                </header>

                <section className="Team-body">
                    <div className="Grid Grid--gutter">
                        {team.map(function(member) {
                            return <Member key={member.email} member={member} />;
                        })}
                    </div>
                </section>
            </Shell>
        );
    }
}

export default Team;