$(document).ready(function() {



    var tag = '';
    getSearch();


    function getSearch(){
        $('form').on('submit', function(event) {
            event.preventDefault();
            getUrl();

        })
    };

    function addValue(){ //gathering data from input
        var tag = $('#pSearch').val();
            console.log(tag);
        var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=7989f169792087e68078d4ade4fe8082&tags=' + tag + '&per_page=5&page=1&format=json&jsoncallback=?';
            console.log(url);
        return url
    }


    function getUrl(){
        var url = addValue();
        console.log(url);
        $.getJSON(url, function(data){
            data.photos.photo.forEach(function(o){
                console.log(getFlickrUrl(o));
                $('#imageList').append("<img class='sImage' src='" + getFlickrUrl(o) +  "'>");
                getCount();
            })
        })
    }


    function getFlickrUrl(obj) {
        return 'https://c2.staticflickr.com'
            + '/' + obj.farm
            + '/' + obj.server
            + '/' + obj.id
            + '_' + obj.secret
            + '_' + 'z' +'.jpg'
    }

    //counter for number of images and current image

    function getCount(){
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
    }


});