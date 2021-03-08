import { render } from "@testing-library/react";
import ProfileCards from "../components/Swipe";
import { useAuthMock } from "../mocks/setupTests";

const auth = require("../services/AuthContext");
describe("renderProfileCards", () => {
  let mockAuth;
  beforeEach(() => {
    mockAuth = jest.spyOn(auth, "useAuth").mockImplementation(useAuthMock);
  });
  afterEach(() => {
    mockAuth.mockRestore();
  });

  test("render profile: check if profile cards render", () => {
    render(<ProfileCards />);
  });
});
