/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  TextStyle,
} from 'react-native';

interface SectionBase {
  content: string;
  styles?: StyleProp<TextStyle>;
}

export interface SectionTitle extends SectionBase { }

export interface SectionSubTitle extends SectionBase { }

interface SectionHeaderProps {
  title: SectionTitle,
  subTitle: SectionSubTitle,
  button: JSX.Element
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
        {button}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
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
