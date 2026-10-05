/** The live App Store listing for Daily Doctrine. */
export const APP_STORE_ID = '6758056190'

/**
 * App Store Connect provider token for campaign links (App Analytics → Campaigns).
 * When set, links carry `pt` + `ct` so installs are attributed per channel.
 */
const PROVIDER_TOKEN = process.env.NEXT_PUBLIC_ASC_PROVIDER_TOKEN || '128471316'

/** App Store URL for a given campaign (e.g. "website_hero", "share_page"). */
export function appStoreUrl(campaign: string): string {
  if (!PROVIDER_TOKEN) {
    return `https://apps.apple.com/app/daily-doctrine/id${APP_STORE_ID}`
  }
  const params = new URLSearchParams({ pt: PROVIDER_TOKEN, ct: campaign, mt: '8' })
  return `https://apps.apple.com/app/apple-store/id${APP_STORE_ID}?${params.toString()}`
}
