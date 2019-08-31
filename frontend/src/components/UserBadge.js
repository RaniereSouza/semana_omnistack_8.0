import React       from 'react';
import api         from '../services/api';
import placeholder from '../assets/avatar-placeholder.png';

import '../styles/UserBadge.css';

class UserBadge extends React.Component {

    constructor (props) {
        super(props);
        this.state         = {dev: {}};
        this.loadLoggedDev = this.loadLoggedDev.bind(this);
    }

    componentDidMount () {

        const { devId } = this.props;

        console.log('devId from ComponentDidMount: ', devId);
        this.loadLoggedDev(devId);
    }

    componentDidUpdate (prevProps) {

        const { devId }            = this.props,
              { devId: prevDevId } = prevProps;

        if (devId !== prevDevId) {
            console.log('devId from ComponentDidUpdate: ', devId);
            this.loadLoggedDev(devId);
        }
    }



    async loadLoggedDev (devId) {

        const response = await api.get(`/dev/${devId}`);

        console.log('response.data.dev: ', response.data.dev);
        this.setState({dev: response.data.dev});
    }
    


    render () {

        const { dev: user }   = this.state,
              badge           = user ?
                                (
                                    <div className="user-badge-container">
                                        <div className="user-badge-name">{user.githubUsername}</div>
                                        <img
                                            className="user-badge-avatar"
                                            src={user.avatar ? user.avatar : placeholder}
                                            alt={user.githubUsername}
                                        />
                                    </div>
                                ) :
                                <div></div>;

        return badge;
    }
}

export default UserBadge;