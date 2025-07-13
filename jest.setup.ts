jest.mock("./src/core/utils/logger", () => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}));
afterEach(() => {
  jest.clearAllMocks();
});
