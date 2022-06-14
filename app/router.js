'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/test', controller.home.index);
  router.post('/upload', controller.picture.upload);
  router.get('/imgDataSouce', controller.picture.getMapData);
  router.post('/removeImg', controller.picture.deletePic)
  router.get('/auth', controller.authentication.getAuth)
  router.post('/authMess', controller.authentication.authName)
};
