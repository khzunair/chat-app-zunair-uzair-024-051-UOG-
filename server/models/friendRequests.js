const mongoose = require("mongoose");

const friendRequestSchema = mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        reciever: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "accepted", "rejected", "blocked"]
        },
        createdAt: {
            type: Date,
            default: Date.now,

        },
    }
);

const Message = mongoose.model("Friend-Request", friendRequestSchema);
module.exports = Message;
