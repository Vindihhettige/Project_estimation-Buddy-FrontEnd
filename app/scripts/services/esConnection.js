/***
 * Project: Project Estimation Buddy
 * Author: Vindya Hettige
 * Module: Service to cooncet with ES
 */

 var serviceName = 'elasticSearchConnection';

 angular.module('sbAdminApp').service(serviceName,
        		 ['esFactory', 
        function elasticSearchConnection(esFactory){
	return esFactory({
        host: 'localhost:9200'
      });

}]);
