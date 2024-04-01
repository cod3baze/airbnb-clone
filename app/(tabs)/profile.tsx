import { useState } from "react";
import { Link } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

export default function ProfileScreen() {
  const [edit, setEdit] = useState(false);

  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
        <Ionicons name="notifications-outline" size={26} />
      </View>

      {user && (
        <View style={styles.card}>
          <TouchableOpacity>
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
          </TouchableOpacity>

          <View style={{ flexDirection: "row", gap: 6 }}>
            {!edit && (
              <View style={styles.editRow}>
                <Text style={{ fontFamily: "semibold", fontSize: 22 }}>
                  Elias Alexandre
                </Text>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Ionicons
                    name="create-outline"
                    size={24}
                    color={Colors.dark}
                  />
                </TouchableOpacity>
              </View>
            )}

            {edit && (
              <View style={styles.editRow}>
                <TextInput
                  placeholder="First Name"
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <TextInput
                  placeholder="Last Name"
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <TouchableOpacity onPress={() => {}}>
                  <Ionicons
                    name="checkmark-outline"
                    size={24}
                    color={Colors.dark}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text>eliasalexandre@cognu.io</Text>
          <Text>Since {user?.createdAt!.toLocaleDateString()}</Text>
        </View>
      )}

      {isSignedIn && (
        <Button title="Log Out" onPress={() => signOut()} color={Colors.dark} />
      )}

      {!isSignedIn && (
        <Link href={"/(modals)/login"} asChild>
          <Button title="Log In" color={Colors.dark} />
        </Link>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 24,
  },
  header: {
    fontFamily: "semibold",
    fontSize: 24,
  },
  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    alignItems: "center",
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  editRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
