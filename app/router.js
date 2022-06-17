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
  router.get('./getChartMessage',controller.chartMessageController.getChartMessageController)
  router.post('./postChartMessage',controller.chartMessageController.postChartMessageController)
  router.post('./postReplyMessage',controller.chartMessageController,postReplyMessageController)
  router.get('./getDetailedWork',controller.detailedWordController.getDetailedWorkController)
  router.post('./goodsNumberAdd',controller.detailedWordController.goodsNumberAddController)
  router.post('./goodsPriseAdd',controller.detailedWordController.goodsPriseAddController)
  router.get('./getManuscript',controller.manuscriptController.getManuscript)
  router.post('./publishManuscript',controller.manuscriptController.publishManuscript)
};
