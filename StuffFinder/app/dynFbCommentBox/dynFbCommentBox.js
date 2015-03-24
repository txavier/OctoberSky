app.directive('dynFbCommentBox', function () {
    function createHTML(href, numposts, colorscheme, width) {
        return '<div class="fb-comments" ' +
                       'data-href="' + href + '" ' +
                       'data-numposts="' + numposts + '" ' +
                       'data-colorsheme="' + colorscheme + '" ' +
                       'data-width="' + width + '">' +
               '</div>';
    }


    return {
        restrict: 'A',
        scope: {},
        link: function postLink(scope, elem, attrs) {
            attrs.$observe('pageHref', function (newValue) {
                var href = window.location.origin + '/' + newValue;
                var numposts = attrs.numposts || 5;
                var colorscheme = attrs.colorscheme || 'light';
                var width = attrs.width || '100%';
                elem.html(createHTML(href, numposts, colorscheme, width));
                // Commented the below line out because 'FB' doesnt exist.
                // This line was probably meant for XFBML comment tag use.
                //FB.XFBML.parse(elem[0]);
                //if (FB) {
                //    FB.XFBML.parse();
                //}
            });
        }
    };
});