/* eslint-disable no-use-before-define */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  StyleSheet,
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
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SectionHeader, { SectionTitle, SectionSubTitle } from './components/SectionHeader';
import Section from './components/Section';
import { DataType } from './data';

interface ContentImage {
  contentImageSource: ImageSourcePropType,
  contentImageStyles?: StyleProp<ImageStyle>;
  contentImageContainerStyles?: StyleProp<ViewStyle>;
}

interface BackgroundTransition {
  transitionColors?: string[];
  transitionStyles?: StyleProp<ViewStyle>;
}

interface Header {
  headerTitle: SectionTitle,
  headerSubTitle: SectionSubTitle,
  headerButton: JSX.Element,
  headerStyles: StyleProp<ViewStyle>
}

interface SectionStyles {
  sectionStyle?: StyleProp<ViewStyle>,
  sectionImageStyle?: StyleProp<ImageStyle>,
  sectionTitleStyle?: StyleProp<TextStyle>,
  sectionSubTitleStyle?: StyleProp<TextStyle>
}

export interface SectionType {
  title: string;
  description: string;
  imageSource: ImageSourcePropType;
  key: string | number;
  onClick?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  sectionStyles?: SectionStyles
}

interface HorizontalScrollInterpolations {
  imageOpacityInterpolation?: Animated.InterpolationConfigType,
  backgroundTransitionColorInterpolation?: Animated.InterpolationConfigType,
  imagePositionInterpolation?: Animated.InterpolationConfigType,
}

interface PlaySwipeProps {
  content: DataType,
  contentImage: ContentImage;
  header: Header,
  sectionItems: SectionType[],
  backgroundTransition?: BackgroundTransition;
  interpolations?: HorizontalScrollInterpolations;
  scrollViewStyles: StyleProp<ViewStyle>,
}

export default function PlaySwipe(props: PlaySwipeProps) {
  const {
    header,
    contentImage,
    sectionItems,
    backgroundTransition,
    interpolations,
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

  const {
    imageOpacityInterpolation,
    backgroundTransitionColorInterpolation,
    imagePositionInterpolation,
  } = interpolations || {};

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

  const SPACING_FOR_CARD_INSET = Dimensions.get('window').width * 0.1 - 10;
  const {
    transitionColors = ['#019ae6', '#33afed'],
  } = backgroundTransition || {};

  const transitionColor = backgroundTransitionColorInterpolation
    ? scrollX.interpolate(backgroundTransitionColorInterpolation)
    : scrollX.interpolate({
      inputRange: [0, 100],
      outputRange: transitionColors,
      extrapolate: 'clamp',
    });

  return (
    <Animated.View style={[
      headerStyles || styles.component,
      { backgroundColor: transitionColor }]}
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
        {sectionItems.map((item) => {
          const {
            title, description, imageSource, sectionStyles,
          } = item;
          const {
            sectionStyle,
            sectionImageStyle,
            sectionTitleStyle,
            sectionSubTitleStyle,
          } = sectionStyles || {};
          return (
            <Section
              title={title}
              description={description}
              imageSource={imageSource}
              sectionStyles={{
                sectionStyle,
                sectionImageStyle,
                sectionTitleStyle,
                sectionSubTitleStyle,
              }}
              key={item.title}
              onClick={item.onClick}
            />
          );
        })}
      </ScrollView>
    </Animated.View>
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
