var app = angular.module("ItemApp", ['ui.bootstrap']);

app.controller("listCntroller", function ($scope, $http, ItemService) {
  $scope.itemData = null;
  $scope.statisticList = new Array();

  $scope.filteredData = [];
  $scope.currentPage = 1;
  $scope.numPerPage = 4;
  $scope.maxSize = 3;

  $scope.sCurrentPage = 1;
  $scope.sNumPerPage = 3;
  $scope.sMaxSize = 3;



  ItemService.GetAll().then(function (d) {
    $scope.itemData = d.data;
    Statistic();

  }), function () {
    alert('Error reading data');
  };

  $scope.Item =
    {
      Id: '',
      Name: '',
      Type: ''
    };

  $scope.Clear = function () {
    $scope.Item.Id = '';
    $scope.Item.Name = '';
    $scope.Item.Type = '';
  }

  $scope.Save = function () {
    if ($scope.Item.Name != '' && $scope.Item.Type != '') {
      $http({
        method: 'POST',
        url: '/api/values',
        data: $scope.Item
      }).then(function successCallback(response) {
        $scope.itemData.push(response.data);
        alert("Element added");
        $scope.Clear();
        Statistic();

        }, function errorCallback(response) {
          alert("Item hasnot added");
      });
    }
  };

  $scope.Edit = function (index) {
    var a = index + (($scope.currentPage - 1) * $scope.numPerPage);
    var data = $scope.itemData[a];
    $scope.Item = { Id: data.Id, Name: data.Name, Type: data.Type };
  }

  $scope.Cancel = function () {
    $scope.Clear();
  }

  $scope.Update = function () {
    if ($scope.Item.Name != '' && $scope.Item.Type != '') {
      $http({
        method: 'PUT',
        url: '/api/values/' + $scope.Item.Id,
        data: $scope.Item
      }).then(function successCallback(response) {
        alert("Update success");
        $scope.itemData = response.data;
        $scope.Clear();
        }, function errorCallback(response) {
          alert("Element hasn't added");
      });
    }
    else {
      alert("Enter all values");
    }
  };


  var Statistic = function () {
    $scope.statisticList = new Array();
    $scope.itemData.forEach(function (item, i, arr) {
      $scope.statisticList.push({ key: item.Type, value: 0 });
    })
    $scope.itemData.forEach(function (item, i, arr) {
      $scope.statisticList.forEach(function (d, j, ar) {
        if (item.Type == d.key) {
          d.value++;
        }
      })
    })
    $scope.statisticList = Unique($scope.statisticList);
  };

  function Unique(A) {
    var n = A.length, k = 0, B = [];
    for (var i = 0; i < n; i++) {
      var j = 0;
      while (j < k && B[j].key !== A[i].key) j++;
      if (j == k) B[k++] = A[i];
    }
    return B;
  }

  $scope.Delete = function (index) {
    var a = (index) + (($scope.currentPage - 1) * $scope.numPerPage);
    $http({
      method: 'DELETE',
      url: '/api/values/' + $scope.itemData[a].Id,
    }).then(function successCallback(response) {
      alert("Delete success");
      $scope.itemData.splice(a, 1);
      Statistic();
      }, function errorCallback(response) {
        alert("Element hasn't deleted");
    });
  };
});

app.factory("ItemService", function ($http) {
  var fac = {};
  fac.GetAll = function () {
    return $http.get('/api/values');
  }
  return fac;
});
