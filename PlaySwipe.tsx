/* eslint-disable no-unused-vars */
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
  Platform,
  Dimensions,
  NativeSyntheticEvent,
  NativeTouchEvent,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SectionHeader from './components/SectionHeader';
import Movie from './components/Movie';
import { DataType } from './data';

interface ContentImage {
    contentImageSource: ImageSourcePropType,
    contentImageStyles?: StyleProp<ImageStyle>;
    contentImageContainerStyles?: StyleProp<ViewStyle>;
}

interface PlaySwipeProps {
  content: DataType,
  firstItemStyle: StyleProp<ViewStyle>,
  contentImage: ContentImage;
  backgroundGradient?: string[];
  imageOpacityInterpolation?: Animated.InterpolationConfigType,
  gradientColorInterpolation?: Animated.InterpolationConfigType,
  imagePositionInterpolation?: Animated.InterpolationConfigType,
  sectionHeaderOnClick: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  sectionItemOnClick: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

export default function PlaySwipe(props: PlaySwipeProps) {
  const {
    content,
    contentImage,
    firstItemStyle,
    backgroundGradient,
    imageOpacityInterpolation,
    gradientColorInterpolation,
    imagePositionInterpolation,
    sectionHeaderOnClick,
    sectionItemOnClick,
  } = props;
  const { contentImageSource, contentImageStyles, contentImageContainerStyles } = contentImage;
  const [scrollX] = useState(new Animated.Value(0));
  const imageOpacity = imageOpacityInterpolation || scrollX.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.3],
    extrapolate: 'clamp',
  });

  const gradientColor = gradientColorInterpolation || scrollX.interpolate({
    inputRange: [0, 100],
    outputRange: ['#019ae6', '#33afed'],
    extrapolate: 'clamp',
  });

  const imagePosition = imagePositionInterpolation || scrollX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const SPACING_FOR_CARD_INSET = Dimensions.get('window').width * 0.1 - 10;

  return (
    <LinearGradient
      colors={backgroundGradient || ['#019ae6', '#33afed']}
      style={{ flex: 0.5 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Animated.View style={[styles.component, { backgroundColor: gradientColor }]}>
        <SectionHeader
          title={{
            content: content.headerTitle,
          }}
          subTitle={{
            content: content.headerSubtitle,
          }}
          button={{
            content: '',
            onPress: sectionHeaderOnClick,
          }}
        />
        <Animated.View style={[contentImageContainerStyles || styles.fixed,
          { opacity: imageOpacity, left: imagePosition }]}
        >
          <Image
            style={contentImageStyles || styles.illustrationImage}
            source={contentImageSource}
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
          decelerationRate={0}
          snapToInterval={210}
          contentInset={{
            top: 0,
            left: SPACING_FOR_CARD_INSET,
            bottom: 0,
            right: SPACING_FOR_CARD_INSET,
          }}
          contentContainerStyle={{
            paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
          }}
        >
          {content.data.map((item, index) => (
            <Movie
              title={item.title}
              description={item.description}
              imageSource={{ uri: item.imageSource }}
              style={index === 0 ? firstItemStyle : null}
              key={item.title}
              onClick={sectionItemOnClick}
            />
          ))}
        </ScrollView>
      </Animated.View>
    </LinearGradient>
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
