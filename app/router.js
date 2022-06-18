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
  router.get('/getChartMes',controller.chartMessage.getChartMessage)
  router.post('/postChartMes',controller.chartMessage.postChartMessage)
  router.post('/postReplyMes',controller.chartMessage.postReplyMessage)
  router.get('/getDetailedWork',controller.detailedWorks.getDetailedWorkController)
  router.post('/goodsNumberAdd',controller.detailedWorks.goodsNumberAddController)
  router.post('/goodsPriseAdd',controller.detailedWorks.goodsPriseAddController)
  router.get('/getManuscript',controller.manuscript.getManuscript)
  router.post('/publishManuscript',controller.manuscript.publishManuscript)
};
