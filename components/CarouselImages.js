import React from 'react'
import { Image } from 'react-native-elements'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import Carousel from 'react-native-snap-carousel'

export default function CarouselImages({ images, height, width }) {
    const renderItem = ({ item }) => {
        return (
            <Image
                style={{ width, height }}
                PlaceholderContent={<ActivityIndicator color="#fff"/>}
                source={{ uri: item }}
            />
        )
    }
    return (
        <Carousel
            layout={"default"}
            data={images}
            sliderWidth={width}
            itemWidth={width}
            itemHeight={height}
            renderItem={renderItem}
        />
    )
}

const styles = StyleSheet.create({})
