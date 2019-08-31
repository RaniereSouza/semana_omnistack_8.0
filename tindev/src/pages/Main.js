import  React        from 'react';
import  {
            View,
            SafeAreaView,
            Image,
            Text,
            TouchableOpacity,
            TouchableWithoutFeedback,
            Dimensions,
            YellowBox,
            Animated,
            //Easing,
        }            from 'react-native';
import  AsyncStorage from '@react-native-community/async-storage';
import  ElasticStack from '@monterosa/react-native-elastic-stack';
import  io           from 'socket.io-client';
import  UserBadge    from '../components/UserBadge';
import  api          from '../services/api';
import  styles       from '../styles/MainStyles';
import  logo         from '../assets/logo.png';
import  placeholder  from '../assets/avatar-placeholder.png';
import  dislike      from '../assets/dislike.png';
import  like         from '../assets/like.png';
import  itsamatch    from '../assets/itsamatch.png';

YellowBox.ignoreWarnings([
    "Unrecognized WebSocket connection",
    "Warning: componentWillReceiveProps is deprecated",
]);



class Main extends React.Component {

    constructor (props) {

        super(props);

        this.state = {
            socket: io('http://localhost:3001'),
            devs:   [],
            match:  false,
        };

        this.topDevIndex      = 0;
        this.likeImageY       = new Animated.Value(0);
        this.likeImageZoom    = new Animated.Value(0);
        this.dislikeImageY    = new Animated.Value(0);
        this.dislikeImageZoom = new Animated.Value(0);

        this.loadDevs            = this.loadDevs.bind(this);
        this.handleLikeAPI       = this.handleLikeAPI.bind(this);
        this.handleDislikeAPI    = this.handleDislikeAPI.bind(this);
        this.handleLikeAction    = this.handleLikeAction.bind(this);
        this.handleDislikeAction = this.handleDislikeAction.bind(this);
        this.handleSwipeRight    = this.handleSwipeRight.bind(this);
        this.handleSwipeLeft     = this.handleSwipeLeft.bind(this);
        this.handleLogout        = this.handleLogout.bind(this);

        this.state.socket.on('connect', () => {
            console.log('new socket connection: ', this.state.socket.id);
            this.state.socket.emit('bind_user', this.props.navigation.getParam('devId'));
        });

        this.state.socket.on('match', match => {
            console.log('it\'s a match! ');
            this.setState({match: match});
        });
    }

    componentDidMount () {

        const devId = this.props.navigation.getParam('devId');

        console.log('devId from ComponentDidMount: ', devId);
        this.loadDevs(devId);
    }

    componentDidUpdate (prevProps) {

        const devId      = this.props.navigation.getParam('devId'),
              prevDevId  = prevProps.navigation.getParam('devId');

        if (devId !== prevDevId) {
            console.log('devId from ComponentDidUpdate: ', devId);
            this.state.socket.emit('bind_user', devId);
            this.loadDevs(devId);
        }
    }

    componentWillUnmount () {
        this.topDevIndex = 0;
        this.state.socket.close();
    }



    handleSwipeLeft (itemIndex) {

        let newTopIndex = this.topDevIndex;
        newTopIndex++;

        if (newTopIndex >= this.state.devs.length) newTopIndex = 0;
        console.log('newTopIndex from handleSwipeLeft: ', newTopIndex);
        this.topDevIndex = newTopIndex;

        this.handleDislikeAction(itemIndex);
    }
    
    handleSwipeRight (itemIndex) {

        let newTopIndex = this.topDevIndex;
        newTopIndex++;

        if (newTopIndex >= this.state.devs.length) newTopIndex = 0;
        console.log('newTopIndex from handleSwipeRight: ', newTopIndex);
        this.topDevIndex = newTopIndex;

        this.handleLikeAction(itemIndex);
    }

    async handleDislikeAction (itemIndex, reload) {

        const maxValue        = 1,
              minValue        = 0,
              friction        = 2,
              tension         = 80,
              speed           = 24,
              useNativeDriver = true;

        this.dislikeImageY.setValue(minValue);
        this.dislikeImageZoom.setValue(minValue);

        Animated.parallel([
            Animated.sequence([
                Animated.spring(this.dislikeImageY, {
                    toValue: maxValue,
                    tension,
                    friction,
                    // speed,
                    useNativeDriver,
                }),
                 Animated.spring(this.dislikeImageY, {
                    toValue: minValue,
                    // friction,
                    speed,
                    useNativeDriver,
                }),
            ]),
            Animated.sequence([
                Animated.spring(this.dislikeImageZoom, {
                    toValue: maxValue,
                    tension,
                    friction,
                    // speed,
                    useNativeDriver,
                }),
                Animated.spring(this.dislikeImageZoom, {
                    toValue: minValue,
                    // friction,
                    speed,
                    useNativeDriver,
                }),
            ]),
        ]).start(() => this.handleDislikeAPI(itemIndex, reload));
    }

    async handleLikeAction (itemIndex, reload) {

        const maxValue        = 1,
              minValue        = 0,
              friction        = 2,
              tension         = 80,
              speed           = 24,
              useNativeDriver = true;

        this.likeImageY.setValue(minValue);
        this.likeImageZoom.setValue(minValue);
        
        Animated.parallel([
            Animated.sequence([
                Animated.spring(this.likeImageY, {
                    toValue: maxValue,
                    tension,
                    friction,
                    // speed,
                    useNativeDriver,
                }),
                 Animated.spring(this.likeImageY, {
                    toValue: minValue,
                    // friction,
                    speed,
                    useNativeDriver,
                }),
            ]),
            Animated.sequence([
                Animated.spring(this.likeImageZoom, {
                    toValue: maxValue,
                    tension,
                    friction,
                    // speed,
                    useNativeDriver,
                }),
                Animated.spring(this.likeImageZoom, {
                    toValue: minValue,
                    // friction,
                    speed,
                    useNativeDriver,
                }),
            ]),
        ]).start(() => this.handleLikeAPI(itemIndex, reload));
    }

    async handleDislikeAPI (itemIndex, reload) {

        console.log('itemIndex from handleDislikeAPI: ', itemIndex);

        const devId       = this.props.navigation.getParam('devId'),
              firstDev    = ((typeof itemIndex == 'number') && (itemIndex >= 0)) ?
                            this.state.devs[itemIndex] :
                            this.state.devs[this.topDevIndex],
              rest        = this.state.devs.filter(item => (item._id !== firstDev._id));

        try {

            console.log('firstDev: ', firstDev); 
            console.log(`dislike user "${firstDev._id}"`);
            await api.post(`devs/${firstDev._id}/dislikes`, null, {
                headers: {
                    "logged-id": devId
                }
            });

            if (reload === true) this.setState({devs: rest});
        }
        catch (error) {
            console.log('error: ', error);
        }
    }

    async handleLikeAPI (itemIndex, reload) {

        console.log('itemIndex from handleLikeAPI: ', itemIndex);

        const devId       = this.props.navigation.getParam('devId'),
              firstDev    = ((typeof itemIndex == 'number') && (itemIndex >= 0)) ?
                            this.state.devs[itemIndex] :
                            this.state.devs[this.topDevIndex],
              rest        = this.state.devs.filter(item => (item._id !== firstDev._id));

        try {

            console.log('firstDev: ', firstDev);
            console.log(`like user "${firstDev._id}"`);
            await api.post(`devs/${firstDev._id}/likes`, null, {
                headers: {
                    "logged-id": devId
                }
            });

            if (reload === true) this.setState({devs: rest});
        }
        catch (error) {
            console.log('error: ', error);
        }
    }

    async loadDevs (loggedId) {

        try {

            const   response = await api.get('/devs', {
                        headers: {
                            "logged-id": loggedId
                        }
                    });
            console.log('response.data.visible_users: ', response.data.visible_users);

            this.topDevIndex = 0;
            this.setState({devs: response.data.visible_users});
        }
        catch (error) {
            console.log('error: ', error);
        }
    }

    async handleLogout () {

        const { navigation } = this.props;

        await AsyncStorage.clear();
        return navigation.navigate('Login');
    }



    render () {

        const devs        = this.state.devs,
              devId       = this.props.navigation.getParam('devId'),
              match       = this.state.match,
              likeY       = this.likeImageY.interpolate({
                                inputRange:  [0, 1],
                                outputRange: [0, -40],
                            }),
              likeZoom    = this.likeImageZoom.interpolate({
                                inputRange:  [0, 1],
                                outputRange: [1, 2],
                            }),
              dislikeY    = this.dislikeImageY.interpolate({
                                inputRange:  [0, 1],
                                outputRange: [0, -40],
                            }),
              dislikeZoom = this.dislikeImageZoom.interpolate({
                                inputRange:  [0, 1],
                                outputRange: [1, 2],
                            });

        return (
            <SafeAreaView style={styles.container}>
                <UserBadge devId={devId} />
                <TouchableOpacity onPress={this.handleLogout}>
                    <Image style={styles.logo} source={logo} />
                </TouchableOpacity>
                <View style={styles.cardsContainer}>{(devs.length > 0) ? (
                    <ElasticStack
                        items={devs}
                        itemWidth={Number(Dimensions.get('window').width)}
                        renderItem={item => (
                            <View style={styles.card} key={'dev-' + item._id}>
                                <Image 
                                    style={styles.avatar}
                                    source={item.avatar ? {uri: item.avatar} : placeholder}
                                    loadingIndicatorSource={placeholder}
                                />
                                <View style={styles.footer}>
                                    <Text style={styles.name}>{item.name ? item.name : item.githubUsername}</Text>
                                    <Text style={styles.bio} numberOfLines={4}>{item.bio ? item.bio : '. . .'}</Text>
                                </View>
                            </View>
                        )}
                        onSwipedLeft={this.handleSwipeLeft}
                        onSwipedRight={this.handleSwipeRight}
                        infinite={false}
                        onStackEnded={() => this.loadDevs(devId)}
                        activeItemIndex={this.topDevIndex}
                        elastickItemsCount={3}
                        rotateDegree={10}
                        reduceOpacityBy={0}
                        distDrag={(Number(Dimensions.get('window').width) / 2) - 40}
                        directions={[false, true, false, true]}
                    />
                ) : (
                    <Text style={styles.empty}>Acabou! :(</Text>
                )}</View>
                {(devs.length > 0) && (
                    <View style={styles.buttonsContainer}>
                        <TouchableWithoutFeedback onPress={() => this.handleDislikeAction(false, true)}>
                            <Animated.View style={[styles.button, styles.buttonDislike]}>
                                <Animated.Image
                                    style={[styles.buttonImage, {
                                        transform: [
                                            {translateY: dislikeY},
                                            {scale:      dislikeZoom},
                                        ]
                                    }]}
                                    source={dislike}
                                />
                            </Animated.View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.handleLikeAction(false, true)}>
                            <Animated.View style={[styles.button, styles.buttonLike]}>
                                <Animated.Image
                                    style={[styles.buttonImage, {
                                        transform: [
                                            {translateY: likeY},
                                            {scale:      likeZoom},
                                        ]
                                    }]}
                                    source={like}
                                />
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </View>
                )}
                {match && (
                    <View style={styles.matchContainer}>
                        <Image style={styles.matchLogo} source={itsamatch}/>
                        <Image 
                            style={styles.matchAvatar}
                            source={match.avatar ? {uri: match.avatar} : placeholder}
                            loadingIndicatorSource={placeholder}
                        />
                        <Text style={styles.matchName}>{match.name ? match.name : match.githubUsername}</Text>
                        <Text style={styles.matchBio} numberOfLines={4}>{match.bio ? match.bio : '. . .'}</Text>
                        <TouchableOpacity style={styles.matchCloseContainer} onPress={() => this.setState({match: false})}>
                            <Text style={styles.matchClose}>&times;</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
        );
    }
}

export default Main;