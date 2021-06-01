import React, {FC, useRef, useState} from 'react';
import {Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {Colors, Fonts, Images, Pixel, ScreenOptions,} from '../constants/styleConstants';
import {ScreenProps} from '../constants/interfaces';
import {Onboarding1, Onboarding2,} from '../assets/icons/SvgIcons';
import Button from '../components/touchables/Button';
import Animated from 'react-native-reanimated';
import {SvgProps} from 'react-native-svg';

const {width} = Dimensions.get('window');

interface ISlide {
  Icon: (arg: SvgProps) => JSX.Element;
  title: string;
  description: string;
  index: number;
}

const Onboarding: FC<ScreenProps> = ({navigation}) => {
  const data = useState([
    {
      Icon: Onboarding1,
      title: 'What is Lorem Ipsum?',
      description:
        'Simply dummy text of the printing and typesetting industry ever since the 1500s',
    },
    {
      Icon: Onboarding2,
      title: 'What is Lorem Ipsum?',
      description:
        'Simply dummy text of the printing and typesetting industry ever since the 1500s',
    },
    {
      Icon: Onboarding1,
      title: 'What is Lorem Ipsum?',
      description:
        'Simply dummy text of the printing and typesetting industry ever since the 1500s',
    },
  ])[0];

  const scroll = useRef<Animated.ScrollView>(null);
  const Slide: FC<ISlide> = ({description, Icon, title, index}) => {
    return (
      <View style={styles.slide}>
        {index !== data.length - 1 && (
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => {
              scroll.current?.scrollTo({
                x: width * (index + data.length - 1),
                animated: true,
              });
            }}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        )}

        <View style={[styles.imageBox, index === 1 && {marginEnd: Pixel(65),}]}>
          <Icon width={'100%'} height={'100%'}/>
        </View>

        <View style={styles.slideContent}>
          <Text style={styles.slideTitle}>{title}</Text>
          <Text style={styles.slideDescription}>{description}</Text>
        </View>

        <View style={styles.dotsContainer}>
          {data.map((_, i) => (
            <TouchableOpacity
              style={styles.dotContent}
              key={i.toString()}
              onPress={() => {
                scroll.current?.scrollTo({
                  x:
                    i === 0
                      ? 0
                      : i === index
                      ? width * index
                      : i < index
                        ? width * (index - i)
                        : width * (index + i),
                  animated: true,
                });
              }}>
              <View
                style={[
                  styles.dotItem,
                  index === i && {backgroundColor: Colors.mainColor},
                ]}/>
            </TouchableOpacity>
          ))}
        </View>
        {index === data.length - 1 && (
          <View style={{
            position: 'absolute',
            bottom: Pixel(80),
            zIndex: 150,
          }}>
            <Button
              title="GET STARTED"
              onPress={() => {
                navigation?.navigate('Login');
              }}
              style={{
                width: width - 60,
              }}
            />
          </View>
        )}
      </View>
    )
  };
  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <Animated.ScrollView
        ref={scroll}
        horizontal
        snapToInterval={width}
        contentContainerStyle={{backgroundColor: Colors.white}}
        snapToAlignment={'center'}
        disableIntervalMomentum={true}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        bounces={false}>
        {data.map((item, index) => {
          return (
            <Slide {...item} key={index.toString()} index={index}/>
          )
        })}
      </Animated.ScrollView>
    </>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: Colors.white,
    position: 'relative',
    alignItems: 'center',
    // alignContent:'center',
    justifyContent: 'center',
    width,
    paddingHorizontal: 15,

  },
  skipButton: {
    position: 'absolute',
    top: ScreenOptions.StatusBarHeight + 15,
    right: 15,
  },
  skipButtonText: {
    fontSize: 15,
    color: '#9B99A3',
    fontFamily: Fonts.regular,
  },
  imageBox: {
    width: Pixel(649.29),
    height: Pixel(620.9),
    marginTop: Pixel(40),
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width,
    zIndex: 15,
    marginTop: Pixel(40),
    // marginVertical: 45,
  },
  dotContent: {
    padding: 4,
  },
  dotItem: {
    width: Pixel(20),
    height: Pixel(20),
    backgroundColor: '#D0CFD3',
    borderRadius: 50,
  },
  slideContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: Pixel(40),
  },
  slideTitle: {
    textAlign: 'center',
    color: Colors.minColor,
    fontFamily: Fonts.bold,
    fontSize: Pixel(43),
    textTransform: 'uppercase',
    marginBottom: Pixel(40),
  },
  slideDescription: {
    textAlign: 'center',
    fontFamily: Fonts.regular,
    fontSize: Pixel(27),
    color: Colors.minColor,
  },
  nexButtom: {
    alignSelf: 'center',
    borderRadius: 50,
    backgroundColor: '#B8B6BD',
    width: Pixel(110),
    height: Pixel(110),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
});
