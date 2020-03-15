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
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SectionHeader from './components/SectionHeader';
import Movie from './components/Movie';
import data from './data';
import { Platform } from 'react-native';
import { Dimensions } from 'react-native';


export default function App() {
  const [scrollX] = useState(new Animated.Value(0));
  const imageOpacity = scrollX.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.3],
    extrapolate: 'clamp',
  });

  const gradientColor = scrollX.interpolate({
    inputRange: [0, 100],
    outputRange: ['#019ae6', '#33afed'],
    extrapolate: 'clamp',
  });

  const imagePosition = scrollX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const SPACING_FOR_CARD_INSET = Dimensions.get('window').width * 0.1 - 10;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#019ae6', '#33afed']}
        style={{ flex: 0.5 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Animated.View style={[styles.component, { backgroundColor: gradientColor }]}>
          <SectionHeader
            title={{
              content: data.headerTitle,
            }}
            subTitle={{
              content: data.headerSubtitle,
            }}
            button={{
              content: '',
              onPress: () => Alert.alert('Discover more!'),
            }}
          />
          <Animated.View style={[styles.fixed, { opacity: imageOpacity, left: imagePosition }]}>
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
         //   pagingEnabled // Enable paging
            decelerationRate={0} // Disable deceleration
            snapToInterval={210} // Calculate the size for a card including marginLeft and marginRight
            contentInset={{ // iOS ONLY
              top: 0,
              left: 0, // Left spacing for the very first card
              bottom: 0,
              right: 0, // Right spacing for the very last card
            }}
            contentContainerStyle={{ // contentInset alternative for Android
              paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0, // Horizontal spacing before and after the ScrollView
            }}
          >
            {data.data.map((item, index) => (
              <Movie
                title={item.title}
                description={item.description}
                imageSource={{ uri: item.imageSource }}
                style={index === 0 ? ({ marginLeft: 200 }) : null}
                key={item.title}
              />
            ))}
          </ScrollView>
        </Animated.View>
      </LinearGradient>
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
    padding: 15,
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
    top: 50,
    right: 0,
  },
});
