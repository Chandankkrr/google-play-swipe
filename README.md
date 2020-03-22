![Node.js CI](https://github.com/Chandankkrr/google-play-swipe/workflows/Node.js%20CI/badge.svg)

# google-play-swipe

React Native component that that mimics the UI present in Google Play Store, Movies & TV

* Fully customizable UI from opacity interpolation to animating featured image
* Content is displayed inside of a customizable ScrollView component

## Installation

Using yarn:

```node
yarn add google-playswipe
```

Using npm:

```node
npm install google-playswipe
```

## Usage

```javascript
import PlaySwipe from 'google-playswipe';
```

Add a `<PlaySwipe />` tag within your component with required props.

```react
const data = {
    headerTitle: 'Rentals from $0.99',
    headerSubtitle: 'Discover a new favourite',
    items: [
      { title: 'Knight and Day', description: '$0.99', imageSource: 'image_1.png' },
      { title: 'The Vanishing',  description: '$1.99', imageSource: 'image_2.png' },
      { title: 'Ultimate Avengers 2', description: '$1.99', imageSource: 'image_3.png' },
      { title: 'The Humanity Bureau', description: '$4.99', imageSource: 'image_4.png' },
    ],
  };

const { headerTitle, headerSubtitle, items } = data;
const sectionItems = items.map((item: ContentType) => (
    {
      ...item,
      imageSource: {
        uri: item.imageSource,
        cache: 'default',
      },
      key: item.title,
      onClick: () => Alert.alert(item.title),
    }
  ),
);

<PlaySwipe
  content={data}
  header={{
    content: {
      headerTitle: headerTitle,
      headerSubTitle: headerSubtitle,
      headerButton: (
        <TouchableOpacity
          onPress={() => Alert.alert('Discover more!')}
        >
          <Ionicons name="md-arrow-forward" size={28} color="#58646e" />
        </TouchableOpacity>
      ),
    },
    styles: {
      sectionHeaderStyles: { flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15, paddingRight: 15 },
      headerViewStyles: { flex: 0.5, paddingTop: 15, paddingBottom: 15 },
      headerTitleStyles: { fontSize: 18, fontWeight: '400' },
      headerSubTitleStyles: { fontSize: 14, fontWeight: '200' },
    },
  }}
  featuredImage={{
      source: { uri: 'https://tinyurl.com/uf24w56', cache: 'default' },
      styles: {
        imageContainerStyles: { position: 'absolute', top: 50, right: 0 },
        imageStyles: { width: 200, height: 265 },
      },
  }}
    scrollViewStyles={{ paddingTop: 10 }}
    backgroundTransition={{
      transitionColors: ['#019ae6', '#33afed'],
  }}
    swipeContainer={{
      styles: { flex: 1, flexDirection: 'row', marginLeft: 200 },
      swipeItems: {
        content: sectionItems,
        styles: {
          sectionContainerStyle: { width: 150, height: 200, marginTop: 10, marginBottom: 10, padding: 10, borderRadius: 10 },
          sectionImageStyle: { width: 125, height: 200, borderRadius: 10 },
          sectionTitleStyle: { fontSize: 14, fontWeight: '300', paddingTop: 15 },
          sectionSubTitleStyle: { fontSize: 13, fontWeight: '200', color: '#3c709d' },
        },
      },
   }}
/>
```

![screenshot_1](https://raw.githubusercontent.com/Chandankkrr/google-play-swipe/master/screenshots/screenshot_1.png)

![screenshot_2](https://raw.githubusercontent.com/Chandankkrr/google-play-swipe/master/screenshots/screenshot_2.png)

## Contributing
Feel free to open a new pull request or GitHub issue for any changes that can be made

## Author
Chandan Rauniyar | [https://chandankkrr.github.io](https://chandankkrr.github.io)
