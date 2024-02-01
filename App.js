import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import db from "./firebaseConfig";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      const updatedTodos = snapshot.docs.map((doc) => ({
        id: doc.id,
        text: doc.data().text,
      }));
      setTodos(updatedTodos);
    });

    return () => unsubscribe();
  }, []);

  const addTodo = async () => {
    if (todoText.trim() !== "") {
      try {
        await addDoc(collection(db, "todos"), { text: todoText });
        setTodoText("");
      } catch (error) {
        console.error("Error adding todo: ", error);
      }
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => deleteTodo(item.id)} style={styles.item}>
      <Text>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
        style={styles.input}
        placeholder="Enter your todo"
        value={todoText}
        onChangeText={setTodoText}
      />
      <TouchableOpacity style={styles.button} onPress={addTodo}>
        <Text>Add Todo</Text>
      </TouchableOpacity>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "100%",
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "skyblue",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  item: {
    backgroundColor: "lightgray",
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    width: "100%",
  },
});
