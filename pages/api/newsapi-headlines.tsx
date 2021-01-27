import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { articles } from '../../types/types';

interface headlinesResponseOK {
  status: 'ok';
  totalResults: number;
  articles: articles;
}

interface headlinesResponseError {
  status: 'error';
  code: string;
  message: string;
}

type headlinesResponse = headlinesResponseOK | headlinesResponseError;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const country: string = req.body.country || '';
  const category: string = req.body.category || '';
  const source: string = req.body.source || '';
  const searchTerm: string = req.body.searchTerm;
  const pageSize: number = req.body.pageSize;

  try {
    const headlinesUrl = `
  https://newsapi.org/v2/top-headlines?country=${encodeURI(
    country
  )}&category=${encodeURI(category)}&source=${encodeURI(source)}&q=${encodeURI(
      searchTerm
    )}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API}`;
    console.log(headlinesUrl);
    const response = await axios.get<headlinesResponse>(headlinesUrl);
    if (response.data.status === 'ok') {
      res.status(200).send(response.data.articles);
    } else if (response.data.status === 'error') {
      res
        .status(401)
        .send({ code: response.data.code, message: response.data.message });
    }
  } catch (error) {
    res.status(402);
  }
};

