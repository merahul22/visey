export function getImageKitUrl(url: string | null | undefined): string {
  if (!url) return '/img/funding-opportunity-placeholder.png';

  try {
    // Check if this is an ImageKit asset tool URL
    if (url.startsWith('https://imagekit.io/tools/asset-public-link')) {
      const detailParam = new URL(url).searchParams.get('detail');
      if (detailParam) {
        const detail = JSON.parse(decodeURIComponent(detailParam));
        return detail.signedUrl || url;
      }
    }
    return url;
  } catch (error) {
    console.error('Error parsing ImageKit URL:', error);
    return '/img/funding-opportunity-placeholder.png';
  }
}
