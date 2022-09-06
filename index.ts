import express, { Express, Request, Response } from "express";
import ytdl from "ytdl-core";

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/download", async (req: Request, res: Response) => {
  const youtubeLink = String(req.query.url);
  const isValid = ytdl.validateURL(youtubeLink);
  if (youtubeLink == "" || !isValid) {
    res.send("Invalid youtube link");
    return;
  }
  const fileName = "download.mp4";
  const mimeType = "video/mp4";
  const disposition = 'attachment; filename="' + fileName + '"';
  res.setHeader("Content-Type", mimeType);
  res.setHeader("Content-Disposition", disposition);
  ytdl(youtubeLink).pipe(res);
});

app.listen(PORT, () => {
  console.log("Server is listening on port %d", PORT);
});
