import { StyleSheet } from 'react-native';

const   styles = StyleSheet.create({
            container: {
                position:      'absolute',
                zIndex:        10,
                flex:          1,
                flexDirection: 'row',
                alignItems:    'center',
                right:         6,
                top:           6,
                overflow:      'hidden',
                height:        36,
                minWidth:      36,
                borderRadius:  18,
            },
            name: {
                flexWrap:   'nowrap',
                textAlign:  'center',
                fontWeight: 'bold',
                color:      '#fff',
            },
            image: {
                overflow:     'hidden',
                height:       36,
                width:        36,
                borderRadius: 18,
            },
        });

export default styles;