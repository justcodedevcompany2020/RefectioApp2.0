import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Path, Svg } from "react-native-svg";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { APP_URL, APP_IMAGE_URL } from "@env";
import { Image } from "react-native";
import { RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider2 from "../../slider/Slider2";
import Loading from "../../Component/Loading";
import GhostNavComponent from "../../Ghost/GhostNav";
import shuffle from "../shuffle";

const { WIDTH } = Dimensions.get('screen')

export default function CategorySingleScreenGuest({ navigation, category, mynextUrl, myproducts, product, cityId, startPrice, endPrice }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [moreLoading, setMoreLoading] = useState()
    const [nextUrl, setNextUrl] = useState(mynextUrl)
    const firstPageUrl = 'https://admin.refectio.ru/public/api/photo_filter'
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        setProduct()
    }, [])

    function setProduct() {
        let myProducts = myproducts
        let item = myProducts.splice(product, 1)
        myProducts.unshift(item[0])
        setProducts(myProducts)
        setLoading(false)
    }

    async function getProducts(refresh) {
        let formdata = new FormData();
        if (category.parent) {
            console.log('subcategory');
            formdata.append("parent_category_id", category.parent_id)
            formdata.append("category_id", category.id)
        } else {
            formdata.append("parent_category_id", category.id)
        }

        cityId && formdata.append("city_id", cityId.id)
        startPrice && formdata.append("start_price", startPrice.replaceAll('.', ''))
        endPrice && formdata.append("end_price", endPrice.replaceAll('.', ''))

        await fetch(refresh ? firstPageUrl : nextUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formdata,
        })
            .then((response) => response.json()).then(res => {
                console.log(refresh ? firstPageUrl : nextUrl, res.data.data.length);
                let arr = shuffle(res.data.data)
                refresh ? setProducts(arr) : setProducts([...products, ...arr]);
                setNextUrl(res.data.next_page_url)
                setIsRefreshing(false);
                setLoading(false);
                setMoreLoading(false);
            })
    }

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
                    renderItem={({ item, }) => {
                        return <View style={{ marginTop: 15 }}>
                            <Slider2 slid={item.product_image} searchMode />
                            <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10 }} onPress={() => navigation.navigate("GhostPageTwo", {
                                params: item.user_product.id,
                            })}>
                                <Image
                                    source={{ uri: APP_IMAGE_URL + item.user_product.logo }}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        marginRight: 12,
                                        borderRadius: 15,
                                    }}
                                />
                                <View>
                                    <Text
                                        style={{
                                            fontFamily: "Raleway_600SemiBold",
                                            fontSize: 13,
                                            marginTop: 5,
                                            marginBottom: 4,
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                    {item.facades && (
                                        <Text>
                                            Фасады : {item.facades}
                                        </Text>
                                    )}
                                    {item.frame && (
                                        <Text>
                                            Корпус: {item.frame}
                                        </Text>
                                    )}
                                    {item.profile && (
                                        <Text>
                                            Профиль: {item.profile}
                                        </Text>
                                    )}
                                    {item.tabletop && (
                                        <Text>
                                            Столешница: {item.tabletop}
                                        </Text>
                                    )}
                                    {item.length && (
                                        <Text>
                                            Длина: {item.length} м.
                                        </Text>
                                    )}
                                    {item.height && (
                                        <Text>
                                            Высота: {item.height} м.
                                        </Text>
                                    )}
                                    {item.material && (
                                        <Text>
                                            Материал: {item.material}
                                        </Text>
                                    )}
                                    {item.price && (
                                        <Text>
                                            Цена: {item.price.toString().split(".").join("").replace(/\B(?=(\d{3})+(?!\d))/g, ".")} руб.
                                        </Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>
                    }}
                    ListHeaderComponent={() => <Text style={{ marginTop: 20, fontSize: 20 }}>{category.name}</Text>}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={renderFooter}
                    refreshControl={<RefreshControl refreshing={isRefreshing} colors={['#94D8F4']} onRefresh={handleRefresh} />}
                />
            }
        </View>
        <GhostNavComponent
            active_page={"Поиск"}
            navigation={navigation}
        />
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