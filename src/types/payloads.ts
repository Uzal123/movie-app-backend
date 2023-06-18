export interface CreateShowPayload {
  name: string;
  showTime: Date[];
  seats: number;
  thumbnail: string;
  price: number;
}

export interface BookShowPayload {
  showId: string;
  seatNo: number[];
}

export interface CancelShowPayload {
  showId: string;
  seatNo: number[];
}

export interface GetShowByIdPayload {
  showId: string;
}
