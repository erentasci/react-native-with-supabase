import { supabase } from "@/utils/supabase";
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

const Page = () => {
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);

  const addTodo = async () => {
    setLoading(true);
    const {
      data: { user: User },
    } = await supabase.auth.getUser();

    const newTodo = {
      user_id: User?.id,
      task: todo,
    };

    const result = await supabase
      .from("todos")
      .insert(newTodo)
      .select()
      .single();
    console.log("ADD TODO", result);
    setLoading(false);
    setTodo("");
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          backgroundColor: "#151515",
          padding: 6,
        }}
      >
        <TextInput
          value={todo}
          onChangeText={setTodo}
          placeholder="Add Todo"
          style={{
            flex: 1,
            backgroundColor: "#363636",
            color: "#fff",
            padding: 8,
            borderWidth: 1,
            borderColor: "#2b825b",
            borderRadius: 4,
          }}
        />
        <Button title="Add" color={"#2b825b"} onPress={addTodo} />
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
