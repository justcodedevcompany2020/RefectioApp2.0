import React, { useRef, useState } from "react";
import { Dimensions, Image, TouchableOpacity } from "react-native";
import { ImageBackground } from "react-native";
import { Modal } from "react-native";
import { KeyboardAvoidingView, Platform, SafeAreaView, Text, View } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import HTML from 'react-native-render-html';
import WebView from "react-native-webview";
import BlueButton from "../Component/Buttons/BlueButton";
import { useNavigation } from "@react-navigation/native";

export default function RichTextEditorComponent({ value, hideIcon, hideText }) {
    const navigation = useNavigation()
    // const richText = useRef(null)
    // const handleHead = ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>
    // const htmlStr = '<p><i><u>Underline italic text</u></i> <b>bold word</b> normal words</p>';
    // const initialCSSText = { contentCSSText: `font-size: 36px` }

    return <SafeAreaView >
        {hideText ? null : <Text style={{ color: 'lightgrey', marginBottom: 10 }}>*Редактирование текста возможно через сайт www.refectio.ru</Text>}
        {hideIcon ?
            <View style={{ borderWidth: 1, borderColor: 'lightgrey', borderRadius: 6, position: "relative", marginRight: 12, height: '70%', padding: 10, }}>
                <WebView
                    source={{
                        html: (value == null || value == 'null' || value == '<p><br></p>') ? (hideText ? `<div style= "font-size: 40px; color: lightgray">Производитель не добавил доп. информацию</div>` :  `<div style= "font-size: 40px; color: lightgray">Добавьте доп информацию</div>`) : `<div style="font-size:50px;">${value}</div>`
                    }}
                />
            </View>
            : <View style={{
                borderWidth: 1,
                borderColor: '#F5F5F5',
                borderRadius: 6,
                height: 50,
                justifyContent: 'center'
            }}>

                {value ?
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 10 }}>
                        <View style={{ width: '85%' }}>
                            <HTML
                                contentWidth={700}
                                source={{
                                    html: `<div><p>${value}</p></div>`
                                }}
                            />
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('AboutUsScreen', { value: value })}>
                            <Image source={require('../../assets/image/imageblue.png')} style={{ alignSelf: 'flex-end', width: 30, height: 30, marginRight: 5 }} />
                        </TouchableOpacity>
                    </View> :
                    <Image source={require('../../assets/image/image.png')} style={{ alignSelf: 'flex-end', width: 30, height: 30, marginRight: 5 }} />
                }
            </View>}
    </SafeAreaView >
}
