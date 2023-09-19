import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native";
import CustomerMainPageNavComponent from "../../Customer/CustomerMainPageNav";
import { BackBtn } from "./CategoryScreen";

export default function SubCategoryScreen({ navigation, category }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{
                flex: 1,
                paddingHorizontal: 15,
                position: "relative",
            }}> 
                <BackBtn onPressBack={() => navigation.goBack()} />
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 15 }}>
                    <Text style={{ marginBottom: 15, fontSize: 23, color: 'black', fontWeight: '500' }}>{category.name}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('CategoryScreen', { category: category })}>
                        <Text style={{ color: 'black', fontSize: 20, marginBottom: 10 }}>Всё по кухням</Text>
                    </TouchableOpacity>
                    {category.childrens.length ? category.childrens.map((el, i) => <TouchableOpacity key={i} onPress={() => navigation.navigate('CategoryScreen', { category: el })}>
                        <Text style={{ color: 'black', fontSize: 20, marginBottom: 10 }}>{el.name}</Text>
                    </TouchableOpacity>) :
                        <View style={{ marginTop: 30 }}>
                            <Text>Нечего не найдено</Text>
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