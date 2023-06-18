import { type ObjectId } from "mongoose";

export interface Show {
  _id: ObjectId;
  name: string;
  showTime: Date[];
  seats: number;
  bookedSeats: number[];
  price: number;
  thumbnail?: string;
}
