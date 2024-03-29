const {
  router: platformRouter
} = require('@mediastream/platform-microservice-sdk')

const router = new platformRouter.Router({
  prefix: '/',
  authorizer: 'getPermissions' // reads from config.authorizer
})

router.get('/', require('./list'))
router.post('/', require('./create'))
router.get('/:moduleNameId', require('./detail'))
router.post('/:moduleNameId', require('./update'))
router.delete('/:moduleNameId', require('./delete'))

/**
 * WARNING
 *
 * don't delete or modify this exports
 */
module.exports.router = router
module.exports.handler = router.getHandler()
