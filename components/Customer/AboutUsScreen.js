import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import Loading from "../Component/Loading";
import CustomerMainPageNavComponent from "./CustomerMainPageNav";
import { Keyboard } from "react-native";
import { BackBtn } from "../search/customer/CategoryScreen";
import { Text } from "react-native";
import RichTextEditorComponent from "../Auth/RichTextEditor";
import { TouchableOpacity } from "react-native";
import BlueButton from "../Component/Buttons/BlueButton";


export default function AboutUsScreen({ navigation, onPressSave, onChangeText, value }) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );
    console.log(onChangeText, value);

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);




  return <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
    <View style={{
      flex: 1,
      paddingHorizontal: 15,
    }}>
      <BackBtn onPressBack={() => navigation.goBack()} />

      {/* {loading ? <Loading /> : null } */}
      <Text
        style={{
          marginTop: 20,
          fontSize: 20,
          // textAlign: "center/",
          // color: "#2D9EFB",
          fontFamily: "Poppins_500Medium",
        }}
      >
        Дополнительная информация
      </Text>

      <RichTextEditorComponent onChange={onChangeText} value={value} />

      <TouchableOpacity
        style={{
          alignSelf: "center",
          position: "absolute",
          bottom: "10%",
        }}
        disabled={disabled}
        onPress={() => { onPressSave(); setDisabled(true) ; console.log('pressed');}}
      >
        <BlueButton name="Сохранить" />
      </TouchableOpacity>
    </View>
    {!isKeyboardVisible && <CustomerMainPageNavComponent
      active_page={"Поиск"}
      navigation={navigation}
    />} 
  </SafeAreaView >
}

