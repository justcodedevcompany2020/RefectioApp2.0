import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { SafeAreaView } from "react-native";
import { BackBtn } from "./CategoryScreen";
import DesignerPageNavComponent from "../../Designer/DesignerPageNav";

export default function SubCategoryScreen({ navigation, subcategories, categoryName }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{
                flex: 1,
                paddingHorizontal: 15,
                position: "relative",
            }}>
                <BackBtn onPressBack={() => navigation.goBack()} />
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 15 }}>
                    <Text style={{ marginBottom: 15, fontSize: 23, color: '#445391', fontWeight: '500' }}>{categoryName}</Text>
                    {subcategories.length ? subcategories.map((el, i) => <TouchableOpacity key={i} onPress={() => navigation.navigate('CategoryScreen', { category: el, parentId: el.parent.id })}>
                        <Text style={{ color: '#445391', fontSize: 22, marginBottom: 10 }}>#{el.name}</Text>
                    </TouchableOpacity>) :
                        <View style={{ marginTop: 30 }}>
                            <Text>Нечего не найдено</Text>
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