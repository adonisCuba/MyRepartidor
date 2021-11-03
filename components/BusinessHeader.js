import React from "react";
import {
  Text,
  Icon,
  NativeBaseProvider,
  StatusBar,
  IconButton,
  Box,
  HStack,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { getAuth, signOut } from "firebase/auth";

const config = {
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};

export const BussinessHeader = (props) => {
  const logOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <NativeBaseProvider config={config}>
      <StatusBar backgroundColor="#06b6d4" barStyle="light-content" />
      <Box safeAreaTop backgroundColor="#06b6d4" />
      <HStack
        bg="#06b6d4"
        w="100%"
        h="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack space="4" alignItems="center">
          <Text color="white" fontSize="20" fontWeight="bold">
            {props.title}
          </Text>
        </HStack>
        <HStack space="2">
          {/* <IconButton
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
          /> */}
          <IconButton
            icon={
              <Icon
                as={<Ionicons name="log-out" />}
                size="sm"
                color="white"
                onPress={logOut}
              />
            }
          />
        </HStack>
      </HStack>
      {/* <Flex
        w="100%"
        bg={{
          linearGradient: {
            colors: ["primary.500", "primary.800"],
            start: [0, 0],
            end: [1, 0],
          },
        }}
        justify="space-between"
        direction="row"
        p={2}
      >
        <Text fontSize="lg" bold color="white" mt={2}>
          {props.title}
        </Text>
      </Flex> */}
    </NativeBaseProvider>
  );
};
