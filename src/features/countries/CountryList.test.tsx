import { render, screen, waitFor } from "../../testUtils";
import { CountryList } from "./CountryList";
import userEvent from "@testing-library/user-event";
import { App } from "../../App";
import { keyBy } from "../../utils/keyBy";
import {
  serverResponseAllCountries,
  serverResponseCountryDetails,
  serverResponseAlphaCodes,
} from "../../testUtils/fakeData";

it("should render list of countries", async () => {
  render(<CountryList />);
  const serverCountriesNames = keyBy(serverResponseAllCountries, "name");
  const countriesArticles = await screen.findAllByRole("article");
  expect(countriesArticles).toHaveLength(3);
  expect(countriesArticles).toMatchSnapshot();
  await waitFor(async () => {
    const countriesNames = await screen.findAllByRole("heading");
    countriesNames.forEach((element) => {
      expect(element.textContent).toBe(
        //@ts-ignore
        serverCountriesNames[element.textContent].name
      );
    });
  });
});

it("should show country details page after click", async () => {
  const user = userEvent.setup();
  const { router } = render(<App />);
  const canadaImage = await screen.findByRole("img", {
    name: /Canada/i,
  });
  await user.click(canadaImage);
  expect(router.state.location.pathname).toBe("/country/Canada");
});

it("should show country details with borders", async () => {
  const user = userEvent.setup();
  render(<CountryList />);
  const canadaImage = await screen.findByRole("img", {
    name: /Canada/i,
  });
  await user.click(canadaImage);
  const neighbors = await screen.findAllByTestId("meta");
  const neighborsNames = neighbors.map((neighbor) => neighbor.textContent);

  const serverCanadaNeigborsAlphaCodes =
    serverResponseCountryDetails["Canada"][0]["borders"];

  const serverCanadaNeighborsNames = serverCanadaNeigborsAlphaCodes.map(
    (code) => {
      return serverResponseAlphaCodes[
        code as keyof typeof serverResponseAlphaCodes
      ][0].name;
    }
  );
  expect(neighborsNames).toEqual(serverCanadaNeighborsNames);
});
