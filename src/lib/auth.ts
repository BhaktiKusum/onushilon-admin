import Cookies from "js-cookie";

const TOKEN_KEY = "accessToken";

export const authUtils = {
  getToken: () => Cookies.get(TOKEN_KEY),

  setToken: (token: string) => {
    Cookies.set(TOKEN_KEY, token, {
      expires: 7,
      sameSite: "strict",
    });
  },

  removeToken: () => {
    Cookies.remove(TOKEN_KEY);
  },
};