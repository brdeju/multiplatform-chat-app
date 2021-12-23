import { StyleSheet } from 'react-native';

const blue = '#3777f0';
const grey = 'lightgrey';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
  },
  rightContainer: {
    flexDirection: 'row-reverse',
  },
  leftContainer: {
    flexDirection: 'row',
  },
  message: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '75%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  messageReply: {
    backgroundColor: 'gray',
    padding: 5,
    borderRadius: 5,
  },
  leftMessage: {
    backgroundColor: blue,
    marginLeft: 10,
  },
  rightMessage: {
    backgroundColor: grey,
    marginRight: 10,
  },
  image: {
    width: 40,
    height: 40,
  },
});
