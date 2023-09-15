import * as React from "react";
import { View, Image, StatusBar, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthScreenComponent from "./components/Auth/AuthScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./components/AuthContext/context";
import LoginScreenComponent from "./components/Auth/LoginScreen";
import RegisteredScreenComponent from "./components/Auth/RegisteredScreen";
import RegistrationUserScreenComponent from "./components/Auth/RegistrationUserScreen";
import RegistrationManufacturerComponent from "./components/Auth/RegistrationManufacturer";
import ConfirmTelScreenComponent from "./components/Auth/ConfirmTelScreen";
import CustomerMainPageComponent from "./components/Customer/CustomerMainPage";
import GhostPageComponent from "./components/Ghost/GhostPage";
import GhostPageTwoComponent from "./components/Ghost/GhostPageTwo";
import DesignerPageComponent from "./components/Designer/DesignerPage";
import EditPhoneNumberComponent from "./components/Auth/EditPhoneNumber";
import DesignerPageTwoComponent from "./components/Designer/DesignerPageTwo";
import CustomerPageTwoComponent from "./components/Customer/CustomerPageTwo";
import ForgetPasswordComponent from "./components/Auth/ForgetPassword";
import ForgetPasswordTelComponent from "./components/Auth/ForgetPasswordTel";
import NewPasswordComponent from "./components/Auth/NewPassword";
// import DesignerMyBroniComponent from "./components/Designer/DesignerMyBroni";
import MyAccauntComponent from "./components/Designer/MyAccaunt";
import DesignerSavedComponent from "./components/Designer/DesignerSaved";
// import CustomerMyBroniComponent from "./components/Customer/CustomerMyBroni";
// import CustomerRewardsComponent from "./components/Customer/CustomerRewards";
import CustomerMyAccauntComponent from "./components/Customer/CustomerMyAccaunt";
// import CheckDesignerComponent from "./components/Customer/CheckDesigner";
import PraductiaComponent from "./components/Customer/Praductia";
import AddProductComponent from "./components/Customer/AddProduct";
import ModalComponent from "./components/Ghost/Modal";
import EditPhoneNumberConfirmComponent from "./components/Auth/EditPhoneNumberConfirm";
import EditPasswordCustomerCompnent from "./components/Auth/EditPaswordCustomer";
import EditPhoneNumberDesignerComponent from "./components/Auth/EditPhoneNumberDesigner";
import EditPhoneNumberDesignerConfirmComponent from "./components/Auth/EditPhoneNumberDesignerConfirm";
import EditPasswordDesignerCompnent from "./components/Auth/EditPaswordDesigner";
import ZakaziLiveComponent from "./components/Customer/Live/ZakaziLive";
import LiveZakazchikSinglComponent from "./components/Customer/Live/LiveZakazchikSingl";
import AddZakaziComponent from "./components/Customer/Live/AddZakazi";
import EditZakaziComponent from "./components/Customer/Live/EditZakazi";
import ZakaziLiveDesignerComponent from "./components/Designer/Live/ZakaziLiveDesigner";
import LiveZakazchikSinglDesignerComponent from "./components/Designer/Live/LiveZakazchikSinglDesigner";
import AddZakazchikDesignerComponent from "./components/Designer/Live/AddZakazchikDesigner";
import EditProductComponent from "./components/Customer/EditProduct";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { APP_URL } from "@env";
import SearchScreenGuest from "./components/search/guest/SearchScreen";
import CategoryScreenGuest from "./components/search/guest/CategoryScreen";
import CategorySingleScreenGuest from "./components/search/guest/CategorySingleScreen";
import SearchScreenDesigner from "./components/search/designer/SearchScreen";
import CategoryScreenDesigner from "./components/search/designer/CategoryScreen";
import CategorySingleScreenDesigner from "./components/search/designer/CategorySingleScreen";
import SearchScreenCustomer from "./components/search/customer/SearchScreen";
import CategoryScreenCustomer from "./components/search/customer/CategoryScreen";
import CategorySingleScreenCustomer from "./components/search/customer/CategorySingleScreen";
import AboutUsScreen from "./components/Customer/AboutUsScreen";
import SubCategoryScreenCustomer from "./components/search/customer/SubCategoryScreen";
import SubCategoryScreenDesigner from "./components/search/designer/SubCategoryScreen";
import SubCategoryScreenGuest from "./components/search/guest/SubCategoryScreen";
import SelectCategoryScreen from "./components/Customer/SelectCategoryScreen";
import SelectSubCategoryScreen from "./components/Customer/SelectSubCategoryScreen";

const Stack = createStackNavigator();

function AuthScreen({ navigation }) {
  return <AuthScreenComponent navigation={navigation} />;
}

function LoginScreen({ navigation }) {
  return <LoginScreenComponent navigation={navigation} />;
}

function RegisteredScreen({ navigation }) {
  return <RegisteredScreenComponent navigation={navigation} />;
}

function RegistrationUserScreen({ navigation }) {
  return <RegistrationUserScreenComponent navigation={navigation} />;
}

function RegistrationManufacturer({ navigation }) {
  return <RegistrationManufacturerComponent navigation={navigation} />;
}

function ConfirmTelScreenFunction({ route, navigation }) {
  const { params } = route.params;

  return <ConfirmTelScreenComponent token={params} navigation={navigation} />;
}

function CustomerMainPage({ navigation }) {
  return <CustomerMainPageComponent navigation={navigation} />;
}

function GhostPage({ navigation }) {
  return <GhostPageComponent navigation={navigation} />;
}

function SelectCategoryScreenComponent({ navigation }) {
  return <SelectCategoryScreen navigation={navigation} />;
}

function SelectSubCategoryScreenComponent({ navigation, route }) {
  return <SelectSubCategoryScreen navigation={navigation} category={route.params.category} />;
}
function EditPhoneNumberConfirmFunc({ route, navigation }) {
  const { params } = route.params;

  return (
    <EditPhoneNumberConfirmComponent
      phoneNumb={params}
      navigation={navigation}
    />
  );
}

function EditPhoneNumberDesigner({ navigation }) {
  return <EditPhoneNumberDesignerComponent navigation={navigation} />;
}

function EditPhoneNumberDesignerConfirm({ route, navigation }) {
  const { params } = route.params;

  return (
    <EditPhoneNumberDesignerConfirmComponent
      phoneNumb={params}
      navigation={navigation}
    />
  );
}

function EditPasswordCustomer({ navigation }) {
  return <EditPasswordCustomerCompnent navigation={navigation} />;
}

function GhostPageTwoFunc({ route, navigation }) {
  const { params } = route.params;

  return <GhostPageTwoComponent user_id={params} navigation={navigation} />;
}
function DesignerPageTwo({ route, navigation }) {
  const { params } = route.params;
  return <DesignerPageTwoComponent user_id={params} navigation={navigation} />;
}

function CustomerPageTwo({ route, navigation }) {
  const { params } = route.params;

  return <CustomerPageTwoComponent userID={params} navigation={navigation} />;
}

function SearchScreenComponentGuest({ navigation }) {
  return <SearchScreenGuest navigation={navigation} />;
}
function CategoryScreenComponentGuest({ navigation, route }) {
  return <CategoryScreenGuest navigation={navigation} category={route.params.category} />;
}

function CategorySingleScreenComponentGuest({ navigation, route }) {
  return <CategorySingleScreenGuest navigation={navigation} category={route.params.category} mynextUrl={route.params.nextUrl} myproducts={route.params.products} product={route.params.product} />
}


function SearchScreenComponentDesigner({ navigation }) {
  return <SearchScreenDesigner navigation={navigation} />;
}
function CategoryScreenComponentDesigner({ navigation, route }) {
  return <CategoryScreenDesigner navigation={navigation} category={route.params.category} />;
}

function CategorySingleScreenComponentDesigner({ navigation, route }) {
  return <CategorySingleScreenDesigner navigation={navigation} category={route.params.category} mynextUrl={route.params.nextUrl} myproducts={route.params.products} product={route.params.product} />
}

function SearchScreenComponentCustomer({ navigation }) {
  return <SearchScreenCustomer navigation={navigation} />;
}
function CategoryScreenComponentCustomer({ navigation, route }) {
  return <CategoryScreenCustomer navigation={navigation} category={route.params.category} />;
}

function CategorySingleScreenComponentCustomer({ navigation, route }) {
  return <CategorySingleScreenCustomer navigation={navigation} category={route.params.category} mynextUrl={route.params.nextUrl} myproducts={route.params.products} product={route.params.product} />
}

function SubCategoryScreenComponentCustomer({ navigation, route }) {
  return <SubCategoryScreenCustomer navigation={navigation} category={route.params.category} />
}

function SubCategoryScreenComponentDesigner({ navigation, route }) {
  return <SubCategoryScreenDesigner navigation={navigation} category={route.params.category} />
}
function SubCategoryScreenComponentGuest({ navigation, route }) {
  return <SubCategoryScreenGuest navigation={navigation} category={route.params.category} />
}

function AboutUsScreenComponent({ navigation, route }) {
  return <AboutUsScreen navigation={navigation} onPressSave={route.params.onPressSave} onChangeText={route.params.onChangeText} value={route.params.value} />
}

function ForgetPassword({ navigation }) {
  return <ForgetPasswordComponent navigation={navigation} />;
}
function ForgetPasswordTel({ navigation }) {
  return <ForgetPasswordTelComponent navigation={navigation} />;
}

function NewPassword({ navigation }) {
  return <NewPasswordComponent navigation={navigation} />;
}

// function DesignerMyBroni({ navigation }) {
//   return <DesignerMyBroniComponent navigation={navigation} />;
// }

function MyAccaunt({ navigation }) {
  return <MyAccauntComponent navigation={navigation} />;
}

function DesignerSaved({ navigation }) {
  return <DesignerSavedComponent navigation={navigation} />;
}

// function CustomerMyBroni({ navigation }) {
//   return <CustomerMyBroniComponent navigation={navigation} />;
// }

// function CustomerRewards({ navigation }) {
//   return <CustomerRewardsComponent navigation={navigation} />;
// }

function CustomerMyAccaunt({ navigation }) {
  return <CustomerMyAccauntComponent navigation={navigation} />;
}

// function CheckDesigner({ navigation }) {
//   return <CheckDesignerComponent navigation={navigation} />;
// }

function PraductiaFunc({ route, navigation }) {
  const { params } = route.params;

  return (
    <PraductiaComponent
      user_id={params}
      navigation={navigation}
      product_id={params}
    />
  );
}

function AddProductScreen({ route, navigation }) {
  const { category } = route.params;
  return <AddProductComponent category={category} navigation={navigation} />;
}

function EditProductScreen({ route, navigation }) {
  return (
    <EditProductComponent user_id={route.params} navigation={navigation} />
  );
}

function Modal({ navigation }) {
  return <ModalComponent navigation={navigation} />;
}

function ZakaziLive({ navigation }) {
  return <ZakaziLiveComponent navigation={navigation} />;
}

function LiveZakazchikSinglFunc({ route, navigation }) {
  const { params } = route.params;
  console.log(params);
  return (
    <LiveZakazchikSinglComponent navigation={navigation} item_id={params} />
  );
}

function AddZakaziFunc({ route, navigation }) {
  const { params } = route.params;
  return <AddZakaziComponent navigation={navigation} item_id={params} />;
}

function EditZakaziFunc({ route, navigation }) {
  const { params } = route.params;

  return (
    <EditZakaziComponent
      navigation={navigation}
      order_id={params.order_id}
      item_id={params.item_id}
    />
  );
}

function ZakaziLiveDesignerFunc({ navigation }) {
  return <ZakaziLiveDesignerComponent navigation={navigation} />;
}

function LiveZakazchikSinglDesignerFunc({ route, navigation }) {
  console.log(route.params);
  const { params } = route.params;
  return (
    <LiveZakazchikSinglDesignerComponent
      navigation={navigation}
      item_id={params}
    />
  );
}

function AddZakazchikDesigner({ navigation }) {
  return <AddZakazchikDesignerComponent navigation={navigation} />;
}

const tabBarStyle = {
  height: 90,
  backgroundColor: "white",
  elevation: 0,
  borderTopColor: "white",
  width: Dimensions.get("window").width - 50,
  marginTop: 0,
  marginRight: "auto",
  marginBottom: 0,
  marginLeft: "auto",
};

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [userRole, setUserRole] = React.useState(null);

  const initialLoginState = {
    isLoading: true,
    userToken: null,
    userRole: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          userToken: action.userToken,
          userRole: action.userRole,

          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userToken: action.userToken,
          userRole: action.userRole,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userToken: null,
          userRole: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userToken: action.userToken,
          userRole: action.userRole,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        // setIsLoading(true);
        const userToken = String(foundUser.userToken);
        const userRole = String(foundUser.userRole);

        try {
          await AsyncStorage.setItem("userToken", userToken);
          await AsyncStorage.setItem("userRole", userRole);

          console.log(userToken, "userToken -  AFTER LOGIN");
          console.log(userRole, "userRole -  AFTER LOGIN");
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGIN", userToken: userToken, userRole: userRole });
      },
      signOut: async (callback) => {
        try {
          await AsyncStorage.removeItem("userToken");
          await AsyncStorage.removeItem("userRole");

          setIsLoading(false);
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: "LOGOUT" });
      },
      signUp: () => {
        // setIsLoading(false);
      },
      notify_count: 0
    }),
    []
  );

  getLiveZakaz = async () => {
    let token = await AsyncStorage.getItem("userToken");
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${APP_URL}GetManufacterOrders`, requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === true) {

          if (responseJson.data.data.length > 0) {
            authContext.notify_count = responseJson.notify_count
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Проверка при входе в приложение.

  React.useEffect(() => {
    setTimeout(async () => {
      let userToken;
      let userRole;

      userToken = null;
      userRole = null;

      try {
        // await AsyncStorage.clear()

        userToken = await AsyncStorage.getItem("userToken");
        userRole = await AsyncStorage.getItem("userRole");

        console.log(userToken, "userToken");
        console.log(userRole, "userRole");

        setIsLoading(false);
        console.log("test");
      } catch (e) {
        console.log(e);
      }
      dispatch({
        type: "RETRIEVE_TOKEN",
        userToken: userToken,
        userRole: userRole,
      });
    }, 1000);
    setInterval(() => {
      this.getLiveZakaz()
    }, 3000);
  }, []);

  if (isLoading) {
    return (
      // <View style={{ backgroundColor: '#fff', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //   <ActivityIndicator size={100} color="#00f" />
      // </View>

      <View style={{ flex: 1 }}>
        <Image
          source={require("./assets/splash.png")}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    );
  } else {
    return (
      <AuthContext.Provider value={authContext}>
        <StatusBar
          animated={true}
          hidden={false}
          backgroundColor="white"
          barStyle="dark-content"
        />
        <NavigationContainer>
          {
            //  Designer Pages Tabs
            loginState.userToken !== null && loginState.userRole == "2" ? (
              <Stack.Navigator
                initialRouteName="DesignerPage"
                screenOptions={({ route }) => ({
                  tabBarShowLabel: false,
                  headerShown: false,
                  tabBarActiveTintColor: "#2EB6A5",
                  tabBarInactiveTintColor: "gray",
                  tabBarStyle: tabBarStyle,
                })}
              >
                <Stack.Screen
                  name="DesignerPage"
                  component={DesignerPageComponent}
                />

                {/* <Stack.Screen
                  name="DesignerMyBroni"
                  component={DesignerMyBroniComponent}
                /> */}
                <Stack.Screen
                  name="DesignerPageTwo"
                  component={DesignerPageTwo}
                />

                <Stack.Screen
                  name="DesignerSaved"
                  component={DesignerSavedComponent}
                />
                <Stack.Screen name="MyAccaunt" component={MyAccauntComponent} />
                <Stack.Screen
                  name="SearchScreen"
                  component={SearchScreenComponentDesigner}
                />
                <Stack.Screen
                  name="CategoryScreen"
                  component={CategoryScreenComponentDesigner}
                />
                <Stack.Screen
                  name="CategorySingleScreen"
                  component={CategorySingleScreenComponentDesigner}
                />
                <Stack.Screen
                  name="SubCategoryScreen"
                  component={SubCategoryScreenComponentDesigner}
                />
                <Stack.Screen
                  name="EditPhoneNumberDesigner"
                  component={EditPhoneNumberDesignerComponent}
                />
                <Stack.Screen
                  name="EditPhoneNumberDesignerConfirm"
                  component={EditPhoneNumberDesignerConfirm}
                />
                <Stack.Screen
                  name="EditPasswordDesigner"
                  component={EditPasswordDesignerCompnent}
                />
                <Stack.Screen
                  name="ZakaziLiveDesigner"
                  component={ZakaziLiveDesignerFunc}
                />
                <Stack.Screen
                  name="LiveZakazchikSinglDesigner"
                  component={LiveZakazchikSinglDesignerFunc}
                />
                <Stack.Screen
                  name="AddZakazchikDesigner"
                  component={AddZakazchikDesignerComponent}
                />
              </Stack.Navigator>
            ) : // Customer Pages Tabs

              loginState.userToken !== null && loginState.userRole == "3" ? (
                <Stack.Navigator
                  initialRouteName="CustomerMainPage"
                  screenOptions={({ route }) => ({
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarActiveTintColor: "#2EB6A5",
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: tabBarStyle,
                  })}
                >
                  <Stack.Screen
                    name="CustomerMainPage"
                    component={CustomerMainPageComponent}
                  />
                  <Stack.Screen name="AddProduct" component={AddProductScreen} />
                  {/* <Stack.Screen
                  name="CheckDesigner"
                  component={CheckDesignerComponent}
                /> */}

                  <Stack.Screen
                    name="CustomerMyAccaunt"
                    component={CustomerMyAccauntComponent}
                  />
                  <Stack.Screen
                    name="SelectSubCategoryScreen"
                    component={SelectSubCategoryScreenComponent}
                  />
                  <Stack.Screen
                    name="CustomerPageTwo"
                    component={CustomerPageTwo}
                  />
                  <Stack.Screen
                    name="SelectCategoryScreen"
                    component={SelectCategoryScreenComponent}
                  />
                  <Stack.Screen name="Praductia" component={PraductiaFunc} />
                  <Stack.Screen
                    name="EditPhoneNumber"
                    component={EditPhoneNumberComponent}
                  />
                  <Stack.Screen
                    name="EditPhoneNumberConfirm"
                    component={EditPhoneNumberConfirmFunc}
                  />

                  <Stack.Screen
                    name="EditPasswordCustomer"
                    component={EditPasswordCustomerCompnent}
                  />
                  <Stack.Screen
                    name="ZakaziLive"
                    component={ZakaziLiveComponent}
                  />
                  <Stack.Screen
                    name="LiveZakazchikSingl"
                    component={LiveZakazchikSinglFunc}
                  />
                  <Stack.Screen name="AddZakazi" component={AddZakaziFunc} />
                  <Stack.Screen name="EditZakazi" component={EditZakaziFunc} />
                  <Stack.Screen
                    name="EditProduct"
                    component={EditProductScreen}
                  />
                  <Stack.Screen
                    name="SearchScreen"
                    component={SearchScreenComponentCustomer}
                  />
                  <Stack.Screen
                    name="CategoryScreen"
                    component={CategoryScreenComponentCustomer}
                  />
                  <Stack.Screen
                    name="CategorySingleScreen"
                    component={CategorySingleScreenComponentCustomer}
                  />
                  <Stack.Screen
                    name="SubCategoryScreen"
                    component={SubCategoryScreenComponentCustomer}
                  />
                  <Stack.Screen
                    name="AboutUsScreen"
                    component={AboutUsScreenComponent}
                  />
                </Stack.Navigator>
              ) : // Guest pages tabs

                loginState.userToken == null ? (
                  <Stack.Navigator
                    initialRouteName="GhostPage"
                    screenOptions={({ route }) => ({
                      tabBarShowLabel: false,
                      headerShown: false,
                      tabBarActiveTintColor: "#2EB6A5",
                      tabBarInactiveTintColor: "gray",
                      tabBarStyle: tabBarStyle,
                    })}
                  >
                    <Stack.Screen name="GhostPage" component={GhostPageComponent} />
                    <Stack.Screen
                      name="LoginScreen"
                      component={LoginScreenComponent}
                    />
                    <Stack.Screen
                      name="ConfirmTelScreen"
                      component={ConfirmTelScreenFunction}
                    />
                    <Stack.Screen
                      name="RegisteredScreen"
                      component={RegisteredScreenComponent}
                    />
                    <Stack.Screen
                      name="RegisteredUserScreen"
                      component={RegistrationUserScreenComponent}
                    />
                    <Stack.Screen
                      name="RegistrationManufacturer"
                      component={RegistrationManufacturerComponent}
                    />
                    <Stack.Screen
                      name="AuthScreen"
                      component={AuthScreenComponent}
                    />
                    <Stack.Screen
                      name="SearchScreen"
                      component={SearchScreenComponentGuest}
                    />
                    <Stack.Screen
                      name="CategoryScreen"
                      component={CategoryScreenComponentGuest}
                    />
                    <Stack.Screen
                      name="CategorySingleScreen"
                      component={CategorySingleScreenComponentGuest}
                    />
                    <Stack.Screen
                      name="SubCategoryScreen"
                      component={SubCategoryScreenComponentGuest}
                    />
                    <Stack.Screen
                      name="GhostPageTwo"
                      component={GhostPageTwoFunc}
                    />
                    <Stack.Screen
                      name="ForgetPassword"
                      component={ForgetPasswordComponent}
                    />
                    <Stack.Screen
                      name="ForgetPasswordTel"
                      component={ForgetPasswordTelComponent}
                    />
                    <Stack.Screen
                      name="NewPassword"
                      component={NewPasswordComponent}
                    />
                    <Stack.Screen name="Modal" component={ModalComponent} />
                  </Stack.Navigator>
                ) : (
                  <></>
                )
          }
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
}
