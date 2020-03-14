/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import SectionHeader from './components/SectionHeader';
import Movie from './components/Movie';
import data from './data';

export default function App() {
  const [scrollX] = useState(new Animated.Value(0));
  const imageOpacity = scrollX.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.3],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <View style={styles.component}>
        <SectionHeader
          title={{
            content: data.headerTitle,
          }}
          subTitle={{
            content: data.headerSubtitle,
          }}
          button={{
            content: '>',
            onPress: () => console.log('Pressed'),
          }}
        />
        <Animated.View style={[styles.fixed, { opacity: imageOpacity }]}>
          <Image
            style={styles.illustrationImage}
            source={{ uri: 'https://assets-ouch.icons8.com/preview/408/f73e918d-4493-4902-9d53-6facb9dc6b27.png' }}
          />
        </Animated.View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.playSwipeContainer}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            }],
          )}
        >
          {data.data.map((item, index) => (index === 0
            ? (
              <Movie
                title={item.title}
                description={item.description}
                imageSource={{ uri: item.imageSource }}
                style={{ marginLeft: 200 }}
                key={item.title}
              />
            ) : (
              <Movie
                title={item.title}
                description={item.description}
                imageSource={{ uri: item.imageSource }}
                key={item.title}
              />
            )))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
    paddingTop: 50,
  },
  component: {
    flex: 1,
    // backgroundColor: '#21D4FD',
    padding: 10,
  },
  header: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubTitle: {
    fontSize: 14,
    fontWeight: '300',
  },
  discoverButton: {
    width: 10,
  },
  playSwipeContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingTop: 10,
  },
  section: {
    width: 150,
    height: 200,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  swipeImage: {
    width: 125,
    height: 200,
    borderRadius: 10,
  },
  illustrationImage: {
    width: 200,
    height: 265,
  },
  fixed: {
    position: 'absolute',
    top: 49,
    left: 0,
    right: 0,
  },
});
