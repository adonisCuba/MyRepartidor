import { Box, NativeBaseProvider, Text, IconButton, Icon } from "native-base";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";

export const HomeScreen = ({ navigation }) => {
  const logOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <NativeBaseProvider>
      <Box>
        <Text>Hello!!!</Text>
        <IconButton
          icon={<Icon as={Ionicons} name="log-out" />}
          borderRadius="full"
          _icon={{
            color: "white",
            size: "sm",
          }}
          _hover={{
            bg: "primary.700",
          }}
          _pressed={{
            bg: "primary.700",
          }}
          onPress={logOut}
        />
      </Box>
    </NativeBaseProvider>
  );
};
