import { bsToAd } from "@sbmdkl/nepali-date-converter";
import express from "express";
import { StatusCodes } from "http-status-codes";
import { Scrap } from "../../entity/scrapNews";
import { scrapNewsRepository } from "../../repository";
import { createResponse } from "../../utils/response";

const scrapDataPostRouter = express.Router();
const scrapDataGetRouter = express.Router();

scrapDataPostRouter.post("/api/post/scrap", async (req, res) => {
  const data = req.body;
  console.log(data);
  if (data.english_date == null) {
    data.english_date = bsToAd(data.nepali_date);
  }
  const existingPost = await scrapNewsRepository.findOne({
    where: {
      date: data.english_date,
      headline_link: data.headline_link,
    },
  });
  if (existingPost)
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["Data already stored"] },
    });
  console.log(data.english_date);

  const post = {
    headline: data.headline,
    headline_link: data.headline_link,
    date: data.english_date,
    image_url: data.image_url,
    paragraph: data.paragraph,
  };
  console.log("post", post);
  return createResponse(res, StatusCodes.OK, {
    status: "success",
    data: await scrapNewsRepository.create(post).save(),
  });
  // return response.send({ message: "ok" });
});

scrapDataGetRouter.get("/api/post/scrap", async (req, res) => {
  const news = await scrapNewsRepository.find();
  console.log(news);
  if (news.length === 0)
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["Bad Request"] },
    });
  return createResponse<Scrap[]>(res, StatusCodes.OK, {
    status: "success",
    data: news,
  });
});

export { scrapDataGetRouter as scrapGet, scrapDataPostRouter as scrapPost };
