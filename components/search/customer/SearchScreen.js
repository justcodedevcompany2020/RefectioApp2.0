import React, { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native";
import { APP_URL, APP_IMAGE_URL } from "@env";
import Loading from "../../Component/Loading";
import CustomerMainPageNavComponent from "../../Customer/CustomerMainPageNav";

export default function SearchScreenCustomer({ navigation }) {
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
                console.log(result.data.city);
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
                <Text style={{ fontSize: 25, color: '#445391', fontWeight: '600' }}>Поиск</Text>
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
                    {categories.length ? categories.map((el, i) => <TouchableOpacity style={{ marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} key={i}
                        onPress={() => {
                            el.childrens.length ? navigation.navigate('SubCategoryScreen', { category: el })
                                : navigation.navigate('CategoryScreen', { category: el })
                        }}>
                        <View style={{flexDirection: 'row', flexShrink: 1, marginBottom: 10,}}>
                            <Image style={{width: 35, height: 35, marginRight: 15}} source={{uri: `${APP_IMAGE_URL}${el.icon}`}}/>
                            <Text style={{  fontSize: 21, color: '#445391', flexShrink: 1 }}>{el.name}</Text>
                        </View>
                        <Image source={require("../../../assets/image/right-arrow.png")} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                    ) :
                        <View style={{ marginTop: 30 }}>
                            <Loading />
                        </View>
                    }
                </ScrollView>
            </View>
            <CustomerMainPageNavComponent
                active_page={"Поиск"}
                navigation={navigation}
            />
        </SafeAreaView>
    )
}