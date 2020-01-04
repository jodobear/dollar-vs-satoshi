import { User, Bet, Withdraw } from "./schemas";
import lightningPayReq from "bolt11";
import {findUser, settleBet } from "./helpers";
import store from "store";

const socketEvent = (socket) => {
    socket.on("createUser", (handle, hashedKey) => {
        const newUser = new User({
            userName: handle,
            userKey: hashedKey,
            userBalance: 0,
        });
        newUser.save().then(result => {
            console.log(result);
            socket.emit("userConnected",
                result.userName,
                result.userKey,
                result.userBalance,
                result._id)
        }).catch(err => console.log(err));
    });

    socket.on("userConnecting", async (givenKey) => {
        const user = await findUser(givenKey);
        if (user) {
            socket.emit("User connected. ",
                "Username: ", user.userName,
                "User key: ", user.userKey,
                "User balance: ", user.userBalance,
                user._id);
        } else {
            socket.emit("Unable to Connect User")
        }
    });

    socket.on("placeBet", async (amount, direction, userId) => {
        const user = await User.findById(userId);
        if (user.userBalance >= amount && !user.placedBet) {
            const placedBet = store.get("placedBet");
            const newBet = new Bet({
                startValue: store.get("currentValue"),
                betDirection: direction,
                betAmount: amount,
                player: user,
                endValue: 0,
            });
            console.log(newBet);
            newBet.save().then(result => {
                user.userBalance -= amount;
                user.placedBet = ture;
                user.save().then(result => {
                    socket.emit("Bet placed with,",
                        "Bet Amount: ", amount,
                        "Bet Direction: ", direction,
                        "At BTC value: ", newBet.startValue);
                    socket.emit(`Balance updated for user: ${user}`,
                        "Current balance: ", user.userBalance);
                    setTimeout(settleBet, 1000, newBet, socket);
                });
            }).catch(err => {
                socket.emit("betError", err);
            })
        } else {
            socket.emit("Not enough balance")
        }
    });
}
