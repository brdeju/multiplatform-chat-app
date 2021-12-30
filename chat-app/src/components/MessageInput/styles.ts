import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  messageContainer: {
    backgroundColor: '#f2f2f2',
    flex: 1,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#dedede',
    flexDirection: 'column',
    padding: 5,
  },
  imageContainer: {
    width: 160,
    height: 160,
    borderRadius: 25,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 25
  },
  removeBtn: {
    width: 16,
    height: 16,
    backgroundColor: '#ccc',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    top: 10,
  },
  input: {
    marginHorizontal: 5,
    minHeight: 28,
    fontSize: 16,
    marginRight: 30
  },
  icon: {
    marginHorizontal: 5,
  },
  addPhotoBtn: {
    width: 40,
    height: 40,
    backgroundColor: '#3777f0',
    borderRadius: 25,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtn: {
    width: 30,
    height: 30,
    backgroundColor: '#3777f0',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 35,
  },
});
