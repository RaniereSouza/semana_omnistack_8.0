import React from 'react';
import api   from '../services/api';
import logo  from '../assets/logo.svg';

import '../styles/Login.css';

class Login extends React.Component {

    constructor (props) {
        super(props);
        this.state        = {username: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }



    async handleSubmit (e) {

        e.preventDefault();
        console.log('username: ', this.state.username);
        
        const response = await api.post('/devs', {
            githubUsername: this.state.username
        });

        const { _id }     = response.data.dev,
              { history } = this.props; 

        history.push(`/dev/${_id}`);
    }

    handleChange (e) {
        this.setState({username: e.target.value});
    }


    
    render () {
        return (
            <div className="login-container">
                <form onSubmit={this.handleSubmit}>
                    <img src={logo} alt="Tindev" />
                    <input 
                        type="text"
                        placeholder="Digite seu usuário no GitHub"
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        );
    }
}

export default Login;