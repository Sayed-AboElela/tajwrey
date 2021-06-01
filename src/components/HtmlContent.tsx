import React, {FC} from 'react';
import HTML from 'react-native-render-html';
import {Colors, Fonts} from "../constants/styleConstants";


const HtmlContent: FC = ({content}) => {
  return (
    <HTML
      tagsStyles={{
        h1: {fontFamily: Fonts.medium, marginBottom: 20, color: Colors.mainColor},
        h2: {fontFamily: Fonts.medium, marginBottom: 20, color: Colors.mainColor},
        h3: {fontFamily: Fonts.medium, marginBottom: 20, color: Colors.mainColor},
        strong: {fontFamily: Fonts.bold, marginBottom: 20, fontSize: 17},
        span: {
          fontFamily: Fonts.regular,
          marginBottom: 5,
          fontSize: 16,
          color: Colors.mainColor,
        },
        p: {
          fontFamily: Fonts.regular,
          marginBottom: 10,
          fontSize: 16,
          color: Colors.mainColor,
        },
      }}
      source={{html: content}}
      // contentWidth={"95%"}
    />
  );
};

export default HtmlContent;
