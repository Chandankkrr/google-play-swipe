/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
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
  ViewStyle,
  TouchableOpacity,
  ImageStyle,
  TextStyle,
} from 'react-native';

interface MovieProps {
    title: string;
    description: string;
    imageSource: ImageSourcePropType;
    onClick?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
    style?: {
      sectionStyle?: StyleProp<ViewStyle>,
      sectionImageStyle?: StyleProp<ImageStyle>,
      sectionTitleStyle?: StyleProp<TextStyle>,
      sectionSubTitleStyle?: StyleProp<TextStyle>,
    }
}

const Movie = (props: MovieProps) => {
  const {
    title, description, imageSource, style, onClick,
  } = props;
  const {
    sectionStyle,
    sectionImageStyle,
    sectionTitleStyle,
    sectionSubTitleStyle,
  } = style;
  return (
    <View style={[styles.section, sectionStyle]}>
      <TouchableOpacity
        onPress={onClick}
      >
        <View>
          <Image
            source={imageSource}
            style={[styles.swipeImage, sectionImageStyle]}
          />
        </View>
        <View>
          <Text style={[styles.sectionTitle, sectionTitleStyle]}>
            {title}
          </Text>
          <Text style={[styles.sectionSubTitle, sectionSubTitleStyle]}>
            {description}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  sectionTitle: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 15,
  },
  sectionSubTitle: {
    fontSize: 13,
    fontWeight: '200',
    color: '#3c709d',
  },
});

export default Movie;
