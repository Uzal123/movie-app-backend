import { Schema, model } from "mongoose";
import { Show } from "../types/model";

export const ShowSchema = new Schema<Show>({
  name: {
    type: String,
    required: true,
  },
  showTime: {
    type: [Date],
    required: true,
    default: [],
  },
  seats: {
    type: Number,
    required: true,
  },
  bookedSeats: {
    type: [Number],
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
    default: "",
  },
});

export const ShowModel = model("show", ShowSchema, "shows");
