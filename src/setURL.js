require('dotenv').config();
const SERVER_URL = process.env.NODE_ENV === 'development' ? "http://localhost:5000" : "https://ks-exercise-tracker.herokuapp.com"

export default SERVER_URL