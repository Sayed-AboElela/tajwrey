import React, {FC} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Container, Content} from "../../components/containers/Containers";
import Header from "../../components/header/Header";
import {useTranslation} from "react-i18next";

const {width, height} = Dimensions.get('window');

const Faq: FC = () => {
  const {t} = useTranslation();
  return (
    <Container>
      <Header title={t('Faq')}/>
      <Content contentContainerStyle={{justifyContent: 'center',}}>
        <View style={{paddingVertical: 20}}>
          {/*<HtmlContent content={about}/>*/}
          <Text>FaqFaqFaq</Text>
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


export default Faq;
