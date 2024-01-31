import { setupServer } from "msw/node";

type Input = Parameters<typeof setupServer>;

export const setupMockServer = (...handlers: Input) => {
	const defaultHandlers: Input = [];

	const mockServer = setupServer(...defaultHandlers, ...handlers);

	beforeAll(() => {
		mockServer.listen({
			onUnhandledRequest: "warn",
		});
	});

	afterEach(() => {
		mockServer.resetHandlers();
	});

	afterAll(() => {
		mockServer.close();
	});

	return { mockServer };
};
