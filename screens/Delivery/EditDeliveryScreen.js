import { GeoPoint } from "@firebase/firestore";
import {
  Button,
  FormControl,
  Input,
  NativeBaseProvider,
  Text,
  TextArea,
  Toast,
  VStack,
  AlertDialog,
} from "native-base";
import React, { useState, useEffect, useRef } from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  getDelivery,
  removeDelivery,
  updateDelivery,
} from "../../database/delivery";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { fetchDeliveries } from "../../store/slices/delivery";
export const EditDeliveryScreen = ({ route, navigation }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("0.1");
  const [markerPosition, setMarkerPosition] = useState("");
  const [estado, setEstado] = useState("");
  const { itemId } = route.params;
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    getDelivery(itemId).then((item) => {
      if (mounted) {
        setNombre(item.nombre);
        setDescripcion(item.descripcion);
        setPrecio(item.precio);
        setMarkerPosition(item.location);
        setEstado(item.state);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const onMapPress = (e) => {
    console.log(e.nativeEvent.coordinate);
    setMarkerPosition(e.nativeEvent.coordinate);
  };

  const save = async () => {
    if (
      nombre != "" &&
      descripcion != "" &&
      precio > 0 &&
      markerPosition != ""
    ) {
      const delivery = {
        nombre,
        descripcion,
        precio,
        location: new GeoPoint(
          markerPosition.latitude,
          markerPosition.longitude
        ),
        userId: getAuth().currentUser.uid,
        state: "available",
        createdAt: Date.now(),
      };
      await updateDelivery(itemId, delivery);
      dispatch(fetchDeliveries({ statusFilter: route.params.statusFilter }));
      navigation.goBack();
    } else Toast.show({ description: "Lleno todos los campos correctamente" });
  };
  const deleteItem = () => {
    Alert.alert("Alerta", "Está seguro de elimar la entrega?", [
      {
        text: "Aceptar",
        onPress: () => {
          removeDelivery(itemId);
          navigation.goBack();
        },
      },
      {
        text: "Cancelar",
      },
    ]);
  };

  return (
    <NativeBaseProvider>
      <VStack w="100%" h="100%" bg="white" p={2}>
        <FormControl isRequired mb={4}>
          <FormControl.Label>Nombre</FormControl.Label>
          <Input
            placeholder="Nombre de la entrega"
            value={nombre}
            onChangeText={(e) => setNombre(e)}
            isDisabled={estado != "available" ? true : false}
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormControl.Label>Descripción</FormControl.Label>
          <TextArea
            placeholder="Descripción de la entrega"
            h={20}
            value={descripcion}
            onChangeText={(e) => setDescripcion(e)}
            isDisabled={estado != "available" ? true : false}
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormControl.Label>Precio</FormControl.Label>
          <Input
            placeholder="Precio"
            keyboardType="decimal-pad"
            value={precio}
            onChangeText={(e) => setPrecio(e)}
            isDisabled={estado != "available" ? true : false}
          />
        </FormControl>
        <Text>Seleccione la ubicación de entrega:</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 22.4122423,
            longitude: -83.6957372,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={onMapPress}
        >
          {markerPosition ? (
            <Marker
              coordinate={{
                latitude: markerPosition.latitude,
                longitude: markerPosition.longitude,
              }}
            />
          ) : null}
        </MapView>
        {estado == "available" ? (
          <>
            <Button mt={4} size="lg" onPress={save}>
              Salvar
            </Button>
            <Button mt={4} colorScheme="danger" onPress={deleteItem}>
              Eliminar
            </Button>
          </>
        ) : null}
      </VStack>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 300,
  },
});
