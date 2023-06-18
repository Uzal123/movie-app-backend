import { Router, Response, Request } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ShowModel } from "../../models/Show";
import movieServices from "../../services";
import {
  BookShowPayload,
  CancelShowPayload,
  CreateShowPayload,
} from "../../types/payloads";
const router = Router();

router.get(
  "/",
  catchAsync(async (req: Request, res: Response) => {
    const show = await ShowModel.find();
    res.status(200).json({ show });
  })
);

interface CreateMovieRequest extends Request {
  body: CreateShowPayload;
}

router.post(
  "/",
  catchAsync(async (req: CreateMovieRequest, res: Response) => {
    const { name, showTime, seats, thumbnail, price } = req.body;
    await movieServices.validateShow(name, showTime, seats, thumbnail, price);
    const show = await movieServices.createShow(
      name,
      showTime,
      seats,
      thumbnail,
      price
    );
    res.status(200).json({ show });
  })
);

interface BookShowRequest extends Request {
  body: BookShowPayload;
}

router.post(
  "/book",
  catchAsync(async (req: BookShowRequest, res: Response) => {
    const { showId, seatNo } = req.body;
    const show = await movieServices.bookShowTicket(showId, seatNo);
    res.status(200).json({ show });
  })
);

interface CancelShowRequest extends Request {
  body: CancelShowPayload;
}

router.post(
  "/cancel",
  catchAsync(async (req: CancelShowRequest, res: Response) => {
    const { showId, seatNo } = req.body;
    const show = await movieServices.cancelShowTicket(showId, seatNo);
    res.status(200).json({ show });
  })
);

interface GetShowsByDateRequest extends Request {
  query: { date: string };
}

// route to get shows by date using query params
router.get(
  "/date",
  catchAsync(async (req: GetShowsByDateRequest, res: Response) => {
    const date = req.query.date;
    const shows = await movieServices.getShowsByDate(date);
    res.status(200).json({ shows });
  })
);

interface GetShowByIdRequest extends Request {
  body: { showId: string };
}

router.get(
  "/:showId",
  catchAsync(async (req: GetShowByIdRequest, res: Response) => {
    const { showId } = req.params;
    const show = await movieServices.getShowById(showId);
    res.status(200).json({ show });
  })
);

export default router;
