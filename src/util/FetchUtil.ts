export class FetchUtil {

    public static async fetchImg(url) {
        const response = await fetch(url);
        if (response.ok) {
            const blob = await response.blob();
            const fileName = url.substring(url.lastIndexOf('/') + 1);
            return new File([blob], fileName, { type: blob.type });
        } else {
            return null;
        }
    }

    public static async fetchOGData(url) {
        const response = await fetch(url);
        if (response.ok) {
            const html = await response.text();
            const domParser = new DOMParser();
            const doc = domParser.parseFromString(html, 'text/html');

            const ogTitle = doc.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.content;
            const ogDescription = doc.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.content;
            const ogImage = doc.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.content;

            return {
                title: ogTitle,
                description: ogDescription,
                imageUrl: ogImage
            };
        } else {
            return null;
        }
    }
}