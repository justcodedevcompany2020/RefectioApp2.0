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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_URL } from "@env";


export default function AboutUsScreen({ navigation, value, hideText }) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [disabled, setDisabled] = useState(false)
  const [aboutUs, setAboutUs] = useState(value)

  // updateAboutUs = async () => {
  //   let myHeaders = new Headers();
  //   let userToken = await AsyncStorage.getItem("userToken");
  //   let AuthStr = "Bearer " + userToken;
  //   myHeaders.append("Authorization", AuthStr);

  //   let formdata = new FormData();
  //   console.log(userToken);
  //   console.log('aboutUs',aboutUs);
  //   formdata.append("about_us", aboutUs);

  //   let requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: formdata,
  //     redirect: "follow",
  //   };

  //   fetch(`${APP_URL}update_about_us_user`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result);
  //       navigation.goBack()
  //     })
  //     .catch((error) => console.log("error", error));
  // }

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
      <Text
        style={{
          marginVertical: 20,
          fontSize: 20,
          // textAlign: "center/",
          // color: "#2D9EFB",
          fontFamily: "Poppins_500Medium",
        }}
      >
        Дополнительная информация
      </Text>
      <RichTextEditorComponent value={aboutUs} hideIcon hideText={hideText} />
      <TouchableOpacity
        style={{
          alignSelf: "center",
          position: "absolute",
          bottom: "10%",
        }}
        disabled={disabled}
        onPress={() => navigation.goBack()}
      >
        <BlueButton name="Ок" />
      </TouchableOpacity>
    </View>
    {!isKeyboardVisible && <CustomerMainPageNavComponent
      active_page={"Поиск"}
      navigation={navigation}
    />}
  </SafeAreaView >
}

