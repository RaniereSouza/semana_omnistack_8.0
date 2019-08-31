import  React        from 'react';
import  {
            KeyboardAvoidingView,
            Image,
            TextInput,
            TouchableOpacity,
            Text,
            Platform,
        }            from 'react-native';
import  AsyncStorage from '@react-native-community/async-storage';
import  api          from '../services/api';
import  styles       from '../styles/LoginStyles';
import  logo         from '../assets/logo.png';



class Login extends React.Component {

    constructor (props) {
        super(props);
        this.state            = {username: ''};
        this.handleLogin      = this.handleLogin.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
    }

    async componentDidMount () {

        try {

            const devId        = await AsyncStorage.getItem('devId'),
                { navigation } = this.props;

            if (devId !== null) {
                console.log(`devId already stored with value "${devId}"`);
                navigation.navigate('Main', {devId});
            }
        }
        catch (error) {
            console.log('error: ', error);
        }
    }



    async handleLogin () {

        console.log('this.state.username: ', this.state.username);

        try {
            
            const response        = await api.post('/devs', {
                                        githubUsername: this.state.username
                                    }),
                  { _id }         = response.data.dev,
                  { navigation }  = this.props;
                
            console.log('response.data: ', response.data);
            console.log('_id from handleLogin: ', _id);

            await AsyncStorage.setItem('devId', _id);
            navigation.navigate('Main', {devId: _id});
        }
        catch (error) {
            console.log('error: ', error);
        }
    }

    handleChangeText (value) {
        this.setState({username: value});
    }



    render () {
        return (
            <KeyboardAvoidingView 
                style={styles.container}
                behavior='padding'
                enabled={Platform.OS == 'ios'}
            >
                <Image source={logo} />
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={styles.textInput}
                    placeholder="Digite seu usuário no GitHub"
                    placeholderTextColor="#999"
                    value={this.state.username}
                    onChangeText={this.handleChangeText}
                />
                <TouchableOpacity onPress={this.handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

export default Login;