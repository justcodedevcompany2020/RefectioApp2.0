import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native";
import { BackBtn } from "../search/customer/CategorySingleScreen";
import CustomerMainPageNavComponent from "./CustomerMainPageNav";

export default function SelectSubCategoryScreen({ navigation, category, user_id }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{
                flex: 1,
                paddingHorizontal: 15,
                position: "relative",
            }}>
                <BackBtn onPressBack={() => navigation.goBack()} />
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 15 }}>
                    <Text style={{ marginBottom: 20, fontSize: 23, color: 'black', fontWeight: '500' }}>{category.name}</Text>
                    {category.childrens.length ? category.childrens.map((el, i) => <TouchableOpacity style={{borderBottomWidth: 1, borderColor: 'lightgray', marginBottom: 10}}  key={i} onPress={() =>
                        navigation.navigate('AddProduct', { category: el, user_id: user_id })
                    }>
                        <Text style={{ color: 'black', fontSize: 20, marginBottom: 15 }}>{el.name}</Text>
                    </TouchableOpacity>) :
                        <View style={{ marginTop: 30 }}>
                            <Text>Ничего не найдено</Text>
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