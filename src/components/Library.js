import React from "react";
import { View, Text, Button, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import theme from "../theme";
import { popularList, myPlaylist } from "../data";

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
    <View style={styles.cardsContainer}>
      {source.map(item => (
        <Card
          key={item.title}
          image={item.image}
          title={item.title}
          subtitle={item.subtitle}
        />
      ))}
    </View>
  </View>
);

const Card = ({ image, title, subtitle }) => (
  <View style={styles.card}>
    <Image source={image} />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardSubtitle}>{subtitle}</Text>
  </View>
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
    marginLeft: 10
  },
  cardsContainer: {
    flexDirection: "row"
  },
  card: {
    flex: 1,
    justifyContent: "space-around",
    padding: 10
  },
  cardTitle: {
    marginTop: 5,
    color: theme.primaryTextColor
  },
  cardSubtitle: {
    color: theme.secondaryTextColor
  }
};

export default Library;
