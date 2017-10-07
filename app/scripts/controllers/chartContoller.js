'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
 angular.module('sbAdminApp')
 .controller('ChartCtrl', ['$scope', '$timeout','elasticSearchConnection','esFactory', function ($scope, $timeout,elasticSearchConnection,esFactory) {



    $scope.technologies = [{'title':'Java','isSelected':false},{'title':'AngularJS','isSelected':false},{'title':'Python','isSelected':false},{'title':'.Net','isSelected':false},{'title':'Java,Maven,Angular','isSelected':false}];
//$scope.features = [{'title':'Login','isSelected':false},{'title':'User Management','isSelected':false}];
//$scope.sections =  ['sec1','sec2'];

$scope.collectTech = function(technology){
    console.log(technology);
};
$scope.selecetedFeatures = [];
$scope.selecetSection = function(){
    $scope.selecetedFeatures = $scope.selectedSection.feature;
    console.log($scope.selectedSection);
};

$scope.collectFeatures = function(){
    console.log($scope.selectedFeature);
};

$scope.startSearch = function(){
   var technology ="";
   angular.forEach($scope.technologies, function(value, key) {
    if(value.isSelected){
        technology = technology+value.title+" ";
    }

});
   technology= technology.slice(0,-1);
   elasticSearchConnection.search({
    index: 'projects',
    size: 50,
    body: {"query": {
      "bool": {
        "must": [
        {"match": {
            "metadata.technology": technology
        }},
        {
            "match": {
              "section.name": $scope.selectedSection.name
          }
      },{
        "match": {
          "section.feature.name": $scope.selectedFeature
      }
  }

  ]
}
}
, "_source": ["name", "metadata.technology", "metadata.estimator","section.name", "section.feature.name", "section.feature.dev.pessimistic", "section.feature.dev.realistic", "section.feature.dev.optimistic"]
}

}).then(function (response) {
  $scope.resultArry = response.hits.hits;
  console.log($scope.response);
  $scope.bar = {
        labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
        series: ['Series A', 'Series B'],

        data: [
           [65, 59, 80, 81, 56, 55, 40],
           [28, 48, 40, 19, 86, 27, 90]
        ]
        
    };
});


}


$scope.selectedSection ="";

$scope.sections = [
{
    "section": [{
        "name": "Requirements",
        "feature": [{
            "name": "Review and analyze - Project1 Store, Catalog, Order Management process"
        },
        {
            "name": "Review and analyze - Project1 3rd party systems in use and integrations"
        },
        {
            "name": "Review and analyze - Packaging and Deployement"
        },
        {
            "name": "Technical clarification required on requiremnts."
        }
        ]
    },{
        "name": "Team Briefing",
        "feature": [{
            "name": "Team briefing and ramp-up"
        }
        ]
    },{
        "name": "Environment Setup",
        "feature": [{
            "name": "Prepare Dev Environments"
        },
        {
            "name": "Prepare UAT AWS Environement (see comments sectiion)"
        },
        {
            "name": "Configure Load Testing Environments (UAT/PROD)"
        },
        {
            "name": "Prepare environments for Build and CI tools"
        }
        ]
    },{
        "name": "Solution Architecture",
        "feature": [{
            "name": "Modify/ammend PoC solution to include Ecomm Dashboard"
        },
        {
            "name": "Modify/ammend PoC solution to include Mobile Site"
        },
        {
            "name": "Modify PoC data schema to support Ecomm Dashboard"
        },
        {
            "name": "Intrduce Unit Test Framework"
        },
        {
            "name": "Introduce Background tasks/services"
        }
        ]
    },
    {
        "name": "DevOps Tools",
        "feature": [{
            "name": "Configure - Automated Build tools"
        },
        {
            "name": "Configure - Application Performance Monitoring (Only PROD)"
        },
        {
            "name": "Configure - Deployment mechanism for API Components and DB"
        },
        {
            "name": "Configure - Deployment mechanism for WSO2 middleware"
        },
        {
            "name": "Configure - Centralized Log Management (Only PROD)"
        },
        {
            "name": "Configure - Code analyzers (Sonar Qube)"
        }
        ]
    },
    {
        "name": "Data Migrations",
        "feature": [{
            "name": "ETL - Migrate current active Project1 catalog"
        },
        {
            "name": "ETL - Migrate Project1 Store information (Store data, terrotories…etc)"
        },
        {
            "name": "ETL - Migrate Project1 Trading data (Trading hours/exceptions…etc)"
        },
        {
            "name": "ETL - Migrate Existing Customer information"
        }
        ]
    }
    ,
    {
        "name": "Front End (UI Integrations)",
        "feature": [{
            "name": "Integrate landing page UI & changes in UI logic"
        },
        {
            "name": "Integrate menu UI & changes in UI logic"
        },
        {
            "name": "Integrate Store selection UI & changes in UI logic"
        },
        {
            "name": "Integrate fulfillment options (e.g. time.. Etc) UI & changes in UI logic"
        },
        {
            "name": "Integrate dealbuilder UI & changes in UI logic"
        },
        {
            "name": "Intergrate product customization UI & changes in UI logic"
        }
        ,
        {
            "name": "Integrate Cart UI & changes in UI logic"
        }
        ,
        {
            "name": "Integrate Checkout screen UI & changes in UI logic"
        }
        ,
        {
            "name": "Westpack payment gateway integrations UI"
        }
        ,
        {
            "name": "Integrate Order success/fail UIs and any changes in UI functionality"
        }
        ,
        {
            "name": "Integrate Contact us page UI and change in UI logic"
        }
        ,
        {
            "name": "Integrate Order success/fail UIs and any changes in UI functionality"
        }
        ,
        {
            "name": "Integrate customer login/customer profile Uis and changes to UI logic"
        }
        ,
        {
            "name": "Other UI screens and their functionality (see comment section)"
        },
        {
            "name": "Create catering form"
        },
        {
            "name": "Create feedback form"
        }
        ]
    },
    {
        "name": "BL Changes/PoC Amendmants",
        "feature": [{
            "name": "Product customization Logic modifications"
        },
        {
            "name": "Deal Builder logic modifications"
        },
        {
            "name": "Coupon functionality modifications"
        },
        {
            "name": "Implement contact us/feedback backend logic (and trigger email)"
        },
        {
            "name": "Implement User Profile/User login functionality (oAuth with FB)"
        },
        {
            "name": "Entitlements modifications to cater Project1"
        },
        {
            "name": "Bootstrap URL modifications"
        },
        {
            "name": "Promotion Tile modifications"
        },
        {
            "name": "Order history backend functionality modifications"
        },
        {
            "name": "Modifications to create your own Pizza"
        },
        {
            "name": "Modifications to pricing logics to cater Project1"
        },
        {
            "name": "Modifications to Popup functionlity to support Project1"
        },
        {
            "name": "Modifications to surcharges (inluding adding exact value Holiday surcharge)"
        },
        {
            "name": "Changes in Voucher functionality to support Project1"
        },
        {
            "name": "Implement feature to override miminum order value for some promotions"
        },
        {
            "name": "Implement Address validation/Geocoding APIs (using Experian)"
        },
        {
            "name": "Implement Catering Order backend logic"
        },
        {
            "name": "Changes in PoC order serializer to support all products including Deals/Coupons"
        },
        {
            "name": "Google Analytics/Adwords Integrations"
        }
        ]
    },
    {
        "name": "Monitoring",
        "feature": [{
            "name": "Store PoS availability monitoring / DB Connectivity and other issues"
        },
        {
            "name": "Failed order detection mechanism and SMS alerts module"
        },
        {
            "name": "Submit order information to Call center upon failure"
        }
        ]
    },
    {
        "name": "Infrastructure/Middleware",
        "feature": [
        {
            "name": "Configuring ESB (PROD/UAT)"
        },
        {
            "name": "Configuring ELB (PROD/UAT)"
        },
        {
            "name": "Configuring and connecting to SQS (PROD/UAT)"
        },
        {
            "name": "Configuring Beanstalk (PROD/UAT)"
        }
        ]
    },
    {
        "name": "API management & Security",
        "feature": [
        {
            "name": "Implement API security"
        }
        ]
    },
    {
        "name": "Testing",
        "feature": [
        {
            "name": "Dev Unit testing (~20% of Dev effort)"
        },
        {
            "name": "Develop a load testing suit"
        }
        ]
    },
    {
        "name": "Westpack Payment Gateway",
        "feature": [
        {
            "name": "Changes on API/Middleware (on top of completed PoC)"
        },
        {
            "name": "Improvements to Payload conversion (on top of completed PoC)"
        },
        {
            "name": "Payment response handling (success/failure) (on top of PoC)"
        },
        {
            "name": "Implement Payment Refunds"
        },
        {
            "name": "Unit testing the integration"
        }
        ]
    },
    {
        "name": "Micros Integration",
        "feature": [
        {
            "name": "Changes on Middleware (on top of completed PoC)"
        },
        {
            "name": "Implement order retrying mechanism"
        },
        {
            "name": "Amendments to Payload conversion to support deals/couppons…etc."
        },
        {
            "name": "Integrate with PoS Healthcheck mechnism"
        },
        {
            "name": "Unit testing the integration"
        }
        ]
    },
    {
        "name": "Campaign Monitor",
        "feature": [
        {
            "name": "Amendments to the PoC implementation"
        },
        {
            "name": "Create templates for order success/failure, notifications"
        },
        {
            "name": "Testing the integration"
        }
        ]
    }

    ]
}];
}]);