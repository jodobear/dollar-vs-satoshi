import store from "store"

import { getCurrentBTCValue} from "./helpers";

const initStore = async (io) => {
    store.set('currentValue', await getCurrentBTCValue());
    store.set('placedBet', []);
};

export default initStore;