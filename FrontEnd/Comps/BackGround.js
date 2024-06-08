import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const BackGround = ({ children }) => {
  return (
    <ImageBackground source={require('../icons/BackgroundMotorista.png')} style={styles.background}>
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export {BackGround};