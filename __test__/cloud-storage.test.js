import Stellaria from "../stellaria";

describe("Test making instance", () => {
  test("Test making instance", () => {
    const json = {
      clientId:
        "718517223949-6o06isaj2uomgg0ive2qhr0cpojeb4n4.apps.googleusercontent.com",
      scope: "https://www.googleapis.com/auth/devstorage.read_write",
      redirectUrl: "http://localhost:3000",
    };

    const stellaria = new Stellaria(json);
    new Stellaria()
  });
});
