import axios from "axios";

function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    const hasToken = Boolean(window.localStorage.getItem("userData"));
    if (hasToken) {
      req.headers = {
        ...req.headers,
        Authorization: `Bearer ${
          JSON.parse(window.localStorage.getItem("userData")).data.session
            .access_token
        }`,
      };
    }

    return req;
  });

  axios.interceptors.response.use(
    (req) => {
      return req;
    },
    (error) => {
      if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        window.localStorage.removeItem("userData");
        window.location.replace("/login");
      }
    }
  );
}

export default jwtInterceptor;
