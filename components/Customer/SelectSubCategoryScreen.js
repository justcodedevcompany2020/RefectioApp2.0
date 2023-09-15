import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native";
import { BackBtn } from "../search/customer/CategorySingleScreen";
import CustomerMainPageNavComponent from "./CustomerMainPageNav";

export default function SelectSubCategoryScreen({ navigation, category }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{
                flex: 1,
                paddingHorizontal: 15,
                position: "relative",
            }}>
                <BackBtn onPressBack={() => navigation.goBack()} />
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 15 }}>
                    <Text style={{ marginBottom: 15, fontSize: 23, color: '#445391', fontWeight: '500' }}>{category.name}</Text>
                    {category.childrens.length ? category.childrens.map((el, i) => <TouchableOpacity key={i} onPress={() =>
                        navigation.navigate('AddProduct', { category: el })
                    }>
                        <Text style={{ color: '#445391', fontSize: 20, marginBottom: 5 }}>{el.name}</Text>
                    </TouchableOpacity>) :
                        <View style={{ marginTop: 30 }}>
                            <Text>Нечего не найдено</Text>
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