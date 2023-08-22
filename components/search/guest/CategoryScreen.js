import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Path, Svg } from "react-native-svg";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import {  APP_IMAGE_URL } from "@env";
import { Image } from "react-native";
import { RefreshControl } from "react-native";
import GhostNavComponent from "../../Ghost/GhostNav";
import Loading from "../../Component/Loading";

const { width } = Dimensions.get('screen')

export default function CategoryScreen({ navigation, category }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [moreLoading, setMoreLoading] = useState()
    const [nextUrl, setNextUrl] = useState('http://194.58.119.203/Refectio/public/api/photo_filter')
    const firstPageUrl = 'http://194.58.119.203/Refectio/public/api/photo_filter'
    const [isRefreshing, setIsRefreshing] = useState(false);

    async function getProducts(refresh) {
        let formdata = new FormData();
        formdata.append("category_id", category.id)
        await fetch(refresh ? firstPageUrl : nextUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formdata,
        })
            .then((response) => response.json()).then(res => {
                console.log(refresh ? firstPageUrl : nextUrl, res.data.data.length);

                refresh ? setProducts(res.data.data) : setProducts([...products, ...res.data.data]);
                setNextUrl(res.data.next_page_url)
                setIsRefreshing(false);
                setLoading(false);
                setMoreLoading(false);
            })
    }

    useEffect(() => {
        getProducts()
    }, [])

    const handleLoadMore = () => {
        if (nextUrl && !moreLoading) {
            console.log('handleLoadMore');
            setMoreLoading(true)
            getProducts()
        }
    }

    const renderFooter = () => {
        return <View style={{ marginVertical: 30 }}>
            {moreLoading ? <View style={{ marginBottom: 30 }}>
                <Loading />
            </View> : null}
        </View>
    }

    const handleRefresh = () => {
        setIsRefreshing(true);
        getProducts('refresh')
    };

    return <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{
            flex: 1,
            paddingHorizontal: 15,
            position: "relative",
        }}>
            <BackBtn onPressBack={() => navigation.goBack()} />
            {loading ? <Loading /> :
                <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                    data={products}
                    numColumns={3}
                    renderItem={({ item, index}) => {
                        return <TouchableOpacity onPress={() => navigation.navigate('CategorySingleScreen', { category, nextUrl, products, product: index })}>
                            <Image source={{ uri: APP_IMAGE_URL + item.product_image[0].image }} style={{ marginBottom: 5, marginRight: 5 }} width={(width - 40) / 3} height={(width - 40) / 3} />
                        </TouchableOpacity>
                    }}
                    ListHeaderComponent={() => <Text style={{ marginVertical: 20, fontSize: 20 }}>{category.name}</Text>}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={renderFooter}
                    refreshControl={<RefreshControl refreshing={isRefreshing} colors={['#94D8F4']} onRefresh={handleRefresh} />}
                />
            }
        </View>
        {<GhostNavComponent
            active_page={"Главная"}
            navigation={navigation}
        />}
    </SafeAreaView >

}

export function BackBtn({ onPressBack }) {
    return <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginLeft: -10 }} onPress={onPressBack}>
        <Svg
            width={25}
            height={30}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M20.168 27.708a1.458 1.458 0 01-1.137-.54l-7.044-8.75a1.458 1.458 0 010-1.851l7.292-8.75a1.46 1.46 0 112.245 1.866L15.006 17.5l6.3 7.817a1.458 1.458 0 01-1.138 2.391z"
                fill="#94D8F4"
            />
        </Svg>
        <Text style={styles.backText}>Назад</Text>
    </TouchableOpacity>
}


const styles = StyleSheet.create({
    backText: {
        color: '#94D8F4',
        fontSize: 16,
        marginTop: 5,
    }
})