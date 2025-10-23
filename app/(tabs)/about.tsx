import { AboutContent } from '@/components/About/AboutContent';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/rickandmorty.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />
      }
    >
      <AboutContent />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
});
