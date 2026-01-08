class Cookie {
    /**
     * Set a cookie
     * @param {string} name - cookie name
     * @param {string} value - cookie value
     * @param {number} days - expiration in days
     * @param {string} path - cookie path (default "/")
     */
    static set(name, value, days = 7, path = "/") {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
            value
        )};expires=${expires.toUTCString()};path=${path}`;
    }

    /**
     * Get a cookie by name
     * @param {string} name
     * @returns {string|null}
     */
    static get(name) {
        const match = document.cookie.match(
            new RegExp("(^| )" + encodeURIComponent(name) + "=([^;]+)")
        );
        return match ? decodeURIComponent(match[2]) : null;
    }

    /**
     * Delete a cookie by name
     * @param {string} name
     * @param {string} path - must match the path used when setting
     */
    static remove(name, path = "/") {
        document.cookie = `${encodeURIComponent(
            name
        )}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path}`;
    }

    /**
     * Check if a cookie exists
     * @param {string} name
     * @returns {boolean}
     */
    static exists(name) {
        return this.get(name) !== null;
    }
}
export default Cookie;