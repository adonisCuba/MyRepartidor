import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator, Text, Platform } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { AuthenticatedUserContext } from "./AuthenticatedUserProvider";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";
import "../config/firebase";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";
import * as SecureStore from "expo-secure-store";
import BusinessStack from "./BusinessStack";

const auth = getAuth();

export default function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState("");

  const onAuthenticated = async (authenticatedUser) => {
    const db = getFirestore();
    const q = query(
      collection(db, "typeUsers"),
      where("userId", "==", authenticatedUser.uid),
      limit(1)
    );
    const queryResult = await getDocs(q);
    queryResult.forEach((doc) => {
      setUserRole(doc.data().typeUser);
      if (Platform.OS != "web")
        SecureStore.setItemAsync("userRole", doc.data().typeUser);
    });
    setUser(authenticatedUser);
  };

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        try {
          await (authenticatedUser
            ? onAuthenticated(authenticatedUser)
            : setUser(null));
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    );

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        userRole == "business" ? (
          <BusinessStack />
        ) : (
          <HomeStack />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}
