import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Button, Image, StyleSheet, View } from "react-native";

const Page = () => {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View>
      {image && <Image source={{ uri: image }} style={styles.avatar} />}
      {!image && <Image style={styles.avatar} />}

      <Button title="Set Avatar Image" onPress={pickImage} />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  avatar: {
    width: 200,
    height: 200,
    backgroundColor: "#ccc",
    alignSelf: "center",
    borderRadius: 100,
    margin: 40,
  },
});
