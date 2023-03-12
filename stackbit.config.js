import { ContentfulContentSource } from '@stackbit/cms-contentful';
import { defineStackbitConfig } from '@stackbit/types';
/* eslint-disable import/no-anonymous-default-export */ 


export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'gatsby',
  nodeVersion: '16',
  contentSources: [
    new ContentfulContentSource({
      spaceId: '3hx3gkejasvh',
      environment: 'master',
      previewToken: '3PKZsPaRP4BAGvhAohilRVg7b0lAmxeBR0U2pHGx4IE',
      accessToken: 'CFPAT-9UP8IEJcv3vU0XNLGWmP-7K78OcZ6CNIurKrHexXJsU',
    }),
  ],
  modelExtensions: [{ name: 'page', type: 'page', urlPath: '/{slug}' }]
}
)