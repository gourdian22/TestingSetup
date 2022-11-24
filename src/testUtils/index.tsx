/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import {
  render as rtlRender,
  RenderOptions,
  RenderResult,
} from "@testing-library/react";

import { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import {
  RouteObject,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import { router } from "../App";

import { configStoreWithInitialState, RootState } from "store";

type CustomRenderOptions = {
  preloadedState?: Partial<RootState>;
  routeHistory?: Array<string>;
  initialRouteIndex?: number; // index in the routeHistory array to start the test
  renderOptions?: Omit<RenderOptions, "wrapper">;
  routes?: RouteObject[];
};

type CustomRouter = typeof router;

type CustomRenderResult = RenderResult & { router: CustomRouter };

type MemoryHistoryBuildOptions = {
  initialEntries?: string[];
  initialIndex?: number;
};
function render(
  ui: ReactElement,
  {
    preloadedState = {},
    routeHistory = [],
    initialRouteIndex,
    routes,
    ...renderOptions
  }: CustomRenderOptions = {}
): CustomRenderResult {
  const memoryHistoryArgs: MemoryHistoryBuildOptions = {};
  if (routeHistory.length > 0) {
    memoryHistoryArgs.initialEntries = routeHistory;
    memoryHistoryArgs.initialIndex = initialRouteIndex;
  }

  let customRouter = createMemoryRouter(router.routes, {
    ...memoryHistoryArgs,
  });
  if (routes) {
    customRouter = createMemoryRouter(routes, { ...memoryHistoryArgs });
  }
  function Wrapper(): ReactElement {
    const store = configStoreWithInitialState(preloadedState);

    return (
      <Provider store={store}>
        <RouterProvider router={customRouter}></RouterProvider>
      </Provider>
    );
  }

  const renderResult = rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
  return { ...renderResult, router: customRouter };
}

// re-export everything
export * from "@testing-library/react";

// override render method and export history
export { render };
