import { supabase } from "@/utils/supabase";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, View } from "react-native";

const Page = () => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    loadUserAvatar();
  }, []);

  const loadUserAvatar = async () => {
    const {
      data: { user: User },
    } = await supabase.auth.getUser();

    supabase.storage
      .from("avatars")
      .download(`${User?.id}/avatar.png`)
      .then(({ data }) => {
        console.log(data);
        if (!data) return;

        const fr = new FileReader();
        fr.readAsDataURL(data!);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      const {
        data: { user: User },
      } = await supabase.auth.getUser();

      const image = result.assets[0];

      const base64 = await FileSystem.readAsStringAsync(image.uri, {
        encoding: "base64",
      });
      const filePath = `${User?.id}/avatar.png`;
      const contentType = "image/png";
      try {
        await supabase.storage
          .from("avatars")
          .upload(filePath, decode(base64), { contentType });
      } catch (error) {
        console.log("Error uploading image:", error);
      }
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
