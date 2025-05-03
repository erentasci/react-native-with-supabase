import { supabase } from "@/utils/supabase";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  };
  const onSignUp = async () => {
    setLoading(true);
    const {
      error,
      data: { session },
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);

    if (!session) {
      Alert.alert("Check your email for the confirmation link");
    } else {
      Alert.alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            elevation: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            gap: 10,
          }}
        >
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: "#fff", fontSize: 20 }}>Loading...</Text>
        </View>
      )}

      <Text style={styles.header}>Galaxies.dev</Text>
      <TextInput
        autoCapitalize="none"
        placeholder="john@doe.com"
        placeholderTextColor="#fff"
        value={email}
        onChangeText={setEmail}
        style={styles.inputField}
      />
      <TextInput
        placeholder="password"
        placeholderTextColor="#fff"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />

      <TouchableOpacity onPress={onSignIn} style={styles.button}>
        <Text style={{ color: "#fff" }}>Sign in</Text>
      </TouchableOpacity>
      <Button onPress={onSignUp} title="Create Account" color={"#fff"}></Button>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
    paddingTop: 200,
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    margin: 50,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#2b825b",
    borderRadius: 4,
    padding: 10,
    color: "#fff",
    backgroundColor: "#363636",
  },
  button: {
    marginVertical: 15,
    alignItems: "center",
    backgroundColor: "#2b825b",
    padding: 12,
    borderRadius: 4,
  },
});
