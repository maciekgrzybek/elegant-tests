# Elegant frontend testing

## Introduction

This project provides a suite of tools, patterns, and best practices for writing comprehensive unit and integration tests in JavaScript and related technologies. It features the use of RenderBuilder for component rendering, PageBuilder for managing HTML elements, a mock server for simulating real API communication, and class builders for creating mock data. The project also introduces the technique of snapshot testing for visual regression alongside the utilization of the jest-text-matrix to handle functionalities that come with a variety of inputs.

## Features

Here is a quick run-down of the tools and patterns you can find and explore with our project:

- [**RenderBuilder**](./src/test-utils/render-builder.tsx): This tool helps to render components with wrapping components whenever needed. It helps wrap your component in any contexts it depends on and abstract away redundant code.

- [**PageBuilder**](./src/test-utils/page-builder.tsx): This tool is designed to hide the mechanical details of finding HTML elements and validating their existence. It simplifies the process of creating page objects and enhances the efficiency in testing.

- [**Mock server**](./src/test-utils/setup-mock-server.ts): Provides an efficient way to simulate API communication for testing purposes. It allows you to mimic the behaviors of an actual server and make adjustments as needed for testing different scenarios.

- [**Class Builders for Mock Data**](./src/cart/cart-builder.ts): Facilitates creating mock data for tests. Using this pattern makes your unit tests safer, more predictable and easier to read.

-[**Snapshot Testing**](./src/cart/prices/prices.spec.tsx): An exceptional approach for performing visual regression testing. It assesses whether the UI output accurately corresponds with the expected output or not.

- [**jest-text-matrix**](./src/cart/status.spec.ts): An effective tool for testing functionalities that come with various input combinations. It helps in defining the test cases in a compact and manageable manner.

- [**Example tools usage in tests**](./src/pre-filled-cart.test.tsx): Example of using the tools

- [**Example with "bad" approach**](./src/pre-filled-cart-bad.test.tsx): Example of unstructured tests

## Scripts

- start the server:
  - `cd server && yarn && node index.js`
- start the app:
  - `yarn dev`
- start tests:
  - `yarn test`
