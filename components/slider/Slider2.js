import React, { useEffect, useState, useRef, memo } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  Text,
  FlatList,
  Animated,
  Platform,
} from "react-native";
import { APP_IMAGE_URL } from "@env";
import ImageViewer from 'react-native-image-zoom-viewer';
import { SafeAreaView } from "react-native";

const width = Dimensions.get("window").width - 25;

export default function Slider2(props) {

  const [sliderModal, setSliderModal] = useState(false);
  const [imgActive, setInmageActive] = useState(0);
  const change = (nativeEvent) => {
    const slider = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slider !== imgActive) {
      setInmageActive(slider);
    }
  }

  let sliderItem = ({ item, index }) => {
    return sliderModal === true ? (

      <Image
        source={{ uri: APP_IMAGE_URL + item.image }}
        style={{ height: "100%", width: props.searchMode ? width : width, resizeMode: "contain" }}
      />
    ) : (
      <TouchableOpacity onPress={() => setSliderModal(true)} activeOpacity={1}>
        <Image
          source={{ uri: APP_IMAGE_URL + item.image }}
          style={{ height: "100%", width: props.searchMode ? width : width, resizeMode: "cover" }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Modal visible={sliderModal} onRequestClose={() => setSliderModal(false)}>
        <SafeAreaView style={styles.sliderModal}>
          <TouchableOpacity
            style={{ position: "absolute", right: 18, top: 18, zIndex: 50 }}
            onPress={() => {
              setSliderModal(false);
              setInmageActive(0);
            }}
          >
            <Image
              source={require("../../assets/image/ixs.png")}
              style={[
                { tintColor: "white", width: 30, height: 30 },
                Platform.OS == "ios" ? { marginTop: 25 } : "",
              ]}
            />
          </TouchableOpacity>
          <View style={{
            backgroundColor: 'black',
            flex: 1,
          }}>
            <ImageViewer imageUrls={props.slid.map((el, i) => ({ url: `${APP_IMAGE_URL}${el.image}` }))} onChange={(index) => setInmageActive(index)} index={imgActive} renderIndicator={() => null} enableSwipeDown onSwipeDown={() => {
              setSliderModal(false);
              setInmageActive(0);
            }} />
            {/* <FlatList
              horizontal
              pagingEnabled
              style={{ width: width }}
              showsHorizontalScrollIndicator={false}
              data={props.slid}
              keyExtractor={(item) => item.id}
              renderItem={sliderItem}
              onScroll={({ nativeEvent }) => change(nativeEvent)}
            /> */}
            {props.slid.length > 1 && <View style={styles.wrapDot}>
              {props.slid.map((item, index) => (
                <Animated.View
                  style={imgActive === index ? styles.dotActive : styles.dot}
                  key={index}
                />
              ))}
            </View>}
          </View>
        </SafeAreaView>
      </Modal>

      <View>
        <FlatList
          horizontal
          pagingEnabled
          style={{
            width: props.searchMode ? width : width,
            height: props.searchMode ? width : (width + 220) / 2,
          }}
          showsHorizontalScrollIndicator={false}
          data={props.slid}
          keyExtractor={(item) => item.id}
          renderItem={sliderItem}
          onScroll={({ nativeEvent }) => change(nativeEvent)}
        />
        {props.slid.length > 1 && <View style={styles.wrapDot}>
          {props.slid.map((item, index) => (
            <Animated.View
              style={imgActive === index ? styles.dotActive : styles.dot}
              key={index}
            />
          ))}
        </View>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: width,
    height: width,
  },
  wrapDot: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#1571F0",
    zIndex: 1,
  },
  dot: {
    marginBottom: -30,
    marginHorizontal: 3,
    width: 10,
    height: 5,
    backgroundColor: "#fff",
    borderRadius: 3,
  },
  dotActive: {
    marginBottom: -30,
    marginHorizontal: 3,
    width: 30,
    height: 5,
    backgroundColor: "#94D8F4",
    borderRadius: 3,
  },
  sliderModal: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
});
