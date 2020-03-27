/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React from 'react';
import {
  Image,
  Text,
  StyleSheet,
  View,
  ImageSourcePropType,
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleProp,
  TouchableOpacity,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from 'react-native';

interface CardStyles {
  cardContainerStyle?: StyleProp<ViewStyle>,
  cardTitleStyle?: StyleProp<TextStyle>,
  cardSubTitleStyle?: StyleProp<TextStyle>,
  cardImageStyle?: StyleProp<ImageStyle>,
}

interface CardProps {
  title: string;
  description?: string;
  imageSource: ImageSourcePropType;
  onClick?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  styles?: CardStyles;
}

const Card = (props: CardProps) => {
  const {
    title, description, imageSource, styles: sectionStyles, onClick,
  } = props;
  const {
    cardContainerStyle,
    cardImageStyle,
    cardTitleStyle,
    cardSubTitleStyle,
  } = sectionStyles || {};
  return (
    <View style={cardContainerStyle || styles.cardContainer}>
      <TouchableOpacity
        onPress={onClick}
      >
        <View>
          <Image
            source={imageSource}
            style={cardImageStyle || styles.cardImage}
          />
        </View>
        <View>
          <Text style={cardTitleStyle || styles.cardTitle}>
            {title}
          </Text>
          <Text style={cardSubTitleStyle || styles.cardSubTitle}>
            {description}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 150,
    height: 200,
    marginTop: 10,
    marginBottom: 10,
  },
  cardImage: {
    width: 125,
    height: 200,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 15,
  },
  cardSubTitle: {
    fontSize: 13,
    fontWeight: '200',
    color: '#3c709d',
  },
});

export default Card;
