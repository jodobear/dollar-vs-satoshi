import store from "store"
import {getCurrentBTCValue} from "./helpers";

const valueTicker = async (io) => {
    io.emit("valueUpdate", store.get("currentValue"));
    const newValue = await getCurrentBTCValue();
    store.set("currentValue", newValue);
};

const initValueTicker = (io) => {
    setInterval(valueTicker, 1000, io);
};

export default initValueTicker;