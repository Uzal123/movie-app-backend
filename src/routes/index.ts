import { Router } from "express";
import showRoutes from "./show";
const router = Router();

router.use("/show", showRoutes);

export default router;
