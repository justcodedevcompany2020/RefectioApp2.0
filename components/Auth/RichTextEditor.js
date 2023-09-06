import React, { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, Text, View } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";

export default function RichTextEditorComponent({ onChange, value }) {

    const richText = useRef()
    const handleHead = ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>
    // const htmlStr = '<p><i><u>Underline italic text</u></i> <b>bold word</b> normal words</p>';
    // const initialCSSText = { contentCSSText: `font-size: 36px` }

    return <SafeAreaView >
        <RichToolbar
            editor={richText}
            actions={[actions.setBold, actions.setItalic, actions.setUnderline]}
            iconMap={{ [actions.heading1]: handleHead }}
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
                marginVertical: 15,
                alignItems: 'flex-start'
            }}
        />
        {/* behavior={Platform.OS === "ios" ? "padding" : "height"}  */}
        {/* <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}> */}
            <RichEditor
                ref={richText}
                onChange={onChange}
                containerStyle={{
                    borderWidth: 1,
                    borderColor: '#F5F5F5',
                    borderRadius: 6,
                }}
                // initialContentHTML={value}
                initialContentHTML={value}
                initialHeight={100}
            // editorStyle={initialCSSText}   
            />
        {/* </KeyboardAvoidingView> */}
    </SafeAreaView >
}
