/**
 * WARNING
 *
 * This constants must exist if you EVER want
 * platform cli to be able to parse this file.
 * Change whatever in this file EXCEPT for
 * the constants
 */
const service = 'platform-assistant-v2'
const apiPrefix = 'platform-assistant-v2'
const serverSourceFolder = 'src/server'
const clientSourceFolder = 'src/client'
const deployBucket = 'platform.s-mdstrm.com'
/**
* WARNING END
*/

module.exports = () => {
  return {
    service,
    apiPrefix,
    serverSourceFolder,
    clientSourceFolder,
    deployBucket
  }
}
