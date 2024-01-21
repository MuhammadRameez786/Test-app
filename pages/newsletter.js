import axios from 'axios';

const MAILCHIMP_API_KEY = process.env.REACT_APP_MAILCHIMP_API_KEY;
const MAILCHIMP_LIST_ID = process.env.REACT_APP_MAILCHIMP_LIST_ID;

console.log("mailchimp key:", MAILCHIMP_API_KEY);
console.log("mailchimp id:", MAILCHIMP_LIST_ID);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).end(); // Method Not Allowed
    }
  
    const { email } = req.body;
  
    // Email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid email address' });
    }
  
    try {
      // Check if the email is already a member of the list
      const checkResponse = await axios({
        method: 'GET',
        url: `https://us21.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${encodeURIComponent(email)}`,
        auth: {
          username: 'Thedaygalpuclub',
          password: MAILCHIMP_API_KEY,
        },
      });
  
      if (checkResponse.status === 200 && checkResponse.data.status === 'subscribed') {
        // If the email is already a member, send a message
        return res.json({ success: true, message: 'You are already subscribed to our email list' });
      }
  
      // If the email is not a member or is pending confirmation, subscribe it
      const subscribeResponse = await axios({
        method: 'POST',
        url: `https://us21.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
        auth: {
          username: 'Thedaygalpuclub',
          password: MAILCHIMP_API_KEY,
        },
        data: {
          email_address: email,
          status: 'pending', // Use 'pending' status for double opt-in
        },
      });
  
      // console.log(subscribeResponse.data);
      res.json({ success: true, message: 'Please check your email to confirm your subscription' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Unable to subscribe' });
    }
  }