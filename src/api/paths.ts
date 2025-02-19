// const URL = "https://waterz-backend.onrender.com"; 
const URL = "http://localhost:8000"; //local server
const userBaseURL = URL + "/user";
const signUp = URL + "/auth";
const booking = URL + "/booking";
const customer = URL + "/customer";
const agent = URL + "/agent";

export const paths = {
  // Auth endpoints
  login: `${signUp}/signin`,
  signupAgent: `${signUp}/signup/agent`,
  generateOtp: `${signUp}/generate-otp`,
  verifyOtp: `${signUp}/verify-otp`,
  logout: `${userBaseURL}/logout`,
  googleAuth: `${userBaseURL}/google`,
  
  // User endpoints
  getUserProfile: `${userBaseURL}/profile`,
  updateUserProfile: `${userBaseURL}/profile/update`,
  
  // yacht
  getYachtList: `${customer}/listAll`,
  getTopYachts: `${customer}/topYatch`,
  getYachtById: `${customer}/yatch-detail`,

  // query
  userQuery: `${URL}/query`,

  // filter
  locationFilter: `${customer}/idealYatchs`,
  bookYacht: `${agent}/create-booking`,

  // Booking endpoints
    currentRides: `${agent}/current/rides`,
    prevRides: `${agent}/prev/rides`,
    prevRidesId: `${agent}/rides`,
    agentEarnings: `${agent}/me/earnings`,
    registerAgent: `${agent}/register-agent`,
    couponCode: `${customer}/validatePromoCode`,
    updateProfile: `${agent}/updateProfile`,

};

export default paths;