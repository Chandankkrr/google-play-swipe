![Node.js CI](https://github.com/Chandankkrr/google-play-swipe/workflows/Node.js%20CI/badge.svg)

# 🚀 google-play-swipe

React Native component that mimics the UI present in Google Play Store, Movies & TV

* Fully customizable UI from opacity interpolation to animating featured image
* Content is displayed inside of a customizable ScrollView component

<img src="https://github.com/Chandankkrr/google-play-swipe/blob/master/screenshots/screen_recording.gif?raw=true" width="1000">

## ⚙️ Installation

☊ Using npm:

```javascript
npm install google-playswipe
```

🧶 Using yarn:

```javascript
yarn add google-playswipe
```

## ♨ Usage

```javascript
import PlaySwipe from 'google-playswipe';
```

Add a `<PlaySwipe />` tag within your component with required props.

### 📦 Data setup
```javascript
const data = {
    items: [
      { title: 'Knight and Day', description: '$0.99', imageSource: 'https://tinyurl.com/play-swipe-1' },
      { title: 'The Vanishing',  description: '$1.99', imageSource: 'https://tinyurl.com/play-swipe-2' },
      { title: 'Ultimate Avengers 2', description: '$1.99', imageSource: 'https://tinyurl.com/play-swipe-3' },
      { title: 'The Humanity Bureau', description: '$4.99', imageSource: 'https://tinyurl.com/play-swipe-4' },
      { title: 'Trading Paint', description: '$1.99', imageSource: 'https://tinyurl.com/play-swipe-5' }
    ]
  };

const { items } = data;
const cardItems = items.map((item) => (
  {
      ...item,
      imageSource: { uri: item.imageSource } or require('path to local image'),
      key: item.title,
      onClick: () => Alert.alert(item.title), // onclick handler for each card data item
    }
  ),
);
```

### 📝 Minimal configuration
```javascript
<PlaySwipe
  header={{
    content: {
      headerTitle: 'Rentals from $0.99',
      headerSubtitle: 'Discover a new favourite',
      headerButton: (
        <TouchableOpacity onPress={() => Alert.alert('Discover more!')}>
          <Ionicons name="md-arrow-forward" size={28} color="#58646e" />
        </TouchableOpacity>
      ),
    },
  }}
  featuredImage={{
    source: { uri: 'resource identifier for the image' } 
      or
    source: require('./path/to/image.png')
  }}
  cardItems={{
      content: cardItems,
  }}
/>
```

### 📝  Full customization
```javascript
<PlaySwipe
  header={{
    content: {
      headerTitle: 'Rentals from $0.99',
      headerSubtitle: 'Discover a new favourite',
      headerButton: (
        <TouchableOpacity onPress={() => Alert.alert('Discover more!')}>
          <Ionicons name="md-arrow-forward" size={28} color="#58646e" />
        </TouchableOpacity>
      ),
    },
    styles: {
      sectionHeaderStyles:     // provide your custom styles
      headerViewStyles:       // provide your custom styles
      headerTitleStyles:     // provide your custom styles
      headerSubTitleStyles: // provide your custom styles
    },
  }}
  featuredImage={{
    source: { uri: 'resource identifier for the image' } 
      or
    source: require('./path/to/image.png')
    styles: {
        imageContainerStyles: // provide your custom styles
        imageStyles:         // provide your custom styles
      },
    }}
    cardItems={{
      content: cardItems,
      styles: {
        sectionContainerStyle:   // provide your custom styles
        sectionImageStyle:      // provide your custom styles
        sectionTitleStyle:     // provide your custom styles
        sectionSubTitleStyle: // provide your custom styles
      },
    }}
    swipeContainerStyles={{ // provide your custom styles }}
    interpolations={{
      backgroundTransitionInterpolationConfig: {
        inputRange: [50, 100],
        outputRange: ['#FBAB7E', '#F7CE68'],
        extrapolate: 'clamp',
      },
      imagePositionInterpolationConfig:{
        inputRange: [0, 100],
        outputRange: [0, -50],
        extrapolate: 'clamp',
      },
      imageOpacityInterpolationConfig: {
        inputRange: [0, 100],
        outputRange: [1, 0.1],
        extrapolate: 'clamp',
      }
    }}
/>
```

## 🕹️ Components

### Card

| Name                      | Description                                   | Type                | Required  |
|---------------------------|-----------------------------------------------|-------------------- |-----------|
| title                     | Card tile                                     | String              | ✓         |     
| descriptoin               | Card description                              | String              |           | 
| imageSource               | Image to be dispalyed in the card             | ImageSourcePropType | ✓         | 
| onClick                   | Handler function when a card is pressed       | NativeTouchEvent    |           | 
| styles                    | Collection of styles for swipe item component | CardStyles          |           | 


### Header

| Name                      | Description                                                 | Type                  | Required  |
|---------------------------|-------------------------------------------------------------|-----------------------|-----------|
| title                     | Header tile                                                 | String                | ✓         |     
| description               | Header description                                          | String                |           | 
| button                    | Ideally a button or JSX element for the header component    | JSX.Element           | ✓         | 
| styles                    | Collection of styles for header component                   | StyleProp<ViewStyle>  |           |

### PlaySwipe
| Name                      | Description                                                 | Type                            | Required  |
|---------------------------|-------------------------------------------------------------|---------------------------------|-----------|    
| header                    | Object that is required to build the header component       | Header                          | ✓         | 
| featuredImage             | Featured image that will be displayed to the left of card ui| FeaturedImage                   | ✓         | 
| cardItems                 | Object that contains the card item data and styles          | CardItems                       | ✓         | 
| swipeContainerStyles      | Collection of styles for the card items swipe container     | StyleProp<ViewStyle>;           |          |
| interpolations            | Object that contains interpolation for animations effects   | HorizontalScrollInterpolations  |           |

## 🖋 Contributing
Feel free to open a new pull request or GitHub issue for any changes.

## ✍️ Author
Chandan Rauniyar | [https://chandankkrr.github.io](https://chandankkrr.github.io)
