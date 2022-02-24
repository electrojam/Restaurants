import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import { SearchBar, ListItem, Icon, Image } from 'react-native-elements'
import { isEmpty, size } from 'lodash'

import { searchRestaurants } from '../utils/actions'

export default function Search({ navigation }) {
    const [search, setSearch] = useState("")
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
      if (isEmpty(search)) {
          return
      }

      async function getData() {
          const response = await searchRestaurants(search)
          if (response.statusResponse) {
              setRestaurants(response.restaurants)
          }
      }
      getData();
    }, [search])
    
    return (
        <View>
            <SearchBar
                placeholder='Ingresa el nombre del restaurante...'
                onChangeText={(e) => setSearch(e)}
                containerStyle={styles.SearchBar}
                value={search}
            />
            {
                size(restaurants) > 0 ? (
                    <FlatList
                        data={restaurants}
                        keyExtractor={(item, index) => index.toString}
                        renderItem={(restaurant) =>
                            <Restaurant
                                restaurant={restaurant}
                                navigation={navigation}
                            />
                        }
                    />
                ) : (
                    isEmpty(search) ? (
                        <Text style={styles.noFound}>
                            Ingrese las primeras letras del nombre del restaurante.
                        </Text>
                    ) : (
                        <Text style={styles.noFound}>
                            No hay restaurantes que coincidan con el criterio de búsqueda.
                        </Text>
                    )
                )
            }
        </View>
    )
}

function Restaurant ({ restaurant, navigation }) {
    const { id, name, images } = restaurant.item

    return (
        <ListItem 
            style={styles.menuItem}
            onPress={() => navigation.navigate("restaurants", {
                screen: "retaurant",
                params: {id, name}
            })}
        >
            <Image
                resizeMode='cover'
                PlaceholderContent={<ActivityIndicator color="#fff"/>}
                source={{ uri: images[0] }}
                style={styles.imagesRestaurant}
            />
            <ListItem.Content>
                <ListItem.Title>{name}</ListItem.Title>
            </ListItem.Content>
            <Icon
                type="material-community"
                name="chevron-right"
            />
        </ListItem>
    )
}

const styles = StyleSheet.create({
    SearchBar: {
        marginBottom: 20,
        backgroundColor: "#fff"
    },
    imagesRestaurant: {
        width: 90,
        height: 90
    },
    noFound: {
        alignSelf: "center",
        width: "90%"
    },
    menuItem: {
        margin: 10
    }
})
