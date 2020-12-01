import type { NewsItem } from "./NewsItem";

export interface NewsResponse {
    total: number,
    pages: number,
    currentPage: number,
    records: NewsItem[]
}