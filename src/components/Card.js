import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import theme from "../theme";
import images from "../images";

const Card = ({
  id,
  image,
  title,
  subtitle,
  favorited,
  isPlaying,
  isLoading,
  onPressFavorite,
  onPressPlayPause,
  onPressNext
}) => (
  <View style={styles.card}>
    <Image source={image} />
    <View style={styles.cardInfo}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
      <View style={styles.cardControls}>
        <CardControlButton image={images.shuffle} onPress={() => {}} />
        <CardControlButton image={images.repeat} onPress={() => {}} />
        <CardControlButton
          image={favorited ? images.favorited : images.favorite}
          onPress={() => onPressFavorite(id)}
        />
        {isLoading ? (
          <ActivityIndicator color={theme.secondaryColor} size={"large"} />
        ) : (
          <CardControlButton
            accent
            image={isPlaying ? images.pause : images.play}
            onPress={() => onPressPlayPause(id)}
          />
        )}
        <CardControlButton
          image={images.playNext}
          onPress={() => onPressNext(id)}
        />
      </View>
    </View>
  </View>
);

const CardControlButton = ({ image, accent, onPress }) => (
  <TouchableOpacity onPress={() => onPress()}>
    <View
      style={[
        styles.cardControlsButton,
        { backgroundColor: accent ? theme.secondaryColor : theme.primaryColor }
      ]}
    >
      <Image source={image} />
    </View>
  </TouchableOpacity>
);

const styles = {
  card: {
    flex: 3,
    flexDirection: "row",
    padding: 10
  },
  cardInfo: {
    flex: 1,
    margin: 10,
    marginRight: 0
  },
  cardControls: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  cardControlsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  cardTitle: {
    color: theme.primaryTextColor,
    fontSize: 18
  },
  cardSubtitle: {
    color: theme.secondaryTextColor,
    fontSize: 14
  }
};

export default Card;
