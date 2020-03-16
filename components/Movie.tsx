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
} from 'react-native';

interface MovieProps {
    title: string;
    description: string;
    imageSource: ImageSourcePropType;
    onClick?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
    style?: StyleProp<ViewStyle>;
}

const Movie = (props: MovieProps) => {
  const {
    title, description, imageSource, style, onClick,
  } = props;
  return (
    <View style={[styles.section, style]}>
      <TouchableOpacity
        onPress={onClick}
      >
        <View>
          <Image
            source={imageSource}
            style={styles.swipeImage}
          />
        </View>
        <View>
          <Text style={styles.sectionTitle}>
            {title}
          </Text>
          <Text style={styles.sectionSubTitle}>
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
