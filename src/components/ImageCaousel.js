import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function ImageCaousel({ imagesList = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  function renderItem({ item, index }) {
    return (
      <Image
        key={index}
        source={{ uri: item }}
        style={{
          width: "100%",
          height: 200,
        }}
      />
    );
  }
  return (
    <View
      style={{
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Carousel
        data={imagesList}
        renderItem={renderItem}
        sliderWidth={Dimensions.get("screen").width}
        sliderHeight={200}
        itemWidth={Dimensions.get("screen").width}
        itemHeight={200}
        ref={(c) => {
          carouselRef.current = c;
        }}
        onSnapToItem={(index) => {
          setActiveIndex(index);
        }}
        autoplay={true}
        enableMomentum={false}
        autoplayDelay={0}
        autoplayInterval={2000}
        loop={true}
      />
      <TouchableOpacity
        style={{
          height: 40,
          width: 40,
          borderRadius: 40,
          backgroundColor: "#000",
          opacity: 0.4,
          position: "absolute",
          left: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          carouselRef?.current?.snapToPrev();
        }}
      >
        <Icon name="chevron-left" size={20} color={"#fff"} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 40,
          width: 40,
          borderRadius: 40,
          backgroundColor: "#000",
          opacity: 0.4,
          position: "absolute",
          right: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          carouselRef?.current?.snapToNext();
        }}
      >
        <Icon name="chevron-right" size={20} color={"#fff"} />
      </TouchableOpacity>
      <Pagination
        containerStyle={{
          position: "absolute",
          top: "100%",
          backgroundColor: "red",
          width: "100%",
          backgroundColor: "#fff",
          paddingVertical: 15,
        }}
        dotsLength={imagesList.length}
        activeDotIndex={activeIndex}
        dotStyle={{
          backgroundColor: "#000",
          height: 10,
          width: 10,
          borderRadius: 10,
        }}
      />
    </View>
  );
}
