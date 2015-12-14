rs.controller('MainCtrl', function($scope, $ionicModal, $timeout, $rootScope, $http, $stateParams) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
$rootScope.hostAdress = "http://actions.dev-topsu.ru/";

// Form data for the login modal
    $scope.enter = {};
    $scope.register = {};
    $scope.reset = {};
    $scope.edit = {};


    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalLogin = modal;
    });

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/forgot.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalForgot = modal;
    });

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalRegister = modal;
    });

    // Open the logIn modal
    $scope.login = function() {
        $scope.modalLogin.show();
    };

    $scope.openRegister = function() {
        $scope.modalRegister.show();
    };

    $scope.openForgot = function() {
        $scope.modalForgot.show();
    };

    // Triggered in the logIn modal to close it
    $scope.closeLogin = function() {
        $scope.modalLogin.hide();
    };

    $scope.closeRegister = function() {
        $scope.modalRegister.hide();
    };

    $scope.closeForgot = function() {
        $scope.modalForgot.hide();
    };

    // Perform the logIn action when the user submits the logIn form
    $scope.doLogin = function() {
        if ($scope.enter.email && $scope.enter.password) {
            //URL send order,
            $http.post($rootScope.hostAdress + 'authjson', {
                submit: true,
                email: $scope.enter.email,
                password: $scope.enter.password
            }).success(function(data) {
                if (data[0] == "Пользователь не найден!") {
                    console.log("doLogin --- success --- Пользователь не найден!", data);
                    $scope.showAlertLogin();
                    //console.log("$scope.showAlertLoginEmail()");
                    return false;
                } else if (data[0] == null) {
                    console.log("doLogin --- success  == null", data);
                    $scope.showAlertLogin();
                    return false;
                } else {
                    $scope.successWindow = true;
                    console.log("doLogin --- success", data);
                    $scope.userData = data[0];

                    window.localStorage['userData'] = angular.toJson($scope.userData);
                    $rootScope.userData = JSON.parse(window.localStorage['userData']);
                    console.log("mainCtrl --- doLogin --- $rootScope.userData", $rootScope.userData);

                    window.localStorage['userPassword'] = angular.toJson($scope.enter.password);
                    $scope.userPassword = JSON.parse(window.localStorage['userPassword']);
                    console.log("mainCtrl --- doRegister --- $scope.userPassword", $scope.userPassword);

                    $scope.menuEnterString = true;
                    $scope.showAlertLoginWelcom();
                    $scope.enter.email = null;
                    $scope.enter.password = null;

                    // $timeout close attention window automatically within 3.500 second
                    $timeout(function() {
                        $scope.successWindow = false;
                    }, 3500);

                    $timeout(function() {
                        $scope.closeLogin();
                    }, 1000);
                }

                //success post request
            }).error(function(data) {
                //error
                $scope.showAlertLoginEmail();
            });
        } else {
            $scope.showAlertLogin();
        }
    };

    $scope.doRegister = function() {
        //URL send order,
        $http.post($rootScope.hostAdress + 'regang', {
            submit: true,
            name: $scope.register.name,
            email: $scope.register.email,
            password: $scope.register.password,
            passwordis: $scope.register.confirmPassword
        }).success(function(data) {
            if (data.email == "Введён не корректный email") {
                $scope.showAlertRegisterEmail();
            } else {
                $scope.successWindow = true;
                $scope.showAlertRegisterUserWelcom();
                $scope.register.name = null;
                $scope.register.email = null;
                $scope.register.password = null;
                $scope.register.confirmPassword = null;

                // $timeout close attention window automatically within 3.500 second
                /*$timeout(function() {
                    $scope.successWindow = false;
                }, 3500);*/

                $timeout(function() {
                    $scope.closeRegister();
                }, 1500);
            }

        }).error(function(data) {
            //error
            console.log("doRegister-error", data);
            $scope.showAlertRegisterEmail();
        });

    };

    $scope.doForgot = function() {
        console.log("$scope.reset.email", $scope.reset.email);
        if ($scope.reset.email) {
            console.log("$scope.reset.email", $scope.reset.email);
            //URL send order,
            $http.post($rootScope.hostAdress + 'reestablishpasswordang', {
                submit: true,
                email: $scope.reset.email,
            }).success(function(data) {
                $scope.successWindow = true;
                $scope.showAlertForgotPassword()

                // $timeout close attention window automatically within 3.500 second
                $timeout(function() {
                    $scope.successWindow = false;
                    $scope.reset.email = null;
                }, 3500);
                //success post request
            }).error(function(data) {
                //error
            });

            $timeout(function() {
                $scope.closeForgot();
            }, 1000);
        };
    };

    $scope.logOut = function() {
        $http.get($rootScope.hostAdress + 'logoutang/' + $rootScope.userData.user_auth_token);
        window.localStorage['userData'] = null;
        window.localStorage['userPassword'] = null;

        $rootScope.userData = JSON.parse(window.localStorage['userData']);
        console.log("mainCtrl --- logOut --- $rootScope.userData", $rootScope.userData);
        $scope.userPassword = JSON.parse(window.localStorage['userPassword']);
        console.log("mainCtrl --- logOut --- $scope.userPassword", $scope.userPassword);
        $scope.userName = "Гость";
        $scope.menuEnterString = false;
        $location.path('#/app/main');
        $window.location.reload();
    };

    $scope.doEditUserData = function(editToggleName, editToggleEmail, editTogglePassword) {
        /*console.log("1-$scope.editToggleName", editToggleName);
        console.log("2-$scope.edit.name", $scope.edit.name);
        console.log("3-$scope.editToggleEmail", editToggleEmail);
        console.log("4-$scope.edit.email", $scope.edit.email);*/

        /*if ($scope.edit.password == $scope.edit.confirmPassword) {
            console.log("$scope.edit.password == $scope.edit.confirmPassword", $scope.edit.password == $scope.edit.confirmPassword);
            };*/

        /*if (editToggleName && $scope.edit.name) {
            $scope.editName = $scope.edit.name;
            console.log("$scope.editName", $scope.editName);
        };

        if (editToggleEmail && $scope.edit.email) {
            $scope.editEmail = $scope.edit.email;
            console.log("$scope.editEmail", $scope.editEmail);
        };*/
        console.log("mainCtrl --- function doEditUserData");

        if (editTogglePassword && $scope.edit.oldPassword && $scope.edit.password) {
            if ($scope.edit.oldPassword != $scope.userPassword) {
                $scope.showAlertEditPasswordOld();
            } else if ($scope.edit.password == $scope.edit.confirmPassword) {
                console.log("mainCtrl --- doEditUserData --- $rootScope.userData.user_auth_token", $rootScope.userData.user_auth_token);
                console.log("mainCtrl --- doEditUserData --- $scope.edit.password", $scope.edit.password);
                console.log("mainCtrl --- doEditUserData --- $scope.edit.confirmPassword", $scope.edit.confirmPassword);

                //URL send order,
                $http.post($rootScope.hostAdress + 'changepasswordang/' + $rootScope.userData.user_auth_token, {
                    submit: true,
                    //name: $scope.editName,
                    //email: $scope.editEmail,
                    password: $scope.userPassword,
                    newpassword: $scope.edit.password,
                    passwordis: $scope.edit.confirmPassword
                }).success(function(data) {
                    console.log("mainCtrl --- doEditUserData --- success(function(data)", data);
                    //success post request
                    $scope.showAlertEditPasswordSaccess();

                    $scope.edit.oldPassword = null;
                    $scope.edit.password = null;
                    $scope.edit.confirmPassword = null;

                    //$scope.successWindow = true;

                    // $timeout close attention window automatically within 3.500 second
                    /*$timeout(function() {
                        $scope.successWindow = false;
                    }, 3500);*/

                }).error(function(data) {
                    //error
                });

            }
        } else if ($scope.edit.oldPassword == null || $scope.edit.password == null || $scope.edit.confirmPassword == null) {
            $scope.showAlertEditPasswords();
        };
    };

    $scope.showAlertLogin = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Внимание!',
            template: 'Заполните пустые поля.'
        });
    };

    $scope.showAlertLoginWelcom = function() {
        var userName = $rootScope.userData.user_name;
        var alertPopup = $ionicPopup.alert({
            title: 'Привет, ' + userName,
            template: 'Рады видеть Вас в нашем приложении!'
        });
    };

    $scope.showAlertForgotPassword = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Изменение пароля!',
            template: 'Перейдите по ссылке полученной на ваш email!'
        });
    };

    $scope.showAlertRegister = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Внимание!',
            template: 'Заполните все поля со звёздочкой.'
        });
    };

    $scope.showAlertLogin = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Ошибка!',
            template: 'Не верный Email или пароль.'
        });
    };

    $scope.showAlertRegisterUserWelcom = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Регистрация прошла успешно!',
            template: $scope.register.name + ', авторизируйтесь в приложении.'
        });
    };

    $scope.showAlertEditPassword = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Ошибка!',
            template: 'Новыу пароли не совпадают.'
        });
    };

    $scope.showAlertEditPasswordSaccess = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Поздравляем!',
            template: 'Ваш пароль изменён.'
        });
    };

    $scope.showAlertEditPasswordOld = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Ошибка!',
            template: 'Вы ввели неверный текущий пароль.'
        });
    };

    $scope.showAlertEditPasswords = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Ошибка!',
            template: 'Заполните корректно все поля с паролями.'
        });
    };

    $scope.showAlertIsOffline = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Нет подключения к сети!',
            template: 'Для корректной работы приложения включите Wifi или моб. интернет.'
        });
    };

    $scope.showConfirmExit = function() {
        var userName = $rootScope.userData.user_name;
        var confirmPopup = $ionicPopup.confirm({
            title: 'Выход из приложения',
            template: userName + ', Вы уверены, что хотите выйти?'
        });
        confirmPopup.then(function(res) {
            if (res) {
                console.log('You are sure');
                $scope.logOut();
            } else {
                console.log('You are not sure');
            }
        });
    };


    // Set the default value of inputType
    $scope.inputLogin = 'password';

    // Hide & show password function
    $scope.hideShowPasswordLogin = function() {
        if ($scope.inputLogin == 'password')
            $scope.inputLogin = 'text';
        else
            $scope.inputLogin = 'password';
    };

    // Set the default value of inputType
    $scope.inputRegisterP = 'password';
    $scope.inputEditPOld = 'password';


    // Hide & show password function
    $scope.hideShowPasswordEditOld = function() {
        if ($scope.inputEditPOld == 'password')
            $scope.inputEditPOld = 'text';
        else
            $scope.inputEditPOld = 'password';
    };

    // Hide & show password function
    $scope.hideShowPasswordRegister = function() {
        if ($scope.inputRegisterP == 'password')
            $scope.inputRegisterP = 'text';
        else
            $scope.inputRegisterP = 'password';
    };

    // Set the default value of inputType
    $scope.inputRegisterC = 'password';

    // Hide & show password function
    $scope.hideShowPasswordRegisterConfirm = function() {
        if ($scope.inputRegisterC == 'password')
            $scope.inputRegisterC = 'text';
        else
            $scope.inputRegisterC = 'password';
    };

    //ComparingPasswords
    $scope.registerComparingPasswords = function() {
        if ($scope.register.password.length == $scope.register.confirmPassword.length) {
            if ($scope.register.password == $scope.register.confirmPassword) {
                $scope.notEqual = false;
            } else {
                $scope.notEqual = true;
            }
        } else {
            $scope.notEqual = true;
        }
    };

    $scope.editComparingPasswords = function() {
        if ($scope.edit.password.length == $scope.edit.confirmPassword.length) {
            if ($scope.edit.password == $scope.edit.confirmPassword) {
                $scope.notEqual = false;
            } else {
                $scope.notEqual = true;
            }
        } else {
            $scope.notEqual = true;
        }
    };
  
});