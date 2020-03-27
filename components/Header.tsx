/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

interface HeaderBase {
  content?: string;
  styles?: StyleProp<TextStyle>;
}

export interface HeaderTitle extends HeaderBase { }

export interface HeaderSubTitle extends HeaderBase { }

interface HeaderProps {
  title: HeaderTitle,
  description?: HeaderSubTitle,
  button: JSX.Element
  styles: StyleProp<ViewStyle>,
}

const Header = (props: HeaderProps) => {
  const {
    title, description, button, styles: headerStyles,
  } = props || {};
  return (
    <View style={headerStyles || styles.header}>
      <View>
        <Text
          style={title.styles || styles.headerTitle}
        >
          {title.content}
        </Text>
        <Text
          style={description ? description.styles : styles.headerDescription}
        >
          {description ? description.content : null }
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
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '400',
  },
  headerDescription: {
    fontSize: 14,
    fontWeight: '200',
  },
});

export default Header;
