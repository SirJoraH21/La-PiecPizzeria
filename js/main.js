let app = angular.module('app', ['ui.router']);
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    //admin route
    .state('admin', {
        url:'/admin',
        templateUrl: 'views/admin_view/admin.html',
        controller: 'adminCtrl',
        controllerAs: 'admin'
    })
    //category in admin route
    .state('admin.category', {
        url:'/category',
        templateUrl: 'views/admin_view/category.html',
        controller: 'categoryCtrl',
        controllerAs: 'category'
    })
    //products in admin route
    .state('admin.products', {
        url:'/products',
        templateUrl: 'views/admin_view/products.html',
        controller: 'productsCtrl',
        controllerAs: 'products'
    })
    //orders in admin route
    .state('admin.orders', {
        url:'/orders',
        templateUrl: 'views/admin_view/orders.html',
        controller: 'ordersCtrl',
        controllerAs: 'orders'
    })
    .state('admin.sales', {
        url:'/sales',
        templateUrl: 'views/admin_view/sales.html',
        controller: 'salesCtrl',
        controllerAs: 'sales'
    })

    //home page
    .state('home', {
        url:'/home',
        templateUrl: 'views/templates/main.html',
        controller: 'homeCtrl',
        controllerAs: 'home'
    })
    .state('home.main', {
        url:'/main',
        templateUrl: 'views/templates/home_main.html',
        controller: 'mainCtrl',
        controllerAs: 'main'
    })
    .state('home.pizza', {
        url:'/pizza',
        templateUrl: 'views/templates/home_pizza.html',
        controller: 'pizzaCtrl',
        controllerAs: 'pizza'
    })
    .state('home.sushi', {
        url:'/sushi',
        templateUrl: 'views/templates/home_sushi.html',
        controller: 'sushiCtrl',
        controllerAs: 'sushi'
    })
    .state('home.drinks', {
        url:'/drinks',
        templateUrl: 'views/templates/home_drinks.html',
        controller: 'drinksCtrl',
        controllerAs: 'drinks'
    })
    .state('home.about', {
        url:'/about',
        templateUrl: 'views/templates/home_about.html',
        controller: 'aboutCtrl',
        controllerAs: 'about'
    })
    .state('home.sale', {
        url:'/sale',
        templateUrl: 'views/templates/home_sale.html',
        controller: 'saleCtrl',
        controllerAs: 'sale'
    })
    .state('home.order', {
        url:'/order',
        templateUrl: 'views/templates/home_order.html',
        controller: 'orderCtrl',
        controllerAs: 'order'
    })
    $urlRouterProvider.otherwise('/home/main');
})
app.controller('myCtrl', function(){
    let vm = this;
})
app.controller('adminCtrl', function(){
    let vm = this;
})
app.controller('categoryCtrl', function(globalCateg){
    let vm = this;
    vm.categories = globalCateg.getCategories();
    vm.currentCategory = {};
    vm.addCategory = function(){
        if(!vm.currentCategory.id){
            let id = globalCateg.getCategoryId();
            vm.currentCategory.id = id++;
            globalCateg.setCategoryId(id);
            vm.categories.push(vm.currentCategory)
        }
        vm.currentCategory = {};
    }
    vm.editCategory = function(category){
        console.log(category);
        vm.currentCategory = category;
    }
    vm.deleteCategory = function(id){
        let index = vm.categories.findIndex(function(category){
            return category.id == id
        });

        vm.categories.splice(index, 1);
    }
})
app.controller('productsCtrl', function(global, globalCateg){
    let vm = this;
//    vm.items = [
//        {
//            id: 1,
//            category:{
//                id:1,
//                name: 'Pizza'
//            },
//            name: 'Margarita',
//            price: 95,
//            description: 'соус томатний, сир моцарелла, помідори',
//            src: 'margaryta.jpg'
//        },
//        {
//            id: 2,
//            category:{
//                id:1,
//                name: 'Pizza'
//            },
//            name: 'Tono',
//            price: 145,
//            description: 'томатний, сир моцарелла, помідори',
//            src: 'margaryta.jpg'
//        },
//        {
//            id: 3,
//            category:{
//                id:1,
//                name: 'Pizza'
//            },
//            name: 'Polo',
//            price: 118,
//            description: 'соус томатний, сир моцарелла, помідори',
//            src: 'margaryta.jpg'
//        }
//    ];
    vm.items = global.getItems();
//    vm.categories = [
//        {
//            id: 1,
//            name:'Pizza'
//        },
//        {
//            id: 2,
//            name:'Sushi'
//        },
//        {
//            id: 3,
//            name:'Salat'
//        },
//        {
//            id: 4,
//            name:'Drink'
//        }
//    ];
    vm.categories = globalCateg.getCategories();
    vm.currentItem = {};
    vm.id = 3;
    vm.addItem = function(){
        if(!vm.currentItem.id){
            let id = global.getItemId();
            vm.currentItem.id = id++;
            global.setItemId(id);
            vm.items.push(vm.currentItem);
            console.log(vm.items)
        }
        vm.currentItem = {};
    }
    vm.editItem = function(item){
        console.log(item);
        vm.currentItem = item;
    }
    vm.removeItem = function(id){
//        let index = vm.items.findIndex(item => item.id == id);
        let index = vm.items.findIndex(function(item){
            return item.id == id
        });

        vm.items.splice(index, 1);
    }
    vm.propertyName = 'id';
    vm.reverse = false;
    vm.sortBy = function(pName){
        vm.reverse = (vm.propertyName === pName) ? !vm.reverse : true;
        vm.propertyName = pName;
    }
})
app.filter('uah', function(){
    return function(element){
        if(element> 100){
            return element + " \u20B4"
        }
        else{
            return element + ".00" + " \u20B4"
        }

    }
})
app.directive("selectNgFiles", function() {
    return {
        require: "ngModel",
        link: function (scope,elem,attrs,ngModel) {
            elem.on("change", function(e) {
                let files = elem[0].files;
                ngModel.$setViewValue(files);
                console.log(files)
            })
        }
    }
});





















app.controller('ordersCtrl', function(){
    let vm = this;
})
app.controller('salesCtrl', function(saleService){
    let vm = this;
    vm.sales = saleService.getSales();
    vm.currentSale = {};
    vm.addSale = function(){
        if(!vm.currentSale.id){
            let id = saleService.getSaleId()
            vm.currentSale.id = id++;
            saleService.getSaleId(id);
            vm.sales.push(vm.currentSale);
            console.log(vm.currentSale)
        }
        vm.currentSale = {};
    }
})
app.controller('homeCtrl', function(){
    let vm = this;
})
app.controller('saleCtrl', function(){
    let vm = this;
})
app.controller('mainCtrl', function(){
    let vm = this;
})
app.controller('pizzaCtrl', function(global){
    let vm = this;
    vm.products = global.getItems();
    console.log(vm.products);
})
app.controller('sushiCtrl', function(global){
    let vm = this;
    vm.products = global.getItems();
})
app.controller('drinksCtrl', function(global){
    let vm = this;
    vm.products = global.getItems();
})
app.controller('aboutCtrl', function(){
    let vm = this;
})
app.controller('orderCtrl', function(){
    let vm = this;
})
app.directive('homeHeader', function () {
    return {
        restrict:'AE',
        templateUrl:'../../../views/directives/header.html',
        link: function (scope, element, attr) {
            
        }
    }
})
app.directive('homeFooter', function () {
    return {
        restrict:'AE',
        templateUrl:'../../../views/directives/footer.html',
        link: function (scope, element, attr) {

        }
    }
})

app.factory('globalCateg', function(){

    let _categories = [];
    let _categoryId = 1;

    return {
        getCategories: function(){
            return _categories;
        },
        getCategoryId: function(){
            return _categoryId;
        },
        setCategoryId: function(categoryId){
            if(categoryId<_categoryId) alert('error')
            else _categoryId = categoryId;
        }
    }
})
app.factory('global', function(){

    let _items = [];
    let _itemId = 1;

    return {
        getItems: function(){
            return _items;
        },
        getItemId: function(){
            return _itemId;
        },
        setItemId: function(itemId){
            if(itemId<_itemId) alert('error')
            else _itemId = itemId;
        }
    }
})
app.factory('saleService', function(){

    let _sales = [];
    let _saleId = 1;

    return {
        getSales: function(){
            return _sales;
        },
        getSaleId: function(){
            return _saleId;
        },
        setSaleId: function(saleId){
            if(saleId<_saleId) alert('error')
            else _saleId = saleId;
        }
    }
})
