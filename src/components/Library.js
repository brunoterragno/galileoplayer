import React from "react";
import {
  View,
  Text,
  Button,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Actions } from "react-native-router-flux";
import theme from "../theme";
import { popularList, myPlaylist } from "../data";

const _keyExtractor = (item, index) => item.id;

const Library = () => (
  <View style={styles.container}>
    <Section title="POPULAR" source={popularList} />
    <Section title="MY PLAYLIST" source={myPlaylist} />
    <Section title="NEW RELEASES" source={myPlaylist} />
  </View>
);

const Section = ({ title, source }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <FlatList
      horizontal
      style={styles.cardsContainer}
      data={source}
      keyExtractor={_keyExtractor}
      renderItem={({ item }) => (
        <Card
          id={item.id}
          image={item.image}
          title={item.title}
          subtitle={item.subtitle}
        />
      )}
    />
  </View>
);

const Card = ({ id, image, title, subtitle }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => {
      Actions.playlist({ id, title });
    }}
  >
    <View>
      <Image source={image} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
);

const styles = {
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: theme.primaryColor
  },
  sectionContainer: {
    height: "40%",
    flex: 1
  },
  sectionTitle: {
    color: theme.primaryTextColor,
    fontSize: 18,
    marginLeft: 10,
    marginTop: 20
  },
  cardsContainer: {
    flexDirection: "row"
  },
  card: {
    flex: 1,
    justifyContent: "center",
    padding: 10
  },
  cardTitle: {
    marginTop: 10,
    color: theme.primaryTextColor
  },
  cardSubtitle: {
    color: theme.secondaryTextColor
  }
};

export default Library;
