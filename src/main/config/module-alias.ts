import { resolve } from 'node:path'
import { addAlias } from 'module-alias'

addAlias('@', resolve('dist'))
