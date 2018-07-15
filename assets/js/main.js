var app = angular.module('stationary_kingdom',['ngRoute','ngCookies']);
const baseurl = 'http://digitalbusinesworld.in/webservice/stationarykingdom/';
app.config(function($routeProvider){
    $routeProvider.when('/', {templateUrl: 'views/home.html', controller: 'products', title: 'Stationary Kingdom' })
    .when('/cart', { templateUrl: 'views/cart.html', controller: 'cart', title: 'Cart' })
    .when('/wishlist',{ templateUrl: 'views/wishlist.html', controller: 'root', title: 'Wishlist' })
    .when('/detail',{ templateUrl: 'views/detail.html', controller: 'productdetail', title:'Product Detail' })
    .when('/profile',{ templateUrl: 'views/profile.html', controller: 'profile', title: 'Profile' })
    .when('/checkout',{ templateUrl: 'views/checkout.html', controller: 'checkout', title: 'Checkout' })
    .when('/successpayment',{ templateUrl: 'views/successpayment.html', controller: 'successpayment', title: 'Payment Successful :)' })
    .when('/failurepayment',{ templateUrl: 'views/failurepayment.html', controller: 'failurepayment', title: 'Payment Failed' })
    .when('/register',{ templateUrl: 'views/register.html', controller: 'register', title: 'Register' })
    .otherwise({ redirectTo: '/' })
       
});

//function to count how many products are in cart
/*
app.factory('cartcount', ['$http',function(guestid) {
    $http.get(baseurl+"webservice.php?req=countcartproducts&guestid="+guestid)
    .then(function(response){
        $scope.data = response.data;
        console.log($scope.data);
        
    });
}]);*/



app.service('cartservice',function($rootScope,$http) {
    this.loadcartproduct = function(guestid) {
         var data;
        $http.get(baseurl+"webservice.php?req=cartproducts&guestid="+guestid)
        .then(function(response){
            $rootScope.data = response.data;
            console.log($rootScope.data);
            
            $rootScope.getTotal = function(){
                var total = 0;
                for(var i = 0; i < $rootScope.data.products.length; i++){
                    var product = $rootScope.data.products[i];
                    total += (product.price * product.qty);
                }
                return total;
            }
        });
    }
})
.service('category', function($rootScope, $http){
    this.loadcategory = function(){
        var category;
            
        $http.get(baseurl+"webservice.php?req=getcategory")
        .then(function(response){
           console.log(response.data);
            $rootScope.category = response.data;
            
        })
    }
});

app.run(['$rootScope', '$route', function($rootScope, $route, $http) {
    $rootScope.$on('$routeChangeSuccess', function() {
        $rootScope.title = $route.current.title;
    });
    $rootScope.catmenu = function(){
        
        document.getElementById('category_links').style.visibility = 'visible';
    }   
    $rootScope.closecatmenu = function(){
        document.getElementById('category_links').style.visibility = 'hidden';
    }     
}]); 


app.controller("cart", function($scope,$rootScope, $http,$cookieStore, cartservice, category){     
    var guestid = localStorage.getItem('guestid');
    
    
    cartservice.loadcartproduct(guestid);
    category.loadcategory();    
    $scope.qty_incr = function(item, prod_id){
        item.quantity = parseInt(item.quantity) + 1;
        $http.get(baseurl+ "webservice.php?req=quantity&prod_id="+prod_id+"&qty="+item.quantity+"&guestid="+guestid)
        .then(function(res){
            cartservice.loadcartproduct(guestid);
            console.log(res);
        });
    }
    $scope.qty_decr = function(item, prod_id){
        if(item.quantity > 1){
           item.quantity = parseInt(item.quantity) - 1;
        }
        $http.get(baseurl+ "webservice.php?req=quantity&prod_id="+prod_id+"&qty="+item.quantity+"&guestid="+guestid)
        .then(function(res){
            cartservice.loadcartproduct(guestid);
            console.log(res);
        });
        
    }
    $scope.removefromcart = function(prod_id){
        $http.get(baseurl+"webservice.php?req=removefromcart&prod="+prod_id+"&myid="+guestid)
        .then(function(){
            cartservice.loadcartproduct(guestid);
        });
        console.log(prod_id);
    }
    /*
    $scope.updateTotal = function(){
        $scope.total = 0;
        angular.forEach($scope.products, function(product){
           $scope.total += product.quantity*product.price;
       });
    };*/  
})

//fetching products on home page
.controller("products", function($scope, $http, $cookieStore){
    $scope.loading = true;
    //$cookieStore.put('userid','2');
    $http.get(baseurl+"webservice.php?req=getmyip")
    .then(function(res){
        //$scope.identity = res.data; 
        //console.log(res.data.identity[0].myip);
        localStorage.setItem('guestid',res.data.identity[0].myip);
    });
    
    $http.get(baseurl+"webservice.php?req=home_prod&guestid="+localStorage.getItem('guestid'))
    .then(function(response) {
      $scope.data = response.data;
      console.log($scope.data);
      
      $scope.loading = false;  
    });
    
    

    //$scope.cartclass = 'fa fa-cart-plus homecartaddto';
    
    /*
    $scope.addtocart = function(id, classname){
        var guestid=localStorage.getItem('guestid');
        //alert(guestid);
        var el =angular.element(this);
        console.log('class : '+el.attr('class'));
        if(classname == 'fa fa-cart-plus homecartaddto'){
            
            $http.get(baseurl+"webservice.php?req=addtocart&myid="+guestid+'&prod='+id)
            .then(function(res){
                //do with the return number of added items in cart
                console.log(res);
                
                el.removeClass('homecartaddto');
                $scope.cartclass = 'fa fa-cart-plus homecartadded';
                
            });
        } else {       
            $http.get(baseurl+"webservice.php?req=removefromcart&myid="+guestid+'&prod='+id)
            .then(function(res){
                //do with the return number of added items in cart
                console.log(res);
                el.removeClass('homecartadded');
                $scope.cartclass = 'fa fa-cart-plus homecartaddto';
            });   
        }  
    }*/
})

//fetching single products on product details page
.controller("productdetail", function($scope, $http, $location,$cookieStore){
    var guestid = localStorage.getItem('guestid');    
    $http.get(baseurl+"webservice.php?req=prod_detail&prod="+$location.search().prod+"&guestid="+guestid)
    .then(function(response){
        $scope.data = response.data;
        console.log($scope.data);
        //$rootScope.cartcount(guestid);
        $scope.cartclass = $scope.data.product[0].cartbtn_class; 
        $scope.wishclass = "add-to"; 
        $scope.cat_id = $scope.data.product[0].cat_id; 
    
        $http.get(baseurl+"webservice.php?req=related_prod&cat_id="+$scope.cat_id)
        .then(function(res){
            $scope.relatedprod = res.data;
            console.log($scope.relatedprod);
            
        });
    });

    

    $scope.addtocart = function(id, element){

        //alert(guestid);
        if($scope.cartclass == 'add-to'){
            
            $http.get(baseurl+"webservice.php?req=addtocart&myid="+guestid+'&prod='+id)
            .then(function(res){
                //do with the return number of added items in cart
                console.log(res);
                $scope.cartclass = 'added';
            });
        } else {       
            $http.get(baseurl+"webservice.php?req=removefromcart&myid="+guestid+'&prod='+id)
            .then(function(res){
                //do with the return number of added items in cart
                console.log(res);
                $scope.cartclass = 'add-to';
            });   
        }  
    }
})

.controller("checkout", function($scope,$location, $window,$cookieStore){
    $scope.price = $location.search().price;
      
    $scope.paynowithrazor = function(){
        var guestid = localStorage.getItem('guestid');    
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var fullname = document.getElementById('first_name').value+' '+document.getElementById('first_name').value;
        var address = document.getElementById('address1').value+', '+document.getElementById('address2').value+', '+document.getElementById('city').value+', '+document.getElementById('zip').value;

        var options = {
            'description': 'Pay for products',
            'image': 'https://i.imgur.com/3g7nmJC.png',
            'currency': 'INR',
            'key': 'rzp_test_wDnTSTIqc6zMIi',
            'amount': $scope.price,
            'name': 'Stationary Kingdom',
            'prefill': {
              'email': email,
              'contact': phone,
              'name': fullname 
            },
            'handler': function(response){
                console.log('Your payment is successful. Your payment id is '+response.razorpay_payment_id);
                console.log('full response: '+ response);
                $window.location.href = '#!/successpayment?order_id='+response.razorpay_payment_id+'&guestid='+guestid+'&fullname='+fullname+'&email='+email+'&phone='+phone+'&address='+address;
            },
            'modal': {
                'ondismiss': function(){
                    console.log('payment cancel');

                    $window.location.href = '#!/failurepayment';
                }
            },
            'theme': {
              'color': '#F37254'
            }
          };    
          var rzp1 = new Razorpay(options);   
          rzp1.open();
    }

    /*
    paypal.Button.render({
        // Pass in the Braintree SDK
        braintree: braintree,
        // Pass in your Braintree authorization key
        client: {
            sandbox: paypal.request.get('/demo/checkout/api/braintree/client-token/'),
            production: '<insert production auth key>'
        },
        // Set your environment
        env: 'sandbox', // sandbox | production
        // Wait for the PayPal button to be clicked
        payment: function(data, actions) {
            // Make a call to create the payment
            return actions.payment.create({
                payment: {
                    transactions: [
                        {
                            amount: { total: '0.01', currency: 'USD' }
                        }
                    ]
                }
            });
        },

        // Wait for the payment to be authorized by the customer
        onAuthorize: function(data, actions) {
                // Call your server with data.nonce to finalize the payment
                console.log('Braintree nonce:', data.nonce);
                // Get the payment and buyer details
                return actions.payment.get().then(function(payment) {
                    console.log('Payment details:', payment);
                });
            }
        }, '#paypal-button-container');
        */
})

.controller("successpayment", function($scope, $location){
    $scope.orderid = $location.search().order_id;
    $scope.shipping_address = $location.search().address;
})

.controller("failurepayment", function(){

})

.controller("profile", function($scope, $cookieStore, $http, $window, $route){
    $scope.userid = $cookieStore.get('userid');
    $scope.loading = true;
    if($scope.userid!='')
    {
        $http.get(baseurl+"webservice.php?req=profileinfo&userid="+$scope.userid)
        .then(function(res){
            //do with the return number of added items in cart
            $scope.user_name = res.data.user[0].user_name;
            $scope.user_email = res.data.user[0].user_email;
            if(res.data.user[0].user_img!='')
            {
                $scope.user_img = res.data.user[0].user_img;
            } 
            else
            {
                $scope.user_img = 'assets/img/no-profile-img.png';
            }
            $scope.user_addr = res.data.user[0].user_addr;
            $scope.user_city = res.data.user[0].user_city;
            $scope.user_state = res.data.user[0].user_state;
            $scope.user_zip = res.data.user[0].user_zip;  
            $scope.user_mob = res.data.user[0].user_mob;
            $scope.loading = false;
            console.log(res.data.user[0]);
            
        });


        $http.get(baseurl+"webservice.php?req=orderhistory&userid="+$scope.userid)
        .then(function(res){
            $scope.orders = res.data;
            console.log(res.data);
        });
        
        $scope.open_update_window = function(){
            $scope.update_window = true;
        }

        $scope.close_update_window = function(){
            $scope.update_window = false;
        }

        $scope.update_info = function(){
            $scope.updateloader = true;
            var addr = document.getElementById('edit_addr').value;
            var city = document.getElementById('edit_city').value;
            var state = document.getElementById('edit_state').value;
            var zip = document.getElementById('edit_zip').value;
            var mob = document.getElementById('edit_mob').value;

            $http.get(baseurl+"webservice.php?req=updateinfo&userid="+$scope.userid+"&addr="+addr+"&city="+city+"&state="+state+"&zip="+zip+"&mob="+mob)
            .then(function(res){
                console.log(res.data.updatedinfo[0].user_addr);
                $scope.user_addr = res.data.updatedinfo[0].user_addr;
                $scope.user_city = res.data.updatedinfo[0].user_city;
                $scope.user_state = res.data.updatedinfo[0].user_state;
                $scope.user_zip = res.data.updatedinfo[0].user_zip;
                $scope.user_mob = res.data.updatedinfo[0].user_mob;
                $scope.updateloader = false;
                $scope.update_window = false;
                
            })
        }
        $scope.logout = function(){
            //$cookieStore.remove('userid');
            $cookieStore.put('userid','');
            $window.location.href = '#!/';
        }
        
    }
    else
    {
        $scope.login = function(){
            $scope.updateloader = true;
            var username = document.getElementById('user').value;
            var pass = document.getElementById('pass').value;
            
            //console.log('username: '+username+', pass: '+pass);
            $http.get(baseurl+"webservice.php?req=login&username="+username+"&pass="+pass)
            .then(function(res){
                
                if(res.data[0].user_id !=''){
                    $scope.updateloader = false;
                    $cookieStore.put('userid',res.data[0].user_id);
                    $route.reload();
                } else {
                    $scope.updateloader = false;
                    $scope.login_msg = 'Username or Password is incorrect';
                    $scope.msgclass = 'red';
                }
            });
        }
    }
})
.controller("register", function($scope, $http, $cookieStore, $window){
    $scope.userid = $cookieStore.get('userid');
    $scope.checkuser = function(){
        alert('check user');
    }
    $scope.register = function(){
        $scope.updateloader = true;
        var username = document.getElementById('username').value;
        var email = document.getElementById('email').value;
        var mob = document.getElementById('mob').value;
        var pass = document.getElementById('pass').value;
        var repass = document.getElementById('repass').value;

        if( (username!='') && (email!='') && (pass!='') && (repass!='')){
            $http.get(baseurl+"webservice.php?req=register&username="+username+"&email="+email+"&mob="+mob+"&pass="+pass+"&repass="+repass)
            .then(function(res){
                
                console.log(res.data.status);
                if(res.data.status==0)
                {
                    $scope.updateloader = false;
                    $scope.register_msg = res.data.message;
                    $scope.msgclass = 'red';    
                }
                else if(res.data.status==1)
                {
                    $scope.updateloader = false;
                    username = '';
                    email = '';
                    mob = '';
                    pass = '';
                    repass = '';
                    $window.location.href = '#!/profile';
                    $scope.login_msg = res.data.message;
                    $scope.msgclass = 'green';
                } 
                else if(res.data.status==2)
                {
                    $scope.updateloader = false;
                    $scope.register_msg = res.data.message;
                    $scope.msgclass = 'red';
                }
                
            });
        } else {
            $scope.updateloader = false;
            $scope.register_msg = 'please fill all required field';
            
        }
    }
});

