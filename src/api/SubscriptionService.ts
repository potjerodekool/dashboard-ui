import api from './api'
import originService from '../api/OriginService';
import type { FeedSubscription } from './model/FeedSubscription';

export default {

    getSubscriptions() {
        return api.get<FeedSubscription[]>(
            originService.getUrl('/integrations/syndfeed/subscriptions')
        )
    }
}

