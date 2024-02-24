import express from "express";
import { StatusCodes } from "http-status-codes";
import { eventRepository } from "../../repository";
import { paginated } from "../../types/paginated";
import { createResponse } from "../../utils/response";

const addEventRouter = express.Router();
const getEventRouter = express.Router();

addEventRouter.post("/api/event/create", async (req, res) => {
  console.log(req.body);
  const event = eventRepository.create();
  event.date = req.body["date"];
  event.hour = req.body["hour"];
  event.description = req.body["description"];
  event.eventName = req.body["eventName"];
  event.photo = req.body["photo"];
  event.longitude = req.body["longitude"];
  event.latitude = req.body["latitude"];
  event.minute = req.body["minute"];
  return createResponse(res, StatusCodes.OK, {
    status: "success",
    data: event.save(),
  });
});

getEventRouter.get("/api/event/all", async (req, res) => {
  const page = parseInt((req.query.pageNumber as string) || "0");
  const limit = parseInt((req.query.take as string) || "5");
  const skip = page * limit;
  const event = await eventRepository.find({
    order: { date: "DESC" },
    take: limit,
    skip: skip,
  });
  console.log(event);
  if (event.length === 0)
    return createResponse(res, StatusCodes.BAD_REQUEST, {
      status: "error",
      error: { message: ["Bad Request"] },
    });
  const previous_link = `/api/event/all?pageNumber=${page}`;
  const next_link = `/api/event/all?pageNumber=${
    event.length !== limit ? undefined : page + 1
  }`;
  const result: paginated = {
    current_page: page,
    take: event.length,
    next_page: event.length !== limit ? undefined : page + 1,
    previous_link: previous_link,
    next_link: next_link,
    data: event,
  };
  return createResponse(res, StatusCodes.OK, {
    status: "success",
    data: result,
  });
});

export { addEventRouter as addEvent, getEventRouter as getEvent };
