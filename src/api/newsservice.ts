import api from './api'
import type { NewsResponse } from './model/NewsResponse';
import originService from '../api/OriginService';

export default {

    getNews() {
        return api.get<NewsResponse>(
            originService.getUrl('/integrations/news')
        )
    }
}