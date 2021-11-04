import { getDeliveries } from "../database/delivery";
import { FETCH_DELIVERIES } from "./actions";

const initialState = {
  deliveries: [],
};

export const rootReducer = async (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DELIVERIES:
      return { ...state, deliveries: await getDeliveries(action.payload) };
    default:
      return state;
  }
};
