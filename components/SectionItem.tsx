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
  ViewStyle,
  TouchableOpacity,
  ImageStyle,
  TextStyle,
} from 'react-native';

interface SectionItemProps {
  title: string;
  description: string;
  imageSource: ImageSourcePropType;
  onClick?: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  styles?: {
    sectionStyle?: StyleProp<ViewStyle>,
    sectionTitleStyle?: StyleProp<TextStyle>,
    sectionSubTitleStyle?: StyleProp<TextStyle>,
    sectionImageStyle?: StyleProp<ImageStyle>,
  }
}

const SectionItem = (props: SectionItemProps) => {
  const {
    title, description, imageSource, styles: sectionStyles, onClick,
  } = props;
  const {
    sectionStyle,
    sectionImageStyle,
    sectionTitleStyle,
    sectionSubTitleStyle,
  } = sectionStyles || {};
  return (
    <View style={[styles.section, sectionStyle]}>
      <TouchableOpacity
        onPress={onClick}
      >
        <View>
          <Image
            source={imageSource}
            style={[styles.sectionImage, sectionImageStyle]}
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
  sectionImage: {
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

export default SectionItem;
