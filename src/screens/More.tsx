import React, {FC, useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Share from 'react-native-share';
import Rate, {AndroidMarket} from 'react-native-rate';
import {Container} from "../components/containers/Containers";
import Header from "../components/header/Header";
import Footer from "../components/containers/Footer";
import {useTranslation} from "react-i18next";
import {useNavigation} from "@react-navigation/native";
import MoreLink from "../components/MoreLink";
import {Colors, ColorWithOpacity} from "../constants/styleConstants";
import {
  AcceptIcon,
  EmailIcon,
  FaqIcon,
  FileIcon,
  InsuranceIcon,
  LanguageIcon,
  RateIcon,
  ShareIcon
} from "../assets/icons/SvgIcons";
import LangModal from "../components/LangModal";
import {useDispatch} from "react-redux";
import {pagesApi} from "../store/actions/settings";

const More: FC = () => {

  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const [rated, setRated] = useState(false);
  const [langModalShow, setLangModalShow] = useState(false);

  const handleShare = async () => {
    const shareOptions = {
      title: t('Share the app'),
      failOnCancel: false,
      url: `https://play.google.com/store/apps/details?id=com.tasawk.tajwrey`,
      message: ``,
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log('handleShare Error =>', error);
    }
  };

  const handleRateApp = async () => {
    const options = {
      AppleAppID: '2193813192',
      GooglePackageName: 'com.tasawk.tajwrey',
      AmazonPackageName: 'com.tasawk.tajwrey',
      OtherAndroidURL: 'http://www.randomappstore.com/app/47172391',
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: false,
      openAppStoreIfInAppFails: true,
      fallbackPlatformURL: 'https://tasawk.net/tajwrey/index.php/',
    };
    Rate.rate(options, (success: boolean) => {
      if (success) {
        setRated(true);
      }
    });
  };


  const toggleLangModal = () => {
    setLangModalShow(!langModalShow);
  };
  const data = [
    {
      title: t('About'),
      icon: <FileIcon fill={ColorWithOpacity(Colors.dark, 0.6)}/>,
      onPress: () => {
        navigate('About')
      },
    },
    {
      title: t('Bank accounts'),
      icon: <AcceptIcon fill={ColorWithOpacity(Colors.dark, 0.6)}/>,
      onPress: () => {
        navigate('Banks')

      },
    },
    {
      title: t('Terms and Conditions'),
      icon: <AcceptIcon fill={ColorWithOpacity(Colors.dark, 0.6)}/>,
      onPress: () => {
        navigate('Terms')
      },
    },
    {
      title: t('FAQ'),
      icon: <FaqIcon fill={ColorWithOpacity(Colors.dark, 0.6)}/>,
      onPress: () => {
        navigate('Faq')
      },
    },
    {
      title: t('Privacy policy'),
      icon: <InsuranceIcon fill={ColorWithOpacity(Colors.dark, 0.6)}/>,
      onPress: () => {
        navigate('Privacy')
      },
    },
    {
      title: t('Share the app'),
      icon: <ShareIcon fill={ColorWithOpacity(Colors.dark, 0.6)}/>,
      onPress: handleShare,
    },
    {
      title: t('Rate us'),
      icon: <RateIcon fill={ColorWithOpacity(Colors.dark, 0.6)}/>,
      onPress: handleRateApp,
    },
    {
      title: t('Language'),
      icon: <LanguageIcon fill={ColorWithOpacity(Colors.dark, 0.6)}/>,
      onPress: () => {
        console.log('adasd')
        toggleLangModal()
      },
    },
    {
      title: t('Contact us'),
      icon: <EmailIcon fill={ColorWithOpacity(Colors.dark, 0.6)}/>,
      onPress: () => {
        navigate('ContactUs')
      },
    },
  ]

  useEffect(() => {
    dispatch(pagesApi());
  }, []);

  return (
    <Container>
      <Header noBack title={t('More')}/>
      <FlatList
        keyExtractor={item => item.title}
        contentContainerStyle={{paddingHorizontal: 25, paddingBottom: 150}}
        data={data}
        renderItem={({item}) => <MoreLink {...item}/>}
      />
      <Footer/>
      <LangModal toggleLangModal={toggleLangModal} showProp={langModalShow}/>
    </Container>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,

  }
});

export default More;
