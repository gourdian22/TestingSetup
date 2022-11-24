import { rest } from "msw";

import {
  serverResponseAllCountries,
  serverResponseCountryDetails,
  serverResponseAlphaCodes,
} from "../testUtils/fakeData";

export const handlers = [
  rest.get("https://restcountries.com/v2/all", (req, res, ctx) => {
    return res(ctx.json(serverResponseAllCountries));
  }),
  rest.get(`https://restcountries.com/v2/name/:name`, (req, res, ctx) => {
    const { name } = req.params;
    return res(ctx.json(serverResponseCountryDetails[name]));
  }),
  rest.get(`https://restcountries.com/v2/alpha`, (req, res, ctx) => {
    const codes = req.url.searchParams.getAll("codes");
    const data = codes.flatMap((code) => serverResponseAlphaCodes[code]);
    return res(ctx.json(data));
  }),
];
