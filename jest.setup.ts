jest.mock("./src/core/utils/logger", () => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
}));
afterEach(() => {
  jest.clearAllMocks();
});
