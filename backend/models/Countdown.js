import mongoose from "mongoose";

const CountdownSchema = new mongoose.Schema (
    {
        rocket:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Rocket",
            required: true
        },
        launchSite: {
            type: String,
            required: true,
        },
        status:{
            type: String,
            enum: ["attivo", "in pausa", "cancellato"],
            default: "attivo"
        },
        launchDate: {
            type: Date,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        liveStreamUrl: {
            type: String,
            default: null
        },
        notificationSent: {
            type: Boolean,
            default: false
          },
          notificationDate: {
            type: Date
          },          
    },
    {
        timestamps: true
      }
)

const Countdown = mongoose.model("Countdown", CountdownSchema);

export default Countdown;