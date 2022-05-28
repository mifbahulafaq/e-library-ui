import dotenv from 'dotenv';

dotenv.config();

export const config = {
	api_host: process.env.REACT_APP_API_HOST,
	site_title: process.env.REACT_APP_SITE_TITLE,
	booking_duration: process.env.REACT_APP_BOOKING_DURATION,
	date_of_return: process.env.REACT_APP_DATE_OF_RETURN,
	fine: process.env.REACT_APP_FINE,
	owner: process.env.REACT_APP_OWNER
}