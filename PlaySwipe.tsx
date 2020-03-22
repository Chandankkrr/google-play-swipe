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
import SectionHeader from './components/SectionHeader';
import SectionItem from './components/SectionItem';
import { DataType } from './data';


interface Header {
  content:{
    headerTitle: string,
    headerSubTitle: string,
    headerButton: JSX.Element,
  }
  styles?:{
    headerViewStyles?: StyleProp<ViewStyle>;
    headerTitleStyles?: StyleProp<TextStyle>;
    headerSubTitleStyles?: StyleProp<TextStyle>;
    headerButtonStyles?: StyleProp<ViewStyle>
  }
}

interface FeaturedImage {
  source: ImageSourcePropType,
  styles?:{
    imageContainerStyles?: StyleProp<ViewStyle>;
    imageStyles?: StyleProp<ImageStyle>;
  }
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

interface BackgroundTransition {
  transitionColors?: string[];
  transitionStyles?: StyleProp<ViewStyle>;
}

interface HorizontalScrollInterpolations {
  imageOpacityInterpolation?: Animated.InterpolationConfigType,
  backgroundTransitionColorInterpolation?: Animated.InterpolationConfigType,
  imagePositionInterpolation?: Animated.InterpolationConfigType,
}

interface PlaySwipeProps {
  content: DataType,
  header: Header,
  featuredImage: FeaturedImage;
  sectionItems: {
    content: SectionType[],
    styles?: SectionStyles
  },
  backgroundTransition?: BackgroundTransition;
  interpolations?: HorizontalScrollInterpolations;
  scrollViewStyles: StyleProp<ViewStyle>,
}

export default function PlaySwipe(props: PlaySwipeProps) {
  const {
    header,
    featuredImage,
    sectionItems,
    backgroundTransition,
    interpolations,
    scrollViewStyles,
  } = props;

  const {
    content: headerContent,
    styles: headerStyles,
  } = header;

  const {
    headerTitle,
    headerSubTitle,
    headerButton,
  } = headerContent;

  const {
    headerViewStyles,
    headerTitleStyles,
    headerSubTitleStyles,
  } = headerStyles || {};

  const {
    source: featuredImageSource,
    styles: featuredImageStyles,
  } = featuredImage;

  const {
    imageContainerStyles,
    imageStyles,
  } = featuredImageStyles || {};

  const {
    content: sectionItemContents,
    styles: sectionItemStyle,
  } = sectionItems;

  const {
    sectionStyle,
    sectionImageStyle,
    sectionTitleStyle,
    sectionSubTitleStyle,
  } = sectionItemStyle || {};

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
        styles={headerViewStyles}
        title={{
          content: headerTitle,
          styles: headerTitleStyles,
        }}
        subTitle={{
          content: headerSubTitle,
          styles: headerSubTitleStyles,
        }}
        button={headerButton}
      />
      <Animated.View style={[styles.fixed, imageContainerStyles,
        { opacity: imageOpacity, left: imagePosition }]}
      >
        <Image
          style={[styles.featuredImage, imageStyles]}
          source={featuredImageSource}
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
          { useNativeDriver: true },
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
        {sectionItemContents.map((item) => {
          const {
            title, description, imageSource,
          } = item;

          return (
            <SectionItem
              title={title}
              description={description}
              imageSource={imageSource}
              styles={{
                sectionStyle,
                sectionTitleStyle,
                sectionSubTitleStyle,
                sectionImageStyle,
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
    paddingTop: 15,
    paddingBottom: 15,
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
  featuredImage: {
    width: 200,
    height: 265,
  },
  fixed: {
    position: 'absolute',
    top: 50,
    right: 0,
  },
});
