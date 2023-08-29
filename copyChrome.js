const fse = require('fs-extra')

fse.copySync(process.env.CHROME_PATH, '.next')
console.log('CHROME COPY DONE')
