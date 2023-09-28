import React, { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native";
import { APP_URL, APP_IMAGE_URL } from "@env";
import Loading from "../Component/Loading";
import CustomerMainPageNavComponent from "./CustomerMainPageNav";
import { BackBtn } from "../search/customer/CategorySingleScreen";

export default function SelectCategoryScreen({ navigation, user_id }) {
    const [categories, setCategories] = useState([])

    async function getCategories() {
        let myHeaders = new Headers();
        let requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        await fetch(`${APP_URL}GetProductCategory`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setCategories(result.data.city);
            })
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{
                flex: 1,
                paddingHorizontal: 15,
                position: "relative",
            }}>
                <BackBtn onPressBack={() => navigation.goBack()} />
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 30 }}>
                    {categories.length ? categories.map((el, i) => {
                        console.log(el.name, el.id, el.childrens.length);
                        return (
                            <TouchableOpacity style={{ marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', flexShrink: 1, marginBottom: 10, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'lightgray'  }} key={i}
                                onPress={() => {
                                    el.childrens.length ?
                                        navigation.navigate('SelectSubCategoryScreen', { category: el, user_id: user_id })
                                        : navigation.navigate('AddProduct', { category: el, user_id: user_id })

                                }}>
                                <View style={{ flexDirection: 'row', flexShrink: 1, }}>
                                    <Image style={{ width: 35, height: 35, marginRight: 15 }} source={{ uri: `${APP_IMAGE_URL}${el.icon}` }} />
                                    <Text style={{ fontSize: 21, color: 'black', flexShrink: 1 }}>{el.name}</Text>
                                </View>
                                {el.childrens.length ? <Image source={require("../../assets/image/right-arrow1.png")} style={{ width: 20, height: 20 }} /> : null}
                            </TouchableOpacity>
                        )
                    }) :
                        <View style={{}}>
                            <Loading />
                        </View>
                    }
                </ScrollView>
            </View>
            <CustomerMainPageNavComponent
                active_page={"Профиль"}
                navigation={navigation}
            />
        </SafeAreaView>
    )
}