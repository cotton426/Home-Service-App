import axios from "axios";
// โค้ดนี้อยู่ในไฟล์ client/src/utils/jwtInterceptors.js

function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    const hasToken = Boolean(window.localStorage.getItem("userData"));
    console.log(hasToken);
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
      console.log(req);
      return req;
    },
    (error) => {
      console.log(error);
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
