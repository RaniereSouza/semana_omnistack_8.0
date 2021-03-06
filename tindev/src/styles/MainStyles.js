import { StyleSheet } from 'react-native';

const   styles = StyleSheet.create({
            container: {
                flex:            1,
                backgroundColor: '#f5f5f5',
                alignItems:      'center',
                justifyContent:  'space-between',
            },
            logo: {
                marginTop: 15,
            },
            cardsContainer: {
                flex:           1,
                alignSelf:      'stretch',
                justifyContent: 'center',
                maxHeight:      500,
            },
            card: {
                flex:                 1,
                alignSelf:            'stretch',
                borderTopLeftRadius:  15,
                borderTopRightRadius: 15,
                overflow:             'hidden',
                marginHorizontal:     40,
                marginTop:            25,
                marginBottom:         25,
                top:                  0,
                left:                 0,
                right:                0,
                bottom:               0,
            },
            avatar: {
                flex:            1,
                height:          300,
                width:           300,
                backgroundColor: '#e5e5e5', 
            },
            footer: {
                backgroundColor:         '#fff',
                borderBottomLeftRadius:  15,
                borderBottomRightRadius: 15,
                paddingHorizontal:       20,
                paddingVertical:         15,
                borderLeftWidth:         1,
                borderLeftColor:         '#e5e5e5',
                borderRightWidth:        1,
                borderRightColor:        '#e5e5e5',
                borderBottomWidth:       1,
                borderBottomColor:       '#e5e5e5',
            },
            name: {
                fontSize:   16,
                color:      '#333',
                fontWeight: 'bold',
            },
            bio: {
                fontSize:   14,
                lineHeight: 20,
                color:      '#999',
                marginTop:  5
            },
            buttonsContainer: {
                flexDirection:    'row',
                marginTop:        10,
                marginBottom:     10,
                marginHorizontal: 40,
            },
            button: {
                height:           60,
                flexGrow:         1,
                backgroundColor:  '#fff',
                justifyContent:   'center',
                alignItems:       'center',
                alignSelf:        'stretch',
                marginHorizontal: 0,
                elevation:        2,
                borderTopWidth:   1,
                borderTopColor:   '#e5e5e5',
                borderTopWidth:   1,
                borderTopColor:   '#e5e5e5',
                shadowColor:      "#000",
                shadowOpacity:    0.05,
                shadowRadius:     2,
                shadowOffset: {
                    horizontal: 0,
                    vertical:   2,
                },
            },
            buttonDislike: {
                borderTopLeftRadius:    30,
                borderBottomLeftRadius: 30,
                borderRightWidth:       0.5,
                borderRightColor:       '#e5e5e5',
                borderLeftWidth:        1,
                borderLeftColor:        '#e5e5e5',
            },
            buttonLike: {
                borderTopRightRadius:    30,
                borderBottomRightRadius: 30,
                borderLeftWidth:         0.5,
                borderLeftColor:         '#e5e5e5',
                borderRightWidth:        1,
                borderRightColor:        '#e5e5e5',
            },
            empty: {
                fontSize:   32,
                color:      '#999',
                fontWeight: 'bold',
                alignSelf:  'center',
            },
            matchContainer: {
            	...StyleSheet.absoluteFill,
                zIndex:          999,
                elevation:       3,
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                justifyContent:  'center',
                alignItems:      'center',
            },
            matchLogo: {
                width:      250,
                resizeMode: 'contain',
            },
            matchAvatar: {
                marginVertical:  25,
                height:          150,
                width:           150,
                borderRadius:    75,
                overflow:        'hidden',
                borderWidth:     5,
                borderColor:     '#f5f5f5',
                backgroundColor: '#e5e5e5',
            },
            matchName: {
                maxWidth:   300,
                textAlign:  'center',
                color:      '#f5f5f5',
                fontWeight: 'bold',
                fontSize:   32,
            },
            matchBio: {
                color:      'rgba(255, 255, 255, 0.75)',
                marginTop:  10,
                maxWidth:   300,
                textAlign:  'center',
                lineHeight: 25,
                fontSize:   16,
            },
            matchCloseContainer: {
                position: 'absolute',
                left:     16,
                top:      -8,
            },
            matchClose: {
                color:      '#f5f5f5',
                fontSize:   54,
                fontWeight: '100',
            },
        });

export default styles;