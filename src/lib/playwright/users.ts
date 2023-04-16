// import appConfig from "@/app.config";
import appConfig from "../../app.config";

const domain = appConfig.url.replace("https://", "");

type TestUser = {
  name: string;
  email: string;
  password: string;
};

const TEST_USER_PASSWORD = "TestPassword1!";

export const existingUser: TestUser = {
  name: "Old Guy",
  email: "existingtestuser@" + domain,
  password: TEST_USER_PASSWORD,
};

export const newUser: TestUser = {
  name: "New Guy",
  email: "newusertest@" + domain,
  password: TEST_USER_PASSWORD,
};
