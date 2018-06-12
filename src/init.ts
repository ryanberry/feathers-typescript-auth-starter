import * as sass from 'node-sass'
import * as logger from 'winston'
import { writeFile } from 'fs'

export class InitialiseApp {
  constructor() {
    this.compileStyles()
  }

  compileStyles() {
    sass.render(
      {
        file: 'src/templates/styles/main.scss',
        outFile: 'public/global.css',
      },
      (err, result) => {
        if (err) {
          return logger.error('SASS Error', err)
        }

        writeFile(
          'public/global.css',
          result.css.toString(),
          error => (error ? logger.error('Write File Error', error) : null),
        )
      },
    )
  }
}
