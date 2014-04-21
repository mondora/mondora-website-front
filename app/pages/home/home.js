angular.module("mnd.web").controller("HomeController", function ($scope, $collection) {

	var lorem = "Quando tramite la tastiera modifichiamo il volume o regoliamo la luminosità dello schermo, vediamo apparire delle semplici grafiche esplicative dell'operazione. La stessa cosa non succede però per il blocco maiuscole, per cui siamo costretti a guardare se la spia sul tasto è accesa o spenta. CapSee è una piccola app, compatibile con Mavericks e precedenti, che risolve questo inconveniente, mostrando una grafica in sovraimpressione.";
	$scope.text = lorem;

	$scope.login = function () {
		$scope.Ceres.loginWithTwitter();
	};

});
