import {
  NativeBaseProvider,
  Select,
  VStack,
  CheckIcon,
  ScrollView,
  Box,
  Fab,
  Icon,
  Divider,
} from "native-base";
import React, { Component, useState } from "react";
import { BusinessDeliveryItem } from "../components/BusinessDeliveryItem";
import { Ionicons } from "@expo/vector-icons";
import { getDeliveries } from "../database/delivery";

const config = {
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};

export class HomeBusinessScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusFilter: "available",
      deliveries: [],
    };
  }
  componentDidMount() {
    this.getDeliveries();
  }
  async getDeliveries() {
    const deliveries = await getDeliveries(this.state.statusFilter);
    this.setState({ deliveries });
  }
  render() {
    const { navigation } = this.props;
    return (
      <NativeBaseProvider config={config}>
        <VStack alignItems="center" space={2} h="100%" bg="white">
          <Select
            w="95%"
            m={2}
            selectedValue={this.state.statusFilter}
            accessibilityLabel="Seleccione el estado"
            placeholder="Seleccione el estado"
            _selectedItem={{
              bg: "primary.400",
              endIcon: <CheckIcon size="5" />,
            }}
            onValueChange={(value) =>
              this.setState({ statusFilter: value }, this.getDeliveries)
            }
          >
            <Select.Item label="Disponible" value="available" />
            <Select.Item label="Tomada" value="taked" />
            <Select.Item label="Entregada" value="delivered" />
          </Select>
          <Divider />
          <ScrollView w="95%">
            {this.state.deliveries.map((delivery, index) => (
              <BusinessDeliveryItem
                delivery={delivery}
                key={index}
                navigation={navigation}
              />
            ))}
          </ScrollView>
        </VStack>
        <Box position="relative" h={100} w="100%">
          <Fab
            position="absolute"
            size="sm"
            icon={<Icon color="white" as={<Ionicons name="add" />} size="sm" />}
            onPress={() => {
              navigation.navigate("AddDelivery");
            }}
          />
        </Box>
      </NativeBaseProvider>
    );
  }
}
