import React, {FC} from "react";
import {StyleSheet, View} from "react-native";
import LottieView from "lottie-react-native";


const PageLoader:FC = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animation/page-loader.json')}
        autoPlay
        loop
        style={{width: 80, height: 80,marginBottom:100}}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default PageLoader;
