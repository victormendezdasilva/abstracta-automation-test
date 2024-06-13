import { request } from "@playwright/test";

export async function signUp(
  username: string,
  password: string
): Promise<void> {
  let apiContext = await request.newContext();

  const response = await apiContext.post("https://api.demoblaze.com/signup", {
    data: {
      username: username,
      password: password,
    },
  });

  if (!response.ok()) {
    throw new Error(
      `Failed to sign up: ${response.status()} ${response.statusText()}`
    );
  }

  await apiContext.dispose();
}

export function generateRandomString(length: number): string {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let string = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    string += characters.charAt(randomIndex);
  }
  return string;
}

export async function logIn(username: string, password: string) {
  let apiContext = await request.newContext();

  const response = await apiContext.post("https://api.demoblaze.com/login", {
    data: {
      username: username,
      password: password,
    },
  });

  console.log(await response.body());

  /*   $.ajax({
    type: "POST",
    url: "https://api.demoblaze.com/login",
    data: JSON.stringify({ username: username, password: pass }),
    contentType: "application/json",

    success: function (data) {
      let token = data.replace("Auth_token: ", "");
      document.cookie = "tokenp_=" + token;
    },
  }); */
}
