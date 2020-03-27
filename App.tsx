/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import data from './data';
import PlaySwipe from './PlaySwipe';

const { width, height } = Dimensions.get('window');

const { items } = data;
const sectionItems = items.map((item) => (
  {
    ...item,
    imageSource: {
      uri: item.imageSource,
    },
    key: item.title,
    onClick: () => Alert.alert(item.title),
  }
));

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.statusBar} />
      <PlaySwipe
       // content={data}
        header={{
          content: {
            headerTitle: 'Rentals from $0.99',
            headerSubTitle: 'Discover a new favourite',
            headerButton: (
              <TouchableOpacity
                onPress={() => Alert.alert('Discover more!')}
              >
                <Ionicons name="md-arrow-forward" size={28} color="#58646e" />
              </TouchableOpacity>
            ),
          },
          styles: {
            sectionHeaderStyles: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 15,
              paddingRight: 15,
            },
            headerViewStyles: {
              flex: 0.5,
              paddingTop: 15,
              paddingBottom: 15,
            },
            headerTitleStyles: {
              fontSize: 20,
              fontWeight: '400',
            },
            headerSubTitleStyles: {
              fontSize: 16,
              fontWeight: '200',
            },
          },
        }}
        featuredImage={{
          source: {
            uri: 'https://tinyurl.com/play-swipe',
            cache: 'default',
          },
          styles: {
            imageContainerStyles: {
              position: 'absolute',
              top: height * (3.5 / 100),
              right: 0,
              left: 0,
            },
            imageStyles: {
              width: width * (45 / 100),
              height: height * (45 / 100),
            },
          },
        }}
        swipeContainerStyles={{
          flex: 1,
          flexDirection: 'row',
          marginLeft: width * (40 / 100),
        }}
        cardItems={{
          content: sectionItems,
          styles: {
            sectionContainerStyle: {
              marginTop: 10,
              marginBottom: 10,
              margin: 10,
            },
            sectionImageStyle: {
              width: width * (35 / 100),
              height: height * (25 / 100),
              borderRadius: 15,
            },
            sectionTitleStyle: {
              fontSize: 18,
              fontWeight: '300',
              paddingTop: 15,
              marginBottom: 5,
            },
            sectionSubTitleStyle: {
              fontSize: 16,
              fontWeight: '200',
            },
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  statusBar: {
    height: Constants.statusBarHeight,
  },
});
