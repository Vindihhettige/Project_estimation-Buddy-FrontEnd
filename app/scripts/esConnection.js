/***
 * Project: Project Estimation Buddy
 * Author: Vindya Hettige
 * Module: Service to cooncet with ES
 */

 (function () {
  'use strict';

  angular
  .module('sbAdminApp')
  .factory('elasticSearchConnection', eSearchConnection);

  datImportService.$inject = ['esFactory'];
  function datImportService(esFactory) {

	return esFactory({
        host: 'localhost:9200'
      });

       }

     })();
