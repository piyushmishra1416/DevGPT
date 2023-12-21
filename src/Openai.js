// utils/apiUtils.js
const apiUrl = 'https://api-v2.longshot.ai/custom/api/generate/instruct';

export const makeApiRequest = async (text, token) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error making API request:', error);
    throw error; // Rethrow the error to handle it elsewhere
  }
};
