import { StyleSheet } from 'react-native';

const   styles = StyleSheet.create({
            container: {
                flex:            1,
                padding:         30,
                backgroundColor: '#f5f5f5',
                justifyContent:  'center',
                alignItems:      'center'
            },
            textInput: {
                marginTop:         20,
                alignSelf:         'stretch',
                height:            48,
                borderRadius:      4,
                borderWidth:       1,
                borderColor:       '#e6694d',
                paddingHorizontal: 20,
                backgroundColor:   '#fff', 
                fontSize:          16,
                color:             '#666',
            },
            button: {
                marginTop:         10,
                alignSelf:         'stretch',
                borderRadius:      4,
                borderWidth:       0,
                height:            48,
                paddingHorizontal: 20,
                justifyContent:    'center',
                alignItems:        'center',
                backgroundColor:   '#df4723',
            },
            buttonText: {
                fontSize:   16,
                fontWeight: 'bold',
                color:      '#fff',
            }
        });

export default styles;