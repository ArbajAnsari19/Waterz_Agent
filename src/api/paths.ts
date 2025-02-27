const URL = "https://backend.wavezgoa.com";  
// const URL = "http://localhost:8000"; //local server
const userBaseURL = URL + "/user";
const signUp = URL + "/auth";
// const customer = URL + "/customer";
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
  getUserProfile: `${agent}/me`,
  updateUserProfile: `${userBaseURL}/profile/update`,
  
  // yacht
  getYachtList: `${agent}/listAll`,
  getTopYachts: `${agent}/topYatch`,
  getYachtById: `${agent}/yatch-detail`,

  // query
  userQuery: `${URL}/query`,

  // filter
  locationFilter: `${agent}/search-Yatch`,
  bookYacht: `${agent}/create-booking`,

  // Booking endpoints
    currentRides: `${agent}/current/rides`,
    prevRides: `${agent}/prev/rides`,
    prevRidesId: `${agent}/rides`,
    agentEarnings: `${agent}/me/earnings`,
    registerAgent: `${agent}/register-agent`,
    couponCode: `${agent}/validatePromoCode`,
    updateProfile: `${agent}/updateProfile`,

};

export default paths;