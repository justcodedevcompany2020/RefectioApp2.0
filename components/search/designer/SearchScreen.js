import React, { useEffect, useState } from "react";
import GhostNavComponent from "../../Ghost/GhostNav";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native";
import { APP_URL, APP_IMAGE_URL } from "@env";
import Loading from "../../Component/Loading";
import DesignerPageNavComponent from "../../Designer/DesignerPageNav";
import { ScrollView } from "react-native";
import { Image } from "react-native";

export default function SearchScreenDesigner({ navigation }) {
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
                <Text style={{ fontSize: 25, color: 'black', fontWeight: '600' }}>Поиск</Text>
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 30 }}>
                    {categories.length ? categories.map((el, i) => <TouchableOpacity style={{ marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, paddingBottom: 5, borderBottomWidth: 1, borderColor: 'lightgray'  }} key={i}
                        onPress={() => {
                            el.childrens.length ? navigation.navigate('SubCategoryScreen', { category: el })
                            : navigation.navigate('CategoryScreen', { category: el })
                        }}>
                        <View style={{ flexDirection: 'row', flexShrink: 1, }}>
                            <Image style={{ width: 35, height: 35, marginRight: 15 }} source={{ uri: `${APP_IMAGE_URL}${el.icon}` }} />
                            <Text style={{ fontSize: 21, color: 'black', flexShrink: 1 }}>{el.name}</Text>
                        </View>
                        {el.childrens.length ? <Image source={require("../../../assets/image/right-arrow1.png")} style={{ width: 20, height: 20 }} />: null}
                    </TouchableOpacity>
                    ) :
                        <View style={{ marginTop: 30 }}>
                            <Loading />
                        </View>
                    }
                </ScrollView>
            </View>
            <DesignerPageNavComponent
                active_page={"Поиск"}
                navigation={navigation}
            />
        </SafeAreaView>
    )
}