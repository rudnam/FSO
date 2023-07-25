import { Visibility, Weather } from "./types";

export const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility)
    .map((v) => v.toString())
    .includes(param);
};

export const parseVisibility = (visibility: unknown): Visibility => {
  if (!isString(visibility) || !isVisibility(visibility)) {
    throw new Error("Incorrect visibility: " + visibility);
  }
  return visibility;
};

const isWeather = (param: string): param is Weather => {
  return Object.values(Weather)
    .map((v) => v.toString())
    .includes(param);
};

export const parseWeather = (weather: unknown): Weather => {
  if (!isString(weather) || !isWeather(weather)) {
    throw new Error("Incorrect weather: " + weather);
  }
  return weather;
};
