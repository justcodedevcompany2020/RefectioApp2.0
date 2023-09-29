import React, { useRef, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { ImageBackground } from "react-native";
import { Modal } from "react-native";
import { KeyboardAvoidingView, Platform, SafeAreaView, Text, View } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import HTML from 'react-native-render-html';
import WebView from "react-native-webview";
import BlueButton from "../Component/Buttons/BlueButton";

export default function RichTextEditorComponent({ value, hideIcon }) {

    // const richText = useRef(null)
    // const handleHead = ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>
    // const htmlStr = '<p><i><u>Underline italic text</u></i> <b>bold word</b> normal words</p>';
    // const initialCSSText = { contentCSSText: `font-size: 36px` }
    const [aboutPopup, setAboutPopup] = useState(false)

    return <SafeAreaView >
        {/* <RichToolbar
            editor={richText}
            actions={[actions.setBold, actions.setItalic, actions.setUnderline]}
            // iconMap={{ [actions.heading1]: handleHead }}
            unselectedButtonStyle={{
                backgroundColor: 'white',
                borderWidth: 1,
                marginRight: 10,
                width: 40,
                height: 30,
                borderRadius: 6,
                borderColor: '#F5F5F5'
            }}
            selectedButtonStyle={{
                backgroundColor: '#F5F5F5',
                borderWidth: 1,
                marginRight: 10,
                width: 40,
                height: 30,
                borderRadius: 6,
                borderColor: '#F5F5F5'
            }}
            style={{
                backgroundColor: 'white',
                marginVertical: 5,
                alignItems: 'flex-start'
            }}
        /> */}
        {/* <RichEditor
            ref={richText}
            // onChange={onChange}
            containerStyle={}
            placeholder="Редактирование текста возможно через сайт refectio.ru"
            disabled={true}
            // androidHardwareAccelerationDisabled={true}
            initialHeight={100}
        /> */}

        <Modal visible={aboutPopup}>
            <ImageBackground
                source={require("../../assets/image/blurBg.png")}
                style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        width: "90%",
                        height: value ? "40%" : "30%",
                        backgroundColor: "#fff",
                        borderRadius: 20,
                        position: "relative",
                        paddingHorizontal: 15,
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            marginTop: 15,
                            fontSize: 20,
                            textAlign: "center",
                            color: "#2D9EFB",
                            fontFamily: "Poppins_500Medium",
                        }}
                    >
                        Дополнительная информация
                    </Text>

                    {!value ? <Text style={{ marginVertical: 20 }}>Производитель не добавил доп. информацию</Text>
                        :
                        <WebView
                            style={{ height: 100, width: 280, marginTop: 30, zIndex: 99999, }}
                            source={{ html: `<div style="font-size:50px;">${value}</div>` }}
                        />}

                    <TouchableOpacity
                        style={{
                            marginVertical: 20,
                        }}
                        onPress={() => setAboutPopup(false)}
                    >
                        <BlueButton name="Ок" />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </Modal>


        <Text style={{ color: 'lightgrey', marginBottom: 10 }}>*Редактирование текста возможно через сайт www.refectio.ru</Text>
        {hideIcon ?
            <View style={{ borderWidth: 1, borderColor: 'lightgrey', borderRadius: 6, position: "relative", marginRight: 12, height: 150, padding: 10, }}>
                <HTML
                    contentWidth={700}
                    source={{ html: `<div style="font-size: 16px">${value}</div>` }}
                />
            </View> : <View style={{
                borderWidth: 1,
                borderColor: '#F5F5F5',
                borderRadius: 6,
                height: 40,
                justifyContent: 'center'
            }}>
                {value ?
                    <TouchableOpacity onPress={() => setAboutPopup(true)}>
                        <Image source={require('../../assets/image/imageblue.png')} style={{ alignSelf: 'flex-end', width: 30, height: 30, marginRight: 5 }} />
                    </TouchableOpacity> :
                    <Image source={require('../../assets/image/image.png')} style={{ alignSelf: 'flex-end', width: 30, height: 30, marginRight: 5 }} />
                }
            </View>}
    </SafeAreaView >
}
