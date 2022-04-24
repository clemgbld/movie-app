import { handleStatus } from "../handleStatus";

describe("display the right color in relation to the popularity of the movie", () => {
  it("should have a status of bad when the percentage is less than 50% ", () => {
    const status = handleStatus(43);

    expect(status).toBe("bad");
  });

  it("should have a status of good when the percentage is less than 70% ", () => {
    const status = handleStatus(62);

    expect(status).toBe("good");
  });

  it("should have a status of great when the percentage is equal are more than 70% ", () => {
    const status = handleStatus(75);

    expect(status).toBe("great");
  });
});
