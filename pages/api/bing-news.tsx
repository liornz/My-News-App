import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const searchTerm: string = req.body.searchTerm || 'biden';
  try {
    const response = await axios({
      method: 'GET',
      url: `https://api.bing.microsoft.com/v7.0/news/search?q=${encodeURI(searchTerm)}`,
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.BING_API_KEY,
      },
    });
    res.send(response.data);
  } catch (error) {
    console.log('Something went wrong!');
  }
}