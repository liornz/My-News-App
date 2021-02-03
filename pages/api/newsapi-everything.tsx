import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { articles, language, sortBy } from '../../types/types';
import SearchInTitle from '../../components/toolbar-elements/search-in-title';

interface ResponseOK {
  status: 'ok';
  totalResults: number;
  articles: articles;
}

interface ResponseError {
  status: 'error';
  code: string;
  message: string;
}

type everythingResponse = ResponseOK | ResponseError;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const source: string = req.body.source || '';
  const searchTerm: string = req.body.searchTerm;
  const searchInTitle: boolean = req.body.searchInTitle;
  const domains: string = req.body.domains || '';
  const excludeDomains: string = req.body.excludeDomains || '';
  const toFrom: { from: string; to: string } = req.body.toFrom  || '';
  const language: language = req.body.language;
  const sortBy: sortBy = req.body.sortBy || 'popularity';
  const pageSize: number = req.body.pageSize;

  try {
    const everythingUrl = searchInTitle
      ? `
  https://newsapi.org/v2/everything?qInTitle=${encodeURI(
          searchTerm
        )}&language=${language}&pageSize=${pageSize}&apiKey=${
          process.env.NEWS_API
        }`
      : `
  https://newsapi.org/v2/everything?q=${encodeURI(
          searchTerm
        )}&language=${language}&pageSize=${pageSize}&apiKey=${
          process.env.NEWS_API
        }`;
    const response = await axios.get<everythingResponse>(everythingUrl);
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
