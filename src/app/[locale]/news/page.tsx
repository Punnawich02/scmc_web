"use client";

import React from 'react';
import { useEffect, useState } from 'react';

type NewsItem = {
    id: number;
    title: string;
    content: string;
    // Add other fields as needed
};

const fetchNews = async (): Promise<NewsItem[]> => {
    const newsUrl = process.env.NEXT_PUBLIC_NEWS_URL;
    if (!newsUrl) {
        throw new Error('NEXT_PUBLIC_NEWS_URL environment variable is not defined');
    }
    const response = await fetch(newsUrl);
    console.log('Fetching news from:', newsUrl);
    if (!response.ok) throw new Error('Failed to fetch news');
    return response.json();
};

const NewsPage = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadNews = async () => {
            try {
                const newsData = await fetchNews();
                setNews(newsData);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main className="bg-white p-4 w-full h-full text-gray-800">
            <h1>News</h1>
            <p>Welcome to the News page.</p>
            <ul>
                {news.map(item => (
                    <li key={item.id}>
                        <h2>{item.title}</h2>
                        <p>{item.content}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export default NewsPage;