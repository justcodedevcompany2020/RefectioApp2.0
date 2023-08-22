import React, { useEffect, useState } from "react";
import GhostNavComponent from "../../Ghost/GhostNav";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native";
import { APP_URL } from "@env";
import Loading from "../../Component/Loading";

export default function SearchScreen({ navigation }) {
    const [cities, setCities] = useState([])

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
                setCities(result.data.city);
            })
    }

    useEffect(() => {
        getRole()
        getCategories()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{
                flex: 1,
                paddingHorizontal: 15,
                marginTop: 40
            }}>
                {cities.length ? cities.map((el, i) => <TouchableOpacity key={i} onPress={() => navigation.navigate('CategoryScreen', {category: el})}>
                    <Text style={{color: '#445391', fontSize: 22, marginBottom: 10}}>#{el.name}</Text>
                </TouchableOpacity>) : <Loading />}
            </View>
            <GhostNavComponent
                active_page={"Главная"}
                navigation={navigation}
            />
        </SafeAreaView>
    )
}