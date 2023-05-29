import React, { Component, useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  ImageBackground,
  ActivityIndicator,
  Pressable,
} from "react-native";
import ArrowGrayComponent from "../../assets/image/ArrowGray";
import Slider from "../slider/Slider";
import CustomerMainPageNavComponent from "./CustomerMainPageNav";
import Svg, { Path, Rect } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BlueButton from "../Component/Buttons/BlueButton";
import { APP_URL, APP_IMAGE_URL } from "@env";

import {
  BottomSheetModalProvider,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import Loading from "../Component/Loading";

export default class PraductiaComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0,
      getAllProducts: [],

      user: [],
      user_bonus_for_designer: [],
      user_category_for_product: [],
      city_for_sales_user: [],
      products: [],

      delateProductModal: false,

      change_category_loaded: false,
      pressCategory: true,

      id: "",
      user_id: "",

      bottomSheetBool: false,
      isLoading: true,

      firstStarModal: false,
      addStarModal: false
    };
    this.bottomSheetRef = React.createRef(null);
    this.snapPoints = ["20%"];
  }

  getObjectData = async () => {
    let userID = this.props.user_id;

    await fetch(`${APP_URL}getOneProizvoditel/user_id=` + userID, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((res) => {
        let data = res.data.products;
        if (res.status === false) {
          data = [];
        } else {
          for (let i = 0; i < data.length; i++) {
            if (data[i].product_image.length < 1) {
              data[i].images = [];
              continue;
            }

            let product_image = data[i].product_image;

            data[i].images = product_image;
          }
        }
        if (res.data.message !== "no product") {
          const isFound = res.data.user_category_for_product.findIndex((element) => +element.category_id == 10);
          let arr = res.data.user_category_for_product
          if (isFound == 0) {
            arr = res.data.user_category_for_product
            let lastItem = res.data.user_category_for_product[0]
            arr.push(lastItem)
            arr.shift(res.data.user_category_for_product[0])
          }
          this.setState({
            user: res.data.user,
            user_bonus_for_designer: res.data.user_bonus_for_designer,
            user_category_for_product: arr,
            city_for_sales_user: res.data.city_for_sales_user,
          });
        }
      });
  };

  delateProduct = async () => {
    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem("userToken");
    myHeaders.append("Content-Type", "multipart/form-data");
    myHeaders.append("Authorization", "Bearer " + userToken);

    let formdata = new FormData();

    formdata.append("product_id[]", this.state.id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    await fetch(`${APP_URL}deleteAuthUserProduct`, requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        if (result.status === true) {
          await this.setState({
            delateProductModal: false,
            id: "",
            products: [],
            active: 0,
          });

          await this.updateProduct(
            this.state.user_category_for_product[0]?.category_name
          );
          await this.getObjectData();
        }
      })
      .catch((error) => console.log("error", error));
  };

  updateProduct = async (category_name) => {
    await this.setState({
      change_category_loaded: true,
    });
    let userID = this.props.user_id;
    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem("userToken");
    myHeaders.append("Authorization", "Bearer " + userToken);

    let formdata = new FormData();
    formdata.append("category_name", category_name);
    formdata.append("user_id", userID);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${APP_URL}filtergetOneProizvoditel`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.status === false) {
          this.setState({
            products: [],
            change_category_loaded: false,
          });

          return false;
        }

        let data = res.data;

        if (data.length === 0) {
          data = [];
        } else {
          for (let i = 0; i < data.length; i++) {
            if (data[i].product_image.length < 1) {
              data[i].images = [];
              continue;
            }

            let product_image = data[i].product_image;

            data[i].images = product_image;
          }
        }

        this.setState({
          products: data.products,
          change_category_loaded: false,
        });
      })
      .catch((error) => console.log("error", error));
  };

  updateProductAfterClickToCategory = async (category_name, index) => {
    await this.setState({
      change_category_loaded: true,
    });

    if (this.state.pressCategory) {
      this.setState({
        pressCategory: false,
        active: index,
      });

      let userID = this.props.user_id;

      await this.setState({
        change_category_loaded: true,
      });

      let myHeaders = new Headers();
      let userToken = await AsyncStorage.getItem("userToken");
      myHeaders.append("Authorization", "Bearer " + userToken);

      let formdata = new FormData();
      formdata.append("category_name", category_name);
      formdata.append("user_id", userID);

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch(`${APP_URL}filtergetOneProizvoditel`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
          if (res.status === false) {
            this.setState({
              products: [],
              change_category_loaded: false,
            });

            return false;
          }

          let data = res.data;
          if (data.length === 0) {
            data = [];
          } else {
            for (let i = 0; i < data.length; i++) {
              if (data[i].product_image.length < 1) {
                data[i].images = [];
                continue;
              }

              let product_image = data[i].product_image;

              data[i].images = product_image;
            }
          }

          this.setState({
            products: data.products,
            change_category_loaded: false,
            pressCategory: true,
          });
        });
    }
  };

  loadedDataAfterLoadPage = async () => {
    await this.getObjectData();
    await this.updateProduct(
      this.state.user_category_for_product[0]?.category_name
    );
    await this.setState({ active: 0 });
    this.setState({ isLoading: false })
  };

  componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener("focus", () => {
      this.loadedDataAfterLoadPage();
    });
  }

  componentWillUnmount() {
    if (this.focusListener) {
      this.focusListener();
    }
  }

  clearAllData = async () => {
    await this.setState({
      active: 0,
      getAllProducts: [],

      user: [],
      user_bonus_for_designer: [],
      user_category_for_product: [],
      city_for_sales_user: [],
      products: [],

      delateProductModal: false,

      change_category_loaded: false,
      pressCategory: true,

      id: "",
      user_id: "",
    });
  };

  handleSheetChanges = () => {
    this.bottomSheetRef?.current?.present();
    this.setState({ bottomSheetBool: true });
  };

  addStar = async (imageItem) => {

    let myHeaders = new Headers();
    let userToken = await AsyncStorage.getItem("userToken");
    myHeaders.append("Authorization", "Bearer " + userToken);

    let formdata = new FormData();
    formdata.append("photo_id", imageItem.id);
    console.log(userToken);

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    const value = JSON.parse(await AsyncStorage.getItem('starModal'))
    if (!value) {
      this.setState({
        firstStarModal: true
      })
    }

    fetch(`${APP_URL}add_star`, requestOptions)
      .then((response) => response.json())
      .then(res => {
        console.log(res);
        if (res.status == true) {
          let myProducts = this.state.products
          myProducts.forEach((el, i) => {
            el.product_image.forEach((productImage, j) => {
              if (productImage == imageItem) {
                if (res.message == 'added photo star') {
                  myProducts[i].product_image[j].star = '1'
                } else if (res.message == 'deleted photo star') {
                  myProducts[i].product_image[j].star = '0'
                }
              }
            });
          });
          this.setState({
            products: myProducts
          })
        } else {
          this.setState({ addStarModal: true });
        }
      })
  }

  render() {
    return (
      <BottomSheetModalProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <View style={styles.main}>
            {this.state.bottomSheetBool && (
              <Pressable
                style={{
                  width: "100%",
                  height: "90%",
                  position: "absolute",
                  left: 0,
                  top: 0,
                  zIndex: 2,
                }}
                onPress={() => {
                  this.bottomSheetRef?.current?.dismiss();
                  this.setState({ bottomSheetBool: false });
                }}
              />
            )}

            <Modal visible={this.state.delateProductModal}>
              <ImageBackground
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                source={require("../../assets/image/blurBg.png")}
              >
                <View
                  style={{
                    backgroundColor: "#FFFFFF",
                    width: "90%",
                    borderRadius: 20,
                    position: "relative",
                  }}
                >
                  <TouchableOpacity
                    style={{ position: "absolute", right: 18, top: 18 }}
                    onPress={() => {
                      this.setState({ delateProductModal: false });
                    }}
                  >
                    <Image
                      source={require("../../assets/image/ixs.png")}
                      style={{ width: 22.5, height: 22.5 }}
                    />
                  </TouchableOpacity>

                  <Text
                    style={{
                      fontFamily: "Poppins_500Medium",
                      fontSize: 22,
                      textAlign: "center",
                      marginTop: 70,
                      color: "#2D9EFB",
                    }}
                  >
                    {" "}
                    Удаление продукции
                  </Text>

                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "Poppins_400Regular",
                      marginTop: 30,
                      fontSize: 16,
                    }}
                  >
                    Подтвердите удаление выбранной{"\n"}продукции
                  </Text>

                  <TouchableOpacity
                    onPress={async () => {
                      await this.delateProduct();
                    }}
                    style={{ alignSelf: "center", marginTop: 67 }}
                  >
                    <BlueButton name="Подтвердить" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ delateProductModal: false });
                    }}
                    style={{
                      borderWidth: 3,
                      borderColor: "#B5D8FE",
                      width: 285,
                      height: 44,
                      justifyContent: "center",
                      borderRadius: 20,
                      alignSelf: "center",
                      marginTop: 12,
                      marginBottom: 46,
                    }}
                  >
                    <Text
                      style={{
                        color: "#B5D8FE",
                        fontSize: 18,
                        textAlign: "center",
                        fontFamily: "Poppins_700Bold",
                      }}
                    >
                      Отменить
                    </Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </Modal>

            <Modal visible={this.state.firstStarModal}>
              <ImageBackground
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                source={require("../../assets/image/blurBg.png")}
              >
                <View
                  style={{
                    backgroundColor: "#FFFFFF",
                    width: "90%",
                    borderRadius: 20,
                    position: "relative",
                  }}
                >
                  <TouchableOpacity
                    style={{ position: "absolute", right: 18, top: 18 }}
                    onPress={() => {
                      this.setState({ firstStarModal: false });
                    }}
                  >
                    <Image
                      source={require("../../assets/image/ixs.png")}
                      style={{ width: 22.5, height: 22.5 }}
                    />
                  </TouchableOpacity>

                  <Text
                    style={{
                      fontFamily: "Poppins_500Medium",
                      fontSize: 22,
                      textAlign: "center",
                      marginTop: 40,
                      color: "#2D9EFB",
                    }}
                  >
                    {" "}
                    Сведение
                  </Text>

                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "Poppins_400Regular",
                      marginTop: 10,
                      fontSize: 16,
                      marginHorizontal: 20
                    }}
                  >
                    Фотографии со ⭐️ будут отображаться на главной странице.
                    {"\n"}
                    {"\n"}
                    Всего можно выбрать не более 5-ти фото со ⭐️ по каждой категории.
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ firstStarModal: false });
                    }}
                    style={{ alignSelf: "center", marginTop: 20 }}
                  >
                    <BlueButton name="Ок" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={async () => {
                      this.setState({ firstStarModal: false });
                      await AsyncStorage.setItem('starModal', 'true')
                    }}
                    style={{
                      borderWidth: 3,
                      borderColor: "#B5D8FE",
                      width: 285,
                      height: 44,
                      justifyContent: "center",
                      borderRadius: 20,
                      alignSelf: "center",
                      marginTop: 12,
                      marginBottom: 46,
                    }}
                  >
                    <Text
                      style={{
                        color: "#B5D8FE",
                        fontSize: 18,
                        textAlign: "center",
                        fontFamily: "Poppins_700Bold",
                      }}
                    >
                      Больше не показывать
                    </Text>
                  </TouchableOpacity>

                </View>
              </ImageBackground>
            </Modal>

            <Modal visible={this.state.addStarModal}>
              <ImageBackground
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                source={require("../../assets/image/blurBg.png")}
              >
                <View
                  style={{
                    backgroundColor: "#FFFFFF",
                    width: "90%",
                    borderRadius: 20,
                    position: "relative",
                  }}
                >
                  <TouchableOpacity
                    style={{ position: "absolute", right: 18, top: 18 }}
                    onPress={() => {
                      this.setState({ addStarModal: false });
                    }}
                  >
                    <Image
                      source={require("../../assets/image/ixs.png")}
                      style={{ width: 22.5, height: 22.5 }}
                    />
                  </TouchableOpacity>

                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "Poppins_400Regular",
                      marginTop: 50,
                      fontSize: 16,
                      marginHorizontal: 20
                    }}
                  >
                    Всего можно выбрать не более 5-ти фото со ⭐️ по каждой категории.
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ addStarModal: false });
                    }}
                    style={{ alignSelf: "center", marginVertical: 20 }}
                  >
                    <BlueButton name="Ок" />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </Modal>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("CustomerMyAccaunt");
                this.clearAllData();
              }}
              style={{
                position: "absolute",
                left: 15,
                top: 10,
                zIndex: 100,
              }}
            >
              <ArrowGrayComponent />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                position: "relative",
                marginBottom: 25,
              }}
            >
              <Text
                style={{
                  width: "100%",
                  marginTop: 15,
                  textAlign: "center",
                  fontSize: 17,
                  fontFamily: "Poppins_600SemiBold",
                }}
              >
                Продукция
              </Text>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("AddProduct", {
                    params: this.props.user_id,
                  });
                  this.clearAllData();
                }}
                style={{
                  position: "absolute",
                  zIndex: 100,
                  right: 0,
                  bottom: -5,
                }}
              >
                <Image
                  source={require("../../assets/image/plus.png")}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginBottom: 23,
              }}
            >
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                {this.state.user_category_for_product?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={async () => {
                        await this.updateProductAfterClickToCategory(
                          item.category_name
                        );
                        this.bottomSheetRef?.current?.dismiss();
                        this.setState({ active: index });
                      }}
                      key={index}
                      style={
                        this.state.active === index
                          ? styles.slideButtonActive
                          : styles.slideButton
                      }
                    >
                      <Text
                        style={
                          this.state.active === index
                            ? styles.slideTextActive
                            : styles.slideText
                        }
                      >
                        {item.category_name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {this.state.change_category_loaded && (
              <View style={{ marginTop: 200 }}>
                <ActivityIndicator size={100} color={"#C2C2C2"} />
              </View>
            )}
            <ScrollView showsVerticalScrollIndicator={false}>
              {this.state.products.length === 0 ? (
                <View style={{ width: "100%", marginTop: 30 }}>
                  <Text
                    style={{
                      fontFamily: "Raleway_400Regular",
                      fontSize: 17,
                      textAlign: "center",
                    }}
                  >
                    По выбранной категорий нет продуктов
                  </Text>
                </View>
              ) : (
                !this.state.change_category_loaded &&
                this.state.products.map((item, index) => {
                  return (
                    <View
                      key={item.id}
                      style={{
                        position: "relative",
                        marginBottom: 18,
                      }}
                    >
                      <Slider slid={item.product_image} onPressStar={this.addStar} showStars />
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: 10,
                        }}
                      >
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

                        <TouchableOpacity
                          onPress={() => {
                            this.handleSheetChanges();
                            this.setState({ id: item.id });
                          }}
                          style={{ padding: 0 }}
                        >
                          <Text
                            style={{
                              fontSize: 40,
                              lineHeight: 20,
                            }}
                          >
                            ...
                          </Text>
                        </TouchableOpacity>
                      </View>
                      {item.facades && (
                        <Text style={{ fontFamily: "Raleway_400Regular" }}>
                          Фасады : {item.facades}
                        </Text>
                      )}
                      {item.frame && (
                        <Text style={{ fontFamily: "Raleway_400Regular" }}>
                          Корпус: {item.frame}
                        </Text>
                      )}
                      {item.tabletop && (
                        <Text style={{ fontFamily: "Raleway_400Regular" }}>
                          Столешница: {item.tabletop}
                        </Text>
                      )}
                      {item.length && (
                        <Text style={{ fontFamily: "Raleway_400Regular" }}>
                          Длина: {item.length} метров*
                        </Text>
                      )}

                      {item.height && (
                        <Text style={{ fontFamily: "Raleway_400Regular" }}>
                          Высота: {item.height} метров*
                        </Text>
                      )}
                      {item.material && (
                        <Text style={{ fontFamily: "Raleway_400Regular" }}>
                          Материал: {item.material}
                        </Text>
                      )}
                      {item.description && (
                        <Text style={{ fontFamily: "Raleway_400Regular" }}>
                          Описание: {item.description}
                        </Text>
                      )}
                      {item.inserciones && (
                        <Text style={{ fontFamily: "Raleway_400Regular" }}>
                          Вставки: {item.inserciones}
                        </Text>
                      )}
                      {item.price && (
                        <Text style={{ fontFamily: "Raleway_400Regular" }}>
                          Цена: {item.price} руб.
                        </Text>
                      )}
                    </View>
                  );
                })
              )}
            </ScrollView>
            <BottomSheetModal
              ref={this.bottomSheetRef}
              stackBehavior="push"
              snapPoints={this.snapPoints}
              onDismiss={() => this.setState({ bottomSheetBool: false })}

            // onChange={handleSheetChanges}
            // backgroundStyle={{backgroundColor: 'black'}}
            >
              <View style={styles.contentContainer}>
                <TouchableOpacity
                  onPress={() => {
                    if (this.state.id !== 0) {
                      this.setState({ delateProductModal: true });
                      this.bottomSheetRef?.current?.dismiss();
                    }
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../../assets/image/karzina.png")}
                    style={{
                      width: 30,
                      height: 30,
                      marginRight: 15,
                    }}
                    resizeMode={"contain"}
                  />
                  <Text style={{ fontSize: 16 }}>Удалить</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (this.state.id !== "") {
                      this.props.navigation.navigate("EditProduct", {
                        product_id: this.state.id,
                        user_id: this.props.user_id,
                      });
                      this.bottomSheetRef?.current?.dismiss();
                      this.clearAllData();
                    }
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <Image
                    source={require("../../assets/image/matit.png")}
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: 20,
                    }}
                    resizeMode={"contain"}
                  />
                  <Text style={{ fontSize: 16 }}>Редактировать</Text>
                </TouchableOpacity>
              </View>
            </BottomSheetModal>
          </View>
          <CustomerMainPageNavComponent navigation={this.props.navigation} />
          {this.state.isLoading && <Loading />}
        </SafeAreaView>
      </BottomSheetModalProvider>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
    paddingHorizontal: 15,
  },
  checkBox: {
    position: "absolute",
    zIndex: 100,
    right: 8,
    top: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  slideButton: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginRight: 6,
  },
  slideButtonActive: {
    backgroundColor: "#94D8F4",
    borderRadius: 8,
    marginRight: 6,
  },
  slideTextActive: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    fontFamily: "Raleway_600SemiBold",
    color: "white",
  },
  slideText: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
    fontFamily: "Raleway_600SemiBold",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderColor: "#E5E5E5",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
