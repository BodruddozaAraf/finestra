import {defineCliConfig} from 'sanity/cli'
import {dataset, projectId} from './env'

export default defineCliConfig({
  api: {projectId, dataset},
  // `npm run deploy` publishes the Studio to https://finestra.sanity.studio.
  // If Sanity says the name is taken, pick another here and in the docs.
  studioHost: 'finestra',
  deployment: {appId: 'qmltbodzkjvit0rehgjocwlt', autoUpdates: true},
})
