import React, {FC} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Container, Content} from "../components/containers/Containers";
import {AboutSvg} from "../assets/icons/SvgIcons";
import Header from "../components/header/Header";
import {useTranslation} from "react-i18next";

const {width, height} = Dimensions.get('window');
const About: FC = () => {
  const {t} = useTranslation();
  return (
    <Container>
      <Header title={t('About')}/>
      <Content contentContainerStyle={{justifyContent:'center',alignItems:'center'}}>
        {/*<FastImage*/}
        {/*source*/}
        {/*/>*/}
        <AboutSvg/>
        <View style={{paddingVertical:20}}>
          {/*<HtmlContent content={about}/>*/}
          <Text>asdadassdasd</Text>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  }
});


export default About;
