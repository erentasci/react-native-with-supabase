import AppleStyleSwipeableRow from "@/components/SwipeableRow";
import { Todo } from "@/utils/interfaces";
import { supabase } from "@/utils/supabase";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const Page = () => {
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>();

  useEffect(() => {
    loadTodos();
  }, []);

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

  const loadTodos = async () => {
    let { data } = await supabase
      .from("todos")
      .select("*")
      .order("inserted_at", { ascending: false });
    setTodos(data || []);
  };

  const updateTodo = async (todo: Todo) => {
    console.log("UPDATE: ", todo);

    const result = await supabase
      .from("todos")
      .update({ is_complete: !todo.is_complete })
      .eq("id", todo.id)
      .select()
      .single();

    const updated = todos?.map((item) => {
      if (item.id === todo.id) {
        item.is_complete = result.data.is_complete;
      }
      return item;
    });
    setTodos(updated);
  };

  const deleteTodo = async (todo: Todo) => {
    await supabase.from("todos").delete().eq("id", todo.id);
    const updated = todos?.filter((item) => item.id !== todo.id);
    setTodos(updated);
  };

  const renderRow: ListRenderItem<Todo> = ({ item }) => {
    return (
      <AppleStyleSwipeableRow
        onDelete={() => deleteTodo(item)}
        onToggle={() => updateTodo(item)}
        todo={item}
      >
        <View
          style={{ padding: 12, flexDirection: "row", gap: 10, height: 44 }}
        >
          <Text style={{ flex: 1 }}>{item.task}</Text>
          {item.is_complete && (
            <Ionicons name="checkmark-done-outline" size={24} color="#151515" />
          )}
        </View>
      </AppleStyleSwipeableRow>
    );
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
      <FlatList
        data={todos}
        renderItem={renderRow}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              width: "100%",
              backgroundColor: "gray",
            }}
          />
        )}
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
