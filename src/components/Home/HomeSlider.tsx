import React, { FC, useRef, useEffect, useState } from 'react';
import { Dimensions, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { Colors, Fonts, Images, Pixel, ScreenOptions, } from '../../constants/styleConstants';
// import {ScreenProps} from '../../constants/interfaces';
import { Onboarding1, Onboarding2, } from '../../assets/icons/SvgIcons';
import Button from '../../components/touchables/Button';
import Animated from 'react-native-reanimated';
import { SvgProps } from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import { commonStyles } from '../../styles/styles';
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

const { width } = Dimensions.get('window');
let slideWidth = width - 30;
interface ISlide {
    image: (arg: SvgProps) => JSX.Element;
    index: number;
}

const HomeSlider: FC = () => {
    const banners = useSelector((state: RootState) => state.settings.banners);
    const data = useState([
        {
            image: require('../../assets/images/homeSlider1.png'),
        },
        {
            image: require('../../assets/images/homeSlider1.png'),
        },
        {
            image: require('../../assets/images/homeSlider1.png'),
        },
    ])[0];

    const scroll = useRef<Animated.ScrollView>(null);
    const Slide: FC<ISlide> = ({ image, index }) => {
        //   useEffect(() => {

        //     const _interval = setInterval(() => {
        //         const _scrollViewX:number =index+1;
        //         scroll.current?.scrollTo({x: _scrollViewX, y: 0, animated: true}) },
        //       100
        //     );
        //       return () => {

        //       }
        //   }, [])

        return (
            <View style={styles.slide}>

                <View style={[styles.imageBox]}>
                    <FastImage source={require('../../assets/images/homeSlider1.png')} style={{
                        width:'100%',
                        height:'100%',
                     }}/>
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
                                                ? slideWidth * index
                                                : i < index
                                                    ? slideWidth * (index - i)
                                                    : slideWidth * (index + i),
                                    animated: true,
                                });
                            }}>
                            <View
                                style={[
                                    styles.dotItem,
                                    index === i && { backgroundColor: Colors.mainColor },
                                ]} />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        )
    };
    return (
        <Animated.ScrollView
            ref={scroll}
            horizontal
            snapToInterval={slideWidth}
            contentContainerStyle={{ backgroundColor: Colors.white, height: Pixel(400),marginBottom:20,
                borderRadius:15 }}
            snapToAlignment={'center'}
            disableIntervalMomentum={true}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={1}
            bounces={false}>
            {data.map((item, index) => {
                return (
                    <Slide {...item} key={index.toString()} index={index} />
                )
            })}
        </Animated.ScrollView>
    );
};



const styles = StyleSheet.create({
    slide: {
        flex: 1,
        backgroundColor: Colors.white,
        position: 'relative',
        alignItems: 'center',
        // alignContent:'center',
        justifyContent: 'center',
        width:slideWidth,
        marginTop: Pixel(40),
    },
    imageBox: {
        width: '100%',
        height: '100%',
        ...commonStyles.boxShadow,
        overflow:'hidden',
        borderRadius:15
        // marginBottom: Pixel(40),
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width,
        zIndex: 15,
        marginTop: Pixel(10),
        // marginVertical: 45,
    },
    dotContent: {
        padding: 4,
    },
    dotItem: {
        width: Pixel(30),
        height: Pixel(5),
        backgroundColor: '#D0CFD3',
        borderRadius: 50,
    },
});

export default HomeSlider;
