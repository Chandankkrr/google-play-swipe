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
  Platform,
  Dimensions,
  NativeSyntheticEvent,
  NativeTouchEvent,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SectionHeader, { SectionTitle, SectionSubTitle } from './components/SectionHeader';
import Movie from './components/Movie';
import { DataType, ContentType } from './data';

interface ContentImage {
  contentImageSource: ImageSourcePropType,
  contentImageStyles?: StyleProp<ImageStyle>;
  contentImageContainerStyles?: StyleProp<ViewStyle>;
}

interface GradientPoint {
  x: number,
  y: number
}
interface BackgroundGradient {
  gradientColors?: string[];
  gradientStart?: GradientPoint
  gradientEnd?: GradientPoint;
  backgroundGradientStyle?: StyleProp<ViewStyle>;
}

interface Header {
  headerTitle: SectionTitle,
  headerSubTitle: SectionSubTitle,
  headerButton: JSX.Element,
  headerStyles: StyleProp<ViewStyle>
}

export interface SectionType {
  title: string;
  description: string;
  imageSource: ImageSourcePropType;
  key: string | number;
  onClick?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  style?: {
    sectionStyle?: StyleProp<ViewStyle>,
    sectionImageStyle?: StyleProp<ImageStyle>,
    sectionTitleStyle?: StyleProp<TextStyle>,
    sectionSubTitleStyle?: StyleProp<TextStyle>
  }
}

interface PlaySwipeProps {
  content: DataType,
  contentImage: ContentImage;
  header: Header,
  sectionItems: SectionType[],
  // firstItemStyle?: StyleProp<ViewStyle>,
  backgroundGradient?: BackgroundGradient;
  imageOpacityInterpolation?: Animated.InterpolationConfigType,
  gradientColorInterpolation?: Animated.InterpolationConfigType,
  imagePositionInterpolation?: Animated.InterpolationConfigType,
  scrollViewStyles: StyleProp<ViewStyle>,
  // sectionItemOnClick: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

export default function PlaySwipe(props: PlaySwipeProps) {
  const {
    header,
    contentImage,
    sectionItems,
    backgroundGradient,
    imageOpacityInterpolation,
    gradientColorInterpolation,
    imagePositionInterpolation,
    scrollViewStyles,
  } = props;
  const {
    contentImageSource,
    contentImageStyles,
    contentImageContainerStyles,
  } = contentImage;
  const {
    headerTitle, headerSubTitle, headerButton, headerStyles,
  } = header;
  const [scrollX] = useState(new Animated.Value(0));
  const imageOpacity = imageOpacityInterpolation
    ? scrollX.interpolate(imageOpacityInterpolation)
    : scrollX.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0.3],
      extrapolate: 'clamp',
    });

  const imagePosition = imagePositionInterpolation
    ? scrollX.interpolate(imagePositionInterpolation)
    : scrollX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    });

  const gradientColor = gradientColorInterpolation
    ? scrollX.interpolate(gradientColorInterpolation)
    : scrollX.interpolate({
      inputRange: [0, 100],
      outputRange: ['#019ae6', '#33afed'],
      extrapolate: 'clamp',
    });


  const SPACING_FOR_CARD_INSET = Dimensions.get('window').width * 0.1 - 10;
  const {
    gradientColors,
    backgroundGradientStyle,
    gradientStart,
    gradientEnd,
  } = backgroundGradient;

  return (
    <LinearGradient
      colors={gradientColors || ['#019ae6', '#33afed']}
      style={[{ flex: 0.5 }, backgroundGradientStyle]}
      start={gradientStart || { x: 0, y: 0 }}
      end={gradientEnd || { x: 1, y: 0 }}
    >
      <Animated.View style={[
        headerStyles || styles.component,
        { backgroundColor: gradientColor }]}
      >
        <SectionHeader
          title={{
            content: headerTitle.content,
            styles: headerTitle.styles,
          }}
          subTitle={{
            content: headerSubTitle.content,
            styles: headerSubTitle.styles,
          }}
          button={headerButton}
        />
        <Animated.View style={[styles.fixed, contentImageContainerStyles,
          { opacity: imageOpacity, left: imagePosition }]}
        >
          <Image
            style={[styles.illustrationImage, contentImageStyles]}
            source={contentImageSource}
          />
        </Animated.View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={[styles.playSwipeContainer, scrollViewStyles]}
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
          {sectionItems.map((item) => (
            <Movie
              title={item.title}
              description={item.description}
              imageSource={item.imageSource}
              style={{
                sectionStyle: item.style.sectionStyle,

              }}
              key={item.title}
              onClick={item.onClick}
            />
          ))}
        </ScrollView>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    backgroundColor: '#21D4FD',
    padding: 15,
  },
  playSwipeContainer: {
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
