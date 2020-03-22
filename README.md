# google-play-swipe
React Native component that renders Google Play Movie layout

![screenshot_1](https://raw.githubusercontent.com/Chandankkrr/google-play-swipe/master/screenshots/Screen%20Shot%202020-03-14%20at%2023.29.42.png)

![screenshot_2](https://raw.githubusercontent.com/Chandankkrr/google-play-swipe/master/screenshots/Screen%20Shot%202020-03-14%20at%2023.29.48.png)

```typescript
<PlaySwipe
        content={data}
        header={{
            content={
            headerTitle: string,
            headerSubTitle: string,
            headerButton: JSX.Element,
        }
        styles?={
            sectionHeaderStyles?: StyleProp<ViewStyle>;
            headerViewStyles?: StyleProp<ViewStyle>;
            headerTitleStyles?: StyleProp<TextStyle>;
            headerSubTitleStyles?: StyleProp<TextStyle>;
        }
        }}
        featuredImage={{
          source: ImageSourcePropType,
          styles?:{
            imageContainerStyles?: StyleProp<ViewStyle>;
            imageStyles?: StyleProp<ImageStyle>;
          }
        }}
        swipeContainer={{
          swipeContainer:{
          styles?: StyleProp<ViewStyle>,
          swipeItems: {
            content: SectionType[],
            styles?: SectionStyles
          },
         },
        }}
        scrollViewStyles?: StyleProp<ViewStyle>
        backgroundTransition?: BackgroundTransition
        interpolations?: HorizontalScrollInterpolations;
      />
```
