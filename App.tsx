/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Alert,
  NativeSyntheticEvent, NativeTouchEvent, ImageSourcePropType,
} from 'react-native';
import data, { DataType } from './data';
import PlaySwipe from './PlaySwipe';

export default function App() {
  return (
    <View style={styles.container}>
      <PlaySwipe
        content={data}
        firstItemStyle={{ marginLeft: 200 }}
        contentImage={{
          contentImageSource: { uri: 'https://assets-ouch.icons8.com/preview/408/f73e918d-4493-4902-9d53-6facb9dc6b27.png' },
          contentImageStyles: {
            width: 200,
            height: 265,
          },
          contentImageContainerStyles: {
            position: 'absolute',
            top: 50,
            right: 0,
          },
        }}
        backgroundGradient={['#019ae6', '#33afed']}
        sectionHeaderOnClick={() => Alert.alert('Discover more!')}
        sectionItemOnClick={() => Alert.alert('Clicked')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    paddingTop: 50,
  },
});
