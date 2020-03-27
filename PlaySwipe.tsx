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
  View,
} from 'react-native';
import Header from './components/Header';
import Card from './components/Card';

interface Header {
  content:{
    headerTitle: string,
    headerSubTitle?: string,
    headerButton: JSX.Element,
  }
  styles?:{
    sectionHeaderStyles?: StyleProp<ViewStyle>;
    headerViewStyles?: StyleProp<ViewStyle>;
    headerTitleStyles?: StyleProp<TextStyle>;
    headerSubTitleStyles?: StyleProp<TextStyle>;
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
  sectionContainerStyle?: StyleProp<ViewStyle>,
  sectionImageStyle?: StyleProp<ImageStyle>,
  sectionTitleStyle?: StyleProp<TextStyle>,
  sectionSubTitleStyle?: StyleProp<TextStyle>
}

export interface Card {
  title: string;
  description?: string;
  imageSource: ImageSourcePropType;
  key: string | number;
  onClick?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  sectionStyles?: SectionStyles
}

interface HorizontalScrollInterpolations {
  imageOpacityInterpolationConfig?: Animated.InterpolationConfigType;
  backgroundTransitionInterpolationConfig?: Animated.InterpolationConfigType;
  imagePositionInterpolationConfig?: Animated.InterpolationConfigType;
}

interface CardItems {
    content: Card[];
    styles?: SectionStyles;
}

interface PlaySwipeProps {
  header: Header;
  featuredImage: FeaturedImage;
  cardItems: CardItems;
  swipeContainerStyles?: StyleProp<ViewStyle>;
  interpolations?: HorizontalScrollInterpolations;
}

export default function PlaySwipe(props: PlaySwipeProps) {
  const {
    header,
    featuredImage,
    cardItems,
    swipeContainerStyles,
    interpolations,
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
    sectionHeaderStyles,
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
    content: cardItemContent,
    styles: cardItemStyles,
  } = cardItems;

  const {
    sectionContainerStyle,
    sectionImageStyle,
    sectionTitleStyle,
    sectionSubTitleStyle,
  } = cardItemStyles || {};

  const {
    imageOpacityInterpolationConfig,
    backgroundTransitionInterpolationConfig,
    imagePositionInterpolationConfig,
  } = interpolations || {};

  const [scrollX] = useState(new Animated.Value(0));

  const imageOpacity = imageOpacityInterpolationConfig
    ? scrollX.interpolate(imageOpacityInterpolationConfig)
    : scrollX.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0.3],
      extrapolate: 'clamp',
    });

  const imagePosition = imagePositionInterpolationConfig
    ? scrollX.interpolate(imagePositionInterpolationConfig)
    : scrollX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    });

  const SPACING_FOR_CARD_INSET = Dimensions.get('window').width * 0.1 - 10;

  const transitionColor = backgroundTransitionInterpolationConfig
    ? scrollX.interpolate(backgroundTransitionInterpolationConfig)
    : scrollX.interpolate({
      inputRange: [0, 100],
      outputRange: ['#019ae6', '#33afed'],
      extrapolate: 'clamp',
    });

  return (
    <Animated.View style={[headerViewStyles || styles.component,
      { backgroundColor: transitionColor }]}
    >
      <Header
        styles={sectionHeaderStyles}
        title={{
          content: headerTitle,
          styles: headerTitleStyles,
        }}
        description={{
          content: headerSubTitle,
          styles: headerSubTitleStyles,
        }}
        button={headerButton}
      />
      <Animated.View style={[imageContainerStyles || styles.fixed,
        { opacity: imageOpacity, left: imagePosition }]}
      >
        <Image
          style={[imageStyles || styles.featuredImage]}
          source={featuredImageSource}
        />
      </Animated.View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
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
        snapToInterval={150}
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
        <View style={[swipeContainerStyles || styles.swipeContainerStyles]}>
          {cardItemContent.map((item) => {
            const {
              title, description, imageSource,
            } = item;

            return (
              <Card
                title={title}
                description={description}
                imageSource={imageSource}
                styles={{
                  cardContainerStyle: sectionContainerStyle,
                  cardTitleStyle: sectionTitleStyle,
                  cardSubTitleStyle: sectionSubTitleStyle,
                  cardImageStyle: sectionImageStyle,
                }}
                key={item.title}
                onClick={item.onClick}
              />
            );
          })}
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  component: {
    flex: 0.5,
    backgroundColor: '#21D4FD',
    paddingTop: 15,
    paddingBottom: 15,
  },
  playSwipeContainer: {
    paddingTop: 10,
    marginRight: 10,
  },
  swipeContainerStyles: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 200,
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
