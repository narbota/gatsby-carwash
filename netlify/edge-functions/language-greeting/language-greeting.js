export default async (request, context) => {
  const translations = {
    UNKNOWN: 'Hello!',
    US: "Howdy y'all!",
    GB: 'How do you do?',
    AU: "G'day, mate!",
    ZA: "Howdy, partner!",
    FR: "Bonjour!"
    
  }

  const countryCode = context.geo?.country?.code || 'UNKNOWN'
  const countryName = context.geo?.country?.name || 'somewhere in the world'

  return new Response(`Proudly serving customers in ${countryName}.  ${translations[countryCode]}!`, {
    headers: { 'content-type': 'text/html' },
  })
}
