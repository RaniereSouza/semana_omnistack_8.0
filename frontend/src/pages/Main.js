import React       from 'react';
import { Link }    from 'react-router-dom';
import io          from 'socket.io-client';
import UserBadge   from '../components/UserBadge';
import api         from '../services/api';
import logo        from '../assets/logo.svg';
import dislike     from '../assets/dislike.svg';
import like        from '../assets/like.svg';
import placeholder from '../assets/avatar-placeholder.png';
import itsamatch   from '../assets/itsamatch.png';

import '../styles/Main.css';

class Main extends React.Component {

    constructor (props) {

        super(props);

        this.state = {
            socket: io('http://localhost:3001'),
            devs:   [],
            match:  false,
        };

        this.loadDevs      = this.loadDevs.bind(this);
        this.handleLike    = this.handleLike.bind(this);
        this.handleDislike = this.handleDislike.bind(this);

        this.state.socket.on('connect', () => {
            console.log('new socket connection: ', this.state.socket.id);
            this.state.socket.emit('bind_user', this.props.match.params.id);
        });

        this.state.socket.on('match', match => {
            console.log('it\'s a match! ');
            this.setState({match: match});
        });
    }

    componentDidMount () {

        const { params } = this.props.match;

        console.log('params.id from ComponentDidMount: ', params.id);
        this.loadDevs(params.id);
    }

    componentDidUpdate (prevProps) {

        const { params }             = this.props.match,
              { params: prevParams } = prevProps.match;

        if (params.id !== prevParams.id) {
            console.log('params.id from ComponentDidUpdate: ', params.id);
            this.state.socket.emit('bind_user', params.id);
            this.loadDevs(params.id);
        }
    }

    componentWillUnmount () {
        this.state.socket.close();
    }



    async handleDislike (id) {

        const { params } = this.props.match;

        console.log(`dislike user "${id}"`);
        await api.post(`devs/${id}/dislikes`, null, {
            headers: {
                "logged-id": params.id
            }
        });

        this.loadDevs(params.id);
    }

    async handleLike (id) {

        const { params } = this.props.match;

        console.log(`like user "${id}"`);
        await api.post(`devs/${id}/likes`, null, {
            headers: {
                "logged-id": params.id 
            }
        });

        this.loadDevs(params.id);
    }

    async loadDevs (loggedId) {

        const   response = await api.get('/devs', {
                    headers: {
                        "logged-id": loggedId
                    }
                });
        console.log('response.data.visible_users: ', response.data.visible_users);

        this.setState({devs: response.data.visible_users});
    }



    render () {

        const   { params }    = this.props.match,
                devs          = this.state.devs,
                match         = this.state.match,
                devCards      = devs.map(item => (
                                    <li key={'dev-' + item._id}>
                                        <img 
                                            src={item.avatar ? item.avatar : placeholder}
                                            alt={item.name ? item.name : item.githubUsername}
                                        />
                                        <footer>
                                            <strong>{item.name ? item.name : item.githubUsername}</strong>
                                            <p>{item.bio ? item.bio : ". . ."}</p>
                                        </footer>
                                        <div className="buttons">
                                            <button type="button" onClick={() => this.handleDislike(item._id)}>
                                                <img src={dislike} alt="Dislike" />
                                            </button>
                                            <button type="button" onClick={() => this.handleLike(item._id)}>
                                                <img src={like} alt="Like" />
                                            </button>
                                        </div>
                                    </li>
                                ));

        return (
            <div className="main-container">
                <UserBadge devId={params.id} />
                <Link to="/">
                    <img src={logo} alt="Tindev" />
                </Link>
                <ul>
                    {devs.length ? devCards : (
                        <div className="empty">Acabou! :(</div>
                    )}
                </ul>
                {match && (
                    <div className="match-container">
                        <img className="match-logo" src={itsamatch} alt ="It's a Match!" />
                        <img 
                            className="match-avatar"
                            src={match.avatar ? match.avatar : placeholder}
                            alt ={match.name ? match.name : match.githubUsername}
                        />
                        <strong className="match-name">{match.name ? match.name : match.githubUsername}</strong>
                        <p className="match-bio">{match.bio ? match.bio : '. . .'}</p>
                        <button 
                            className="match-close"
                            onClick={() => this.setState({match: false})}
                        >
                            &times;
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default Main;