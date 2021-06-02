import React, {FC, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Container, Content} from "../../components/containers/Containers";
import Header from "../../components/header/Header";
import {useTranslation} from "react-i18next";
import {Colors, Fonts, Pixel} from "../../constants/styleConstants";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

const {width, height} = Dimensions.get('window');

const Faq: FC = () => {
  const {t} = useTranslation();
  const pages = useSelector((state: RootState) => state.settings.pages);
  const [page, setPage] = useState({});

  useEffect(() => {
    if (pages && pages.length > 0) {
      let pageData = pages.filter((page: { slug: string }) => page.slug === 'faq');
      setPage(pageData[0]);
    }
    return () => {
      setPage({});
    }
  }, [pages]);
  return (
    <Container>
      <Header title={t('Faq')}/>
      <Content contentContainerStyle={{justifyContent: 'center',}}>
        <View style={{paddingVertical: 20}}>
          {/*<HtmlContent faq content={about}/>*/}
          <Text style={styles.content}>{page.content}</Text>
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    fontFamily: Fonts.regular,
    fontSize: Pixel(29),
    lineHeight: Pixel(55),
    color: Colors.mainColor
  }
});


export default Faq;
