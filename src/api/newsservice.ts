import api from './api'
import type { NewsResponse } from './model/NewsResponse';

export default {

    getNews() {
        return api.get<NewsResponse>('http://192.168.178.122/integrations/news')
    }
}