import setAuthToken from "../utils/setAuthToken";
import setCurrentUser from "./setUser";
// Register User
// Log user out
const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false

    dispatch(setCurrentUser({}));
};

export default logoutUser;