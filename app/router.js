'use strict';
module.exports = app => {
  const { controller, router } = app;

  router.get('/about', controller.about.index);
};
