// import React, { memo, useEffect, useState } from 'react';
// import { StyleSheet, View, Image, Dimensions, ScrollView, Pressable } from 'react-native';

// const width = Dimensions.get('window').width - 25

import React, { Component, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { APP_IMAGE_URL } from "@env";
import { Path, Svg } from "react-native-svg";

const width = Dimensions.get("window").width - 25;

export default function Slider(props) {
  const [imgActive, setInmageActive] = useState(0);

  const change = (nativeEvent) => {
    const slider = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slider !== imgActive) {
      setInmageActive(slider);
    }
  };

  let sliderItem = ({ item, index }) => {
    return (
      <View>
        {props.showStars && <TouchableOpacity style={{ position: 'absolute', top: 5, right: 10, zIndex: 999 }} onPress={() => props.onPressStar(item)}>
          {item.star == '0' ? <WhiteStar /> : <YellowStarIcon />}
        </TouchableOpacity>}
        <Image
          source={{ uri: APP_IMAGE_URL + item.image }}
          style={{ height: "100%", width: width, resizeMode: "cover" }}
        />
      </View>
    );
  };

  const YellowStarIcon = () => {
    return <Svg
      fill="#ffae00"
      xmlns="http://www.w3.org/2000/svg"
      width="35px"
      height="35px"
      viewBox="-1.27 -1.27 129.27 129.27"
      xmlSpace="preserve"
      stroke="#ffae00"
    >
      <Path d="M121.215 44.212l-34.899-3.3c-2.2-.2-4.101-1.6-5-3.7l-12.5-30.3c-2-5-9.101-5-11.101 0l-12.4 30.3c-.8 2.1-2.8 3.5-5 3.7l-34.9 3.3c-5.2.5-7.3 7-3.4 10.5l26.3 23.1c1.7 1.5 2.4 3.7 1.9 5.9l-7.9 32.399c-1.2 5.101 4.3 9.3 8.9 6.601l29.1-17.101c1.9-1.1 4.2-1.1 6.1 0l29.101 17.101c4.6 2.699 10.1-1.4 8.899-6.601l-7.8-32.399c-.5-2.2.2-4.4 1.9-5.9l26.3-23.1c3.8-3.5 1.6-10-3.6-10.5z" />
    </Svg>
  }

  const WhiteStar = () => {
    return <Svg
      fill="#fff"
      height="35px"
      width="35px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-19.63 -19.63 529.97 529.97"
      xmlSpace="preserve"
      stroke="#fff"
      strokeWidth={29.44236}
    >
      <Path d="M490.133 178.037c-1.493-4.373-5.547-7.253-10.133-7.36H309.653l-54.187-163.2c-1.813-5.547-7.893-8.64-13.44-6.827a10.866 10.866 0 00-6.827 6.827l-54.187 164.267H10.667C4.8 170.784 0 175.477 0 181.45c0 3.307 1.493 6.4 4.16 8.427l136.96 107.2L81.493 476.49c-1.92 5.547 1.067 11.627 6.72 13.547 3.307 1.067 6.933.533 9.707-1.493l147.52-107.52L392.96 486.09c4.8 3.413 11.413 2.347 14.827-2.453a11.119 11.119 0 001.493-9.493L350.187 292.81 486.4 189.984c3.733-2.774 5.227-7.574 3.733-11.947zM331.307 280.224a10.748 10.748 0 00-3.733 11.84l51.413 157.76-127.36-90.773c-3.733-2.667-8.747-2.667-12.48.107l-126.827 92.48 51.413-154.88c1.387-4.267 0-8.96-3.52-11.733L41.6 192.01h147.093c4.587 0 8.64-2.987 10.133-7.36l46.507-140.16 46.507 140.16c1.493 4.373 5.547 7.253 10.133 7.36h146.133l-116.799 88.214z" />
    </Svg>
  }

  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled
        nestedScrollEnabled
        style={styles.wrapper}
        showsHorizontalScrollIndicator={false}
        data={props.slid}
        keyExtractor={(item) => item.id}
        renderItem={sliderItem}
        onScroll={({ nativeEvent }) => change(nativeEvent)}
      />
      <View style={styles.wrapDot}>
        {props.slid.map((item, index) => (
          <View
            style={imgActive === index ? styles.dotActive : styles.dot}
            key={index}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: width,
    height: 176,
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
});
