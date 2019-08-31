import  React       from 'react';
import  {
            ScrollView,
            View,
            TouchableWithoutFeedback,
            Image, 
            Text,
            Animated,
            Easing,
        }           from 'react-native';
import  api         from '../services/api';
import  styles      from '../styles/UserBadgeStyles';
import  placeholder from '../assets/avatar-placeholder.png';



class UserBadge extends React.Component {

    constructor (props) {
        super(props);
        this.state                = {dev: {}};
        this.badgeTextWidth       = new Animated.Value(0);
        this.badgeTextMargin      = new Animated.Value(0);
        this.badgeImageMargin     = new Animated.Value(0);
        this.badgeBackgroundColor = new Animated.Value(0);
        this.loadLoggedDev        = this.loadLoggedDev.bind(this);
        this.revealUsername       = this.revealUsername.bind(this);
    }

    componentDidMount () {

        const { devId } = this.props;

        console.log('devId from ComponentWillMount: ', devId);
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

    revealUsername () {

        this.badgeTextWidth.setValue(0);
        this.badgeTextMargin.setValue(0);
        this.badgeImageMargin.setValue(0);
        this.badgeBackgroundColor.setValue(0);

        const maxValue        = 1,
              minValue        = 0,
              duration        = 500,
              delay           = 3000,
              easing          = Easing.ease,
              useNativeDriver = false;

        Animated.parallel([
            Animated.sequence([
                Animated.timing(this.badgeBackgroundColor, {
                    toValue: maxValue,
                    duration,
                    easing,
                    useNativeDriver,
                }),
                Animated.timing(this.badgeBackgroundColor, {
                    toValue: minValue,
                    duration,
                    delay,
                    easing,
                    useNativeDriver,
                }),
            ]),
            Animated.sequence([
                Animated.timing(this.badgeImageMargin, {
                    toValue: maxValue,
                    duration,
                    easing,
                    useNativeDriver,
                }),
                Animated.timing(this.badgeImageMargin, {
                    toValue: minValue,
                    duration,
                    delay,
                    easing,
                    useNativeDriver,
                }),
            ]),
            Animated.sequence([
                Animated.timing(this.badgeTextMargin, {
                    toValue: maxValue,
                    duration,
                    easing,
                    useNativeDriver,
                }),
                Animated.timing(this.badgeTextMargin, {
                    toValue: minValue,
                    duration,
                    delay,
                    easing,
                    useNativeDriver,
                }),
            ]),
            Animated.sequence([
                Animated.timing(this.badgeTextWidth, {
                    toValue: maxValue,
                    duration,
                    easing,
                    useNativeDriver,
                }),
                Animated.timing(this.badgeTextWidth, {
                    toValue: minValue,
                    duration,
                    delay,
                    easing,
                    useNativeDriver,
                }),
            ]),
        ]).start();
    }
    


    render () {

        const { dev: user }   = this.state,
              backgroundColor = this.badgeBackgroundColor.interpolate({
                                    inputRange:  [0, 1],
                                    outputRange: ['rgba(236, 142, 121, 0)', 'rgba(236, 142, 121, 1)'],
                                }),
              textWidth       = this.badgeTextWidth.interpolate({
                                    inputRange:  [0, 1],
                                    outputRange: [0, 100],
                                }),
              textMargin      = this.badgeTextWidth.interpolate({
                                    inputRange:  [0, 1],
                                    outputRange: [0, 16],
                                }),
              imageMargin     = this.badgeTextWidth.interpolate({
                                    inputRange:  [0, 1],
                                    outputRange: [0, 8],
                                }),
              badge           = user ?
                                (
                                    <Animated.View 
                                        style={[
                                            styles.container,
                                            {backgroundColor: backgroundColor}
                                        ]}
                                    >
                                        <Animated.Text 
                                            style={[
                                                styles.name,
                                                {marginLeft: textMargin, maxWidth: textWidth}  
                                            ]}
                                            numberOfLines={1}
                                        >
                                            {user.githubUsername}
                                        </Animated.Text>
                                        <TouchableWithoutFeedback onPress={this.revealUsername}>
                                            <Animated.Image
                                                style={[
                                                    styles.image,
                                                    {marginLeft: imageMargin}
                                                ]}
                                                source={user.avatar ? {uri: user.avatar} : placeholder}
                                                loadingIndicatorSource={placeholder}
                                            />
                                        </TouchableWithoutFeedback>
                                    </Animated.View>
                                ) :
                                <View />;

        return badge;
    }
}

export default UserBadge;