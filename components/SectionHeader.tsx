/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  StyleProp,
  TextStyle,
  NativeSyntheticEvent,
  NativeTouchEvent,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


interface SectionBase {
  content: string;
  styles?: StyleProp<TextStyle>;
}

interface SectionTitle extends SectionBase { }

interface SectionSubTitle extends SectionBase { }

interface SectionButton extends SectionBase {
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  color?: string;
}

interface SectionHeaderProps {
  title: SectionTitle,
  subTitle: SectionSubTitle,
  button: SectionButton
}

const SectionHeader = (props: SectionHeaderProps) => {
  const { title, subTitle, button } = props;
  return (
    <View style={styles.header}>
      <View>
        <Text
          style={[styles.headerTitle, title.styles]}
        >
          {title.content}
        </Text>
        <Text
          style={[styles.headerSubTitle, subTitle.styles]}
        >
          {subTitle.content}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          title={button.content}
          color={button.color ? button.color : 'grey'}
          onPress={button.onPress}
          underlayColor="#042417"
        >
          {!button.content && <Ionicons name="md-arrow-forward" size={28} color="#58646e" />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '400',
  },
  headerSubTitle: {
    fontSize: 14,
    fontWeight: '200',
  },
});

export default SectionHeader;
