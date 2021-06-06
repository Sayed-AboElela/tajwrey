import React, {FC} from "react";
import {FlatList, I18nManager, Modal, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import {useTranslation} from "react-i18next";
import {Pixel} from "../constants/styleConstants";
import {RootState} from "../store/store";
import {useSelector} from "react-redux";
import CityItem from "./CityItem";

const {isRTL} = I18nManager;

/*************************************************************/

interface ICitiesModal {
  showProp: boolean;
  toggleLangModal: () => void;
  handleSelectCity: (cityId:string, name:string) => void;
  selectedCity:{ city_id:string,  name:string }
}

const CitiesModal: FC<ICitiesModal> = ({showProp, toggleLangModal, handleSelectCity,selectedCity}) => {
  const {t} = useTranslation();
  const cities = useSelector((state: RootState) => state.settings.cities);
  return (
    <Modal animationType="slide" transparent={true} visible={showProp}>
      <TouchableWithoutFeedback onPress={() => toggleLangModal()}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList
              data={cities}
              renderItem={({item}) => <CityItem {...item}
                                                selected={item.id === selectedCity.city_id}
                                                onPress={() => {
                                                  handleSelectCity(item.id, item.name)
                                                  toggleLangModal()
                                                }}
              />
              }
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: "rgba(186,191,206,0.8)",
  },
  modalView: {
    width: '80%',
    height: Pixel(500),
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    paddingHorizontal:25,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default CitiesModal;
