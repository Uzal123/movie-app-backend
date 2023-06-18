import { ShowModel } from "../models/Show";
import { Show } from "../types/model";

const createShow = async (
  name: string,
  showTime: Date[],
  seats: number,
  thumbnail: string,
  price: number
) => {
  const show = await ShowModel.create({
    name,
    showTime,
    seats,
    price,
    thumbnail,
  });
  return show;
};

const validateShow = async (
  name: string,
  showTime: Date[],
  seats: number,
  thumbnail: string,
  price: number
) => {
  if (!name) {
    throw new Error("Name is required");
  }
  if (name.length < 3 || name.length > 50) {
    throw new Error("Name should be between 3 to 50 characters");
  }
  if (!seats) {
    throw new Error("Seats is required");
  }
  if (seats < 0 || seats > 200) {
    throw new Error("Seats should be between 0 to 200");
  }
  if (seats % 10 !== 0) {
    throw new Error("Seats should be multiple of 10");
  }
  if (!price) {
    throw new Error("Price is required");
  }
  if (price < 100 || price > 500) {
    throw new Error("Price cannot be less than 100 or greater than 500");
  }
};

const bookShowTicket = async (showId: string, seatNo: number[]) => {
  const show = await ShowModel.findById(showId);
  if (!show) {
    throw new Error("Show not found");
  }
  const isSeatNoValid = seatNo.every((seat) => seat <= show.seats);
  if (!isSeatNoValid) {
    throw new Error("Invalid seat no");
  }

  const isAlreadyBooked = seatNo.some((seat) =>
    show.bookedSeats.includes(seat)
  );
  if (isAlreadyBooked) {
    throw new Error("Seats already booked");
  }

  const bookedSeats = [...show.bookedSeats, ...seatNo];
  const updatedShow = await ShowModel.findByIdAndUpdate(
    showId,
    { bookedSeats },
    { new: true }
  );
  return updatedShow;
};

const cancelShowTicket = async (showId: string, seatNo: number[]) => {
  const show = await ShowModel.findById(showId);
  if (!show) {
    throw new Error("Show not found");
  }

  const isSeatNoValid = seatNo.every((seat) => seat <= show.seats);
  if (!isSeatNoValid) {
    throw new Error("Invalid seat no");
  }

  const bookedSeats = show.bookedSeats.filter((seat) => !seatNo.includes(seat));
  const updatedShow = await ShowModel.findByIdAndUpdate(
    showId,
    { bookedSeats },
    { new: true }
  );
  return updatedShow;
};

const getShowById = async (showId: string) => {
  const show = await ShowModel.findById(showId);
  if (!show) {
    throw new Error("Show not found");
  }
  return show;
};

const getShowsByDate = async (date: string) => {
  const queryDate: Date = new Date(date);
  queryDate.setHours(0, 0, 0, 0);

  const shows: Show[] = await ShowModel.find({
    showTime: {
      $gte: queryDate,
      $lt: new Date(queryDate.getTime() + 24 * 60 * 60 * 1000),
    },
  });
  return shows;
};

const movieServices = {
  getShowsByDate,
  createShow,
  bookShowTicket,
  cancelShowTicket,
  getShowById,
  validateShow,
};

export default movieServices;
