import React, { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native";
import { APP_URL, APP_IMAGE_URL } from "@env";
import Loading from "../Component/Loading";
import CustomerMainPageNavComponent from "./CustomerMainPageNav";
import { BackBtn } from "../search/customer/CategorySingleScreen";
import LimitPopup from "./LimitPopup";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SelectCategoryScreen({ navigation, user_id }) {
    const [categories, setCategories] = useState([])

    const [isLoading, setIsLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        getCategories()
    }, [])

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

    async function onPressCategory(el) {
        setIsLoading(true)
        let token = await AsyncStorage.getItem("userToken");
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        let formdata = new FormData();
        formdata.append("category_id", el.id)

        console.log(onPressCategory);

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            redirect: "follow",
            body: formdata
        };

        await fetch(`${APP_URL}validation_category`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res);
                setIsLoading(false)
                if (res.status) {
                    navigation.navigate('AddProduct', { category: el, user_id: user_id })
                } else {
                    setShowModal(true)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }


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
                        // console.log(el.name, el.id, el.childrens.length);
                        return (
                            <TouchableOpacity style={{ marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', flexShrink: 1, marginBottom: 10, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'lightgray' }} key={i}
                                onPress={() => {
                                    el.childrens.length ?
                                        navigation.navigate('SelectSubCategoryScreen', { category: el, user_id: user_id })
                                        : onPressCategory(el)

                                }}>
                                <View style={{ flexDirection: 'row', flexShrink: 1, }}>
                                    <Image style={{ width: 35, height: 35, marginRight: 15 }} source={{ uri: `${APP_IMAGE_URL}${el.icon}` }} />
                                    <Text style={{ fontSize: 21, color: 'black', flexShrink: 1 }}>{el.name}</Text>
                                </View>
                                {el.childrens.length ? <Image source={require("../../assets/image/right-arrow1.png")} style={{ width: 20, height: 20 }} /> : null}
                            </TouchableOpacity>
                        )
                    }) :
                        <View style={{ marginTop: 20 }}>
                            <Loading />
                        </View>
                    }
                </ScrollView>
                {isLoading && <Loading />}
                <LimitPopup modalVisible={showModal} onPressOk={() => setShowModal(false)}/>
            </View>
            <CustomerMainPageNavComponent
                active_page={"Профиль"}
                navigation={navigation}
            />
        </SafeAreaView>
    )
}