export default {

    getOrigin() {
        if (location.hostname === 'localhost') {
            return "http://" + location.hostname + ':8080';
        } else {
            return "http://" + location.hostname;
        }
    },

    getUrl(url: string) {
        const fullUrl = this.getOrigin() + url
        return fullUrl;
    }
}