import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default StyleSheet.create({
  buttonStyle: {
    backgroundColor: Colors.light.buttons.primary,
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: Colors.light.buttons.primary,
    height: 40,
    alignItems: 'center',
    borderRadius: 6,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
});
