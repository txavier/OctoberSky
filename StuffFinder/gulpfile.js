/// <vs BeforeBuild='default' />
///
// include plug-ins
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var minifyCSS = require('gulp-minify-css');
var copy = require('gulp-copy');
var bower = require('gulp-bower');
var sourcemaps = require('gulp-sourcemaps');

var config = {
    //JavaScript files that will be combined into a jquery bundle
    jquerysrc: [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/jquery-validation/dist/jquery.validate.min.js',
        'bower_components/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js',
        'bower_components/jquery.mb.ytplayer/inc/jquery.mb.YTPlayer.min.js'
    ],
    jquerybundle: 'Scripts/jquery-bundle.min.js',

    //JavaScript files that will be combined into a Bootstrap bundle
    bootstrapsrc: [
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/respond-minmax/dest/respond.min.js'
    ],
    bootstrapbundle: 'Scripts/bootstrap-bundle.min.js',

    //Modernizr
    modernizrsrc: ['bower_components/modernizr/modernizr.js'],
    modernizrbundle: 'Scripts/modernizer.min.js',

    //Facebook theme js (possibly no longer needed)
    facebookthemesrc: ['scripts/scripts.js'],
    facebookthemebundle: 'Scripts/facebook-theme-bundle.min.js',

    //Angular
    angularsrc: [
        'bower_components/angular/angular.min.js',
        'bower_components/angular-resource/angular-resource.min.js',
        'bower_components/angular-route/angular-route.min.js',
        'bower_components/angular-local-storage/dist/angular-local-storage.min.js',
        //'bower_components/angular-loading-bar/build/loading-bar.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-sanitize/angular-sanitize.min.js',
        'bower_components/angular-bootstrap/ui-bootstrap.min.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'bower_components/lodash/dist/lodash.min.js',
        'bower_components/angular-google-maps/dist/angular-google-maps.min.js',
        'bower_components/angular-loading-bar/build/loading-bar.min.js',
        'bower_components/ng-droplet/dist/ng-droplet.min.js',
        'bower_components/progressbar.js/dist/progressbar.min.js',
        'bower_components/nya-bootstrap-select/dist/js/nya-bs-select.min.js',
        'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.min.js',
        'bower_components/textAngular/dist/textAngular-rangy.min.js',
        'bower_components/textAngular/dist/textAngular-sanitize.min.js',
        'bower_components/textAngular/dist/textAngular.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angularjs-toaster/toaster.min.js',
        // No minify section
        'app/stuffFinder-module.js',
        'app/authInterceptor/authInterceptorService.js',
        'app/auth/authService.js',
        'app/services/tokensManagerService.js',
        'app/login/loginController.js',
        'app/associate/associateController.js',
        'app/refresh/refreshController.js',
        'app/tokensManager/tokensManagerController.js',
        'app/signup/signupController.js',
        // End no minify section.
        'app/services/dataService.js',
        'app/services/thingService.js',
        'app/services/votesService.js',
        'app/services/me2Service.js',
        'app/home/homeController.js',
        'app/start/startController.js',
        'app/finding/foundItController.js',
        'app/sidebar/sidebarController.js',
        'app/whereIsIt/whereIsItController.js',
        'app/things/thingController.js',
        'app/admin/jumbotronYoutubeVideoSettingsController.js',
        'app/search/searchController.js',
        'app/things/editThingController.js',
        'app/finding/editFindingController.js',
        'app/finding/foundThingAndLocationController.js',
        'app/feedback/feedbackController.js',
        'app/users/userProfileController.js',
        'app/dynFbCommentBox/dynFbCommentBox.js',
        'shared-directives/shared-directives.js',
        'shared-directives/back-button/back-button.js',
        'shared-directives/ng-enter/ng-enter.js'
    ],
    angularbundle: 'Scripts/angular-bundle.min.js',

    // Angular-Dashboard
    angulardashboardsrc: [
        'bower_components/angular/angular.min.js',
        'bower_components/angular-resource/angular-resource.min.js',
        'bower_components/angular-route/angular-route.min.js',
        'bower_components/angular-local-storage/dist/angular-local-storage.min.js',
        //'bower_components/angular-loading-bar/build/loading-bar.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-sanitize/angular-sanitize.min.js',
        'bower_components/angular-bootstrap/ui-bootstrap.min.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'bower_components/lodash/dist/lodash.min.js',
        'bower_components/angular-google-maps/dist/angular-google-maps.min.js',
        'bower_components/angular-loading-bar/build/loading-bar.min.js',
        'bower_components/ng-droplet/dist/ng-droplet.min.js',
        'bower_components/progressbar.js/dist/progressbar.min.js',
        'bower_components/nya-bootstrap-select/dist/js/nya-bs-select.min.js',
        'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.min.js',
        'bower_components/textAngular/dist/textAngular-rangy.min.js',
        'bower_components/textAngular/dist/textAngular-sanitize.min.js',
        'bower_components/textAngular/dist/textAngular.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angularjs-toaster/toaster.min.js',
        // No minify section
        'app/stuffFinder-module.js',
        'app/authInterceptor/authInterceptorService.js',
        'app/auth/authService.js',
        'app/services/tokensManagerService.js',
        'app/login/loginController.js',
        'app/associate/associateController.js',
        'app/refresh/refreshController.js',
        'app/tokensManager/tokensManagerController.js',
        'app/signup/signupController.js',
        // End no minify section.
        'app/services/dataService.js',
        'app/services/thingService.js',
        'app/services/votesService.js',
        'app/services/me2Service.js',
        'app/home/homeController.js',
        'app/start/startController.js',
        'app/finding/foundItController.js',
        'app/sidebar/sidebarController.js',
        'app/whereIsIt/whereIsItController.js',
        'app/things/thingController.js',
        'app/admin/jumbotronYoutubeVideoSettingsController.js',
        'app/search/searchController.js',
        'app/things/editThingController.js',
        'app/finding/editFindingController.js',

        'app/finding/foundThingAndLocationController.js',
        'app/feedback/feedbackController.js',
        'app/users/userProfileController.js',
        'app/admin/adminController.js',
        // Dashboard specific controllers.
        'app/categories/addOrUpdateCategoryController.js',
        'app/categories/categoriesController.js',
        'app/cities/addOrUpdateCityController.js',
        'app/cities/citiesController.js',
        'app/users/addOrUpdateUserController.js',
        'app/users/usersController.js',
        'app/nationalities/addOrUpdateNationalityController.js',
        'app/nationalities/nationalitiesController.js',
        'app/locations/locationsController.js',
        'app/locations/addOrUpdateLocationController.js',
        'app/newsletter/addOrUpdateNewsletterController.js',
        'app/newsletter/newslettersController.js',
        'app/nationalityNotification/addOrUpdateNationalityNotificationController.js',
        'app/nationalityNotification/nationalityNotificationsController.js',
        'app/cityNotification/cityNotificationsController.js',
        'app/cityNotification/addOrUpdateCityNotificationController.js',
        'app/sidebar/dashboardSidebarController.js',
        // Third party and shared directives.
        'app/dynFbCommentBox/dynFbCommentBox.js',
        'shared-directives/shared-directives.js',
        'shared-directives/back-button/back-button.js',
        'shared-directives/ng-enter/ng-enter.js'
    ],
    angulardashboardbundle: 'Scripts/angular-dashboard-bundle.min.js',

    //Bootstrap CSS and Fonts
    bootstrapcss: 'bower_components/bootstrap/dist/css/bootstrap.css',
    boostrapfonts: 'bower_components/bootstrap/dist/fonts/*',

    // Font Awesome CSS
    //fontawesomecss: 'bower_components/font-awesome/css/font-awesome.min.css',
    //fontawesomefonts: 'bower_components/font-awesome/fonts/*.*',

    // Angular toaster CSS
    toastercss: 'bower_components/angularjs-toaster/toaster.min.css',

    // nya-bs-select CSS
    nyabsselectcss: 'bower_components/nya-bootstrap-select/dist/css/nya-bs-select.min.css',

    // Angular-Loading-Bar CSS
    angularloadingbarcss: 'bower_components/angular-loading-bar/build/loading-bar.min.css',

    // TextAngular CSS
    textangularcss: 'bower_components/textAngular/src/textAngular.css',

    // Social Buttons CSS
    socialbuttonscss: 'Content/social-buttons.css',

    stylescss: 'Content/styles.css',
    sitecss: 'Content/site.css',
    fontsout: 'Content/dist/fonts',
    cssout: 'Content/dist/css'

}

// Synchronously delete the output script file(s)
gulp.task('clean-vendor-scripts', function (cb) {
    del([config.jquerybundle,
              config.bootstrapbundle,
              config.modernizrbundle,
              config.angularbundle,
              config.angulardashboardbundle,
              config.facebookthemebundle], cb);
});

//Create a jquery bundled file
gulp.task('jquery-bundle', ['clean-vendor-scripts', 'bower-restore'], function () {
    return gulp.src(config.jquerysrc)
     .pipe(sourcemaps.init())
     .pipe(concat('jquery-bundle.min.js'))
     .pipe(sourcemaps.write('maps'))
     .pipe(gulp.dest('Scripts'));
});

//Create a bootstrap bundled file
gulp.task('bootstrap-bundle', ['clean-vendor-scripts', 'bower-restore'], function () {
    return gulp.src(config.bootstrapsrc)
     .pipe(sourcemaps.init())
     .pipe(concat('bootstrap-bundle.min.js'))
     .pipe(sourcemaps.write('maps'))
     .pipe(gulp.dest('Scripts'));
});

//Create a modernizr bundled file
gulp.task('modernizer', ['clean-vendor-scripts', 'bower-restore'], function () {
    return gulp.src(config.modernizrsrc)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('modernizer-min.js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('Scripts'));
});

gulp.task('facebook-theme-bundle', ['clean-vendor-scripts', 'bower-restore'], function () {
    return gulp.src(config.facebookthemesrc)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('facebook-theme-bundle.min.js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('Scripts'));
});

//Create an angular bundled file
gulp.task('angular-bundle', ['clean-vendor-scripts', 'bower-restore'], function () {
    return gulp.src(config.angularsrc)
        .pipe(sourcemaps.init())
        //.pipe(uglify())
        .pipe(concat('angular-bundle.min.js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('Scripts'));
});

//Create an angular-dashboard bundled file
gulp.task('angular-dashboard-bundle', ['clean-vendor-scripts', 'bower-restore'], function () {
    return gulp.src(config.angulardashboardsrc)
        .pipe(sourcemaps.init())
        //.pipe(uglify())
        .pipe(concat('angular-dashboard-bundle.min.js'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('Scripts'));
});

// Combine and the vendor files from bower into bundles (output to the Scripts folder)
gulp.task('vendor-scripts', ['jquery-bundle', 'bootstrap-bundle', 'modernizer', 'angular-bundle', 'facebook-theme-bundle',
                                'angular-dashboard-bundle'],
    function () {

});

// Synchronously delete the output style files (css / fonts)
gulp.task('clean-styles', function (cb) {
    del([config.fontsout,
              config.cssout], cb);
});

gulp.task('css', ['clean-styles', 'bower-restore'], function () {
    return gulp.src([
        config.bootstrapcss,
        config.stylescss,
        config.toastercss,
        config.nyabsselectcss,
        config.angularloadingbarcss,
        config.textangularcss,
        config.socialbuttonscss,
        config.sitecss
    ])
     .pipe(concat('app.css'))
     .pipe(gulp.dest(config.cssout))
     .pipe(minifyCSS())
     .pipe(concat('app.min.css'))
     .pipe(gulp.dest(config.cssout));
});

gulp.task('fonts', ['clean-styles', 'bower-restore'], function () {
    return gulp.src(config.boostrapfonts)
     .pipe(gulp.dest(config.fontsout));
});

// Combine and minify css files and output fonts
gulp.task('styles', ['css', 'fonts'], function () {

});

//Restore all bower packages
gulp.task('bower-restore', function () {
    return bower();
});

//Set a default tasks
gulp.task('default', ['vendor-scripts', 'styles'], function () {

});