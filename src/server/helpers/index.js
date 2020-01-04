import bcrypt from "bcrypt"
import fetch from "node-fetch"

import { User, Bet, Withdraw } from "../schemas"
import store from "store"

export const findUser = async (givenKey) => {
    const [name, key] = givenKey.split('-');
    const users = await User.find({userName: name});
    for (const user of users) {
        const userExists = await bcrypt.compare(key, user.key);
        if (userExists) {
            return user;
        }
    }
    return null;
};

export const settleBet = (bet, socket) => {
    let didWin = false;
    bet.endValue = store.get("currentValue")
    switch (bet.direction) {
        case "up":
            if (bet.endValue > bet.startValue) {
                updateBalance(socket, bet.player._id, bet.amount * 1.97);
                didWin = true;
            }
            break;
        case "equal":
            if (bet.endValue == bet.startValue) {
                updateBalance(socket, bet.player._id, bet.amount * 3);
                didWin = true;
            }
            break;
        case "down":
            if (bet.endValue < bet.startValue) {
                updateBalance(socket, bet.player._id, bet.amount * 1.97);
                didWin = true;
            }
            break;
    }
    socket.emit("betSettled", didWin, bet.endValue);
    console.log("emitted settled");
    bet.save();
};

export const updateBalance = async (io, userKey, amount) => {
    console.log("userKey: ", userKey, " amount: ", amount);
    const user = await User.findById(userKey);
    const balance = user.userBalance;
    user.userBalance = balance + amount;

    await user.save();
    io.emit('Balance updated for user: ', userKey, "\n",
        "Current balance = ", user.userBalance);
}

export const getUserFromWithdrawId = async(withdrawId) => {
    const withdrawalRecord = await Withdraw.find({withdrawalId: withdrawId});
    return withdrawalRecord[0].userId;
}

export const getCurrentBTCValue = async () => {
    try {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/coins/bitcoin/tickers"
        );
        const body = await response.json();
        const newValue = await body["usd"];
        return newValue.toFixed(2);
    } catch(err){
        return await getCurrentBTCValue();
    }
};

