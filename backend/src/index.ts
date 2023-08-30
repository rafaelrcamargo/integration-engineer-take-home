import express, { Router } from "express";

import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";

const app = express(); // Create Express server.

app.use(cors()); // Enable CORS for all routes.
app.use(compression()); // Enable gzip compression for all routes.
app.use(bodyParser.json()); // Parse JSON bodies (as sent by API clients).

/**
 * API routes.
 * - Here we create a local Router instance, used for grouping routes behind a version prefix.
 * - This helps updating and maintaining the API in the future.
 */

const router = Router();

// Adding the tasks router to the '/tasks' prefix.
import tasks from "./routes/tasks";
router.use("/tasks", tasks);

// Adding the router to the '/v1' prefix.
app.use("/v1", router);

/**
 * Start Express server.
 * - We use the PORT environment variable, or 8000 if none is set.
 */

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on :${PORT}`);
});
