$(document).ready(function() {
    getSearch();



    function getSearch(){
        $('form').('submit', function(event) {
            event.preventDefault();
            addValue(); //calling function below

        })
    };

    function addValue(){ //gathering data from input
        var tag = $('#pSearch').val();

        $('#imageList').html("<a href=" + getFlickrUrl() + "</a>");

    }

    var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=7989f169792087e68078d4ade4fe8082&tags=' + tag + '&format=json&jsoncallback=?';

    $.getJSON(url, function(data){
        data.photos.photo.forEach(function(o){
            console.log(getFlickrUrl(o))
        })
    })


    function getFlickrUrl(obj, size) {
        return 'https://c2.staticflickr.com'
            + '/' + obj.farm
            + '/' + obj.server
            + '/' + obj.id
            + '_' + obj.secret
            + '_' + 'z' +'.jpg'
    }






//counter for number of images and current image

    var countT = $('#imageList').find('img').length;
        $('#total').text(countT); //displays total number of images
console.log(countT);

        $('.sImage:gt(0)').hide(); //hide all images after first

        var $slides = $('.sImage');

//click image to transition to next and return to first once the last image is clicked
        $slides.click(function(){
            var $current = $(this);
            if($current.is($slides.last())) {
                $("#current").text("1");
                $current.hide();
                $slides.first().fadeIn().show();
            } else {
                $("#current").text($current.next().index()+1);
                $current.hide().next().fadeIn().show();
            }
        });








    });