// import * as React from "react";
// /** Custom types */
// import { UserAuth } from "../../custom-types";
// /** Utils */
// import { DEFAULT_USER_AUTH } from "../Consts";

// const useAuthHandler = (initialState: UserAuth) => {
//    const [auth, setAuth] = React.useState(initialState);
//    const setAuthStatus = (userAuth: UserAuth) => {
//       window.localStorage.setItem("UserAuth", JSON.stringify(userAuth));
//       setAuth(userAuth);
//    };
//    const setUnauthStatus = () => {
//       window.localStorage.clear();
//       setAuth(DEFAULT_USER_AUTH);
//    };
//    return {
//       auth,
//       setAuthStatus,
//       setUnauthStatus,
//    };
// };
// export default useAuthHandler;

// /** Helper function to retrieve token from local storage Return user auth from local storage value */
// export const getStoredUserAuth = (): UserAuth => {
//    const auth = window.localStorage.getItem("UserAuth");
//    if (auth) {
//       return JSON.parse(auth);
//    }
//    return DEFAULT_USER_AUTH;
// };
