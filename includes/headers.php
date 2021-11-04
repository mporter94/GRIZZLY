<!doctype html>
<html lang="en">
    <head>
        <!-- Required meta tag checks if JavaScript is enabled, if not, shows error page -->
        <noscript> <META HTTP-EQUIV="Refresh" CONTENT="0;URL=/Error_Page.html"> </noscript>

        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="csrf-token" content="<?php echo 'FAKECSRFTOKEN'; ?>">

        <!-- NEED SET META TAGS FROM SESSION VARIABLES BASED ON PAGE?? -->
        <!-- Social Media Meta Tags -->
        <meta name="title" property="og:title" content="Go | Overland Missions | Christian Missions">
        <meta name="description" property="og:description" content="Short term missions, missions training, career missionaries.">
        <meta name="image" property="og:image" content="https:/go.overlandmissions.com/images/default_exp_header.jpg">
        <meta name="url" property="og:url" content="https://go.overlandmissions.com">
        <meta name="twittercard" name="twitter:card" content="Missions">

        <!--  Non-Essential, But Recommended -->
        <meta name="site_name" property="og:site_name" content="Overland Missions">
        <meta name="twitter:image:alt" content="Expeditions Boat">

        <!-- Set the favicon -->
        <link rel="icon" href="/images/favicon.png">

        <!-- Bootstrap CSS -->
        <!-- OUTDATED <link id="bootstrap-stylesheet" rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">-->
        <link id="bootstrap-stylesheet" rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">

        <!-- jQuery-ui CSS -->
        <!-- OUTDATED <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css">-->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css" integrity="sha512-aOG0c6nPNzGk+5zjwyJaoRUgCdOrfSDhmMID2u4+OIslr0GjpLKo7Xm0Ao3xmpM4T8AmIouRkqwj1nrdVsLKEQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />

        <!-- JQuery-ui CSS Time Picker Add on -->
        <!-- OUTDATED <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-ui-timepicker-addon/1.6.3/jquery-ui-timepicker-addon.min.css"> -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-ui-timepicker-addon/1.6.3/jquery-ui-timepicker-addon.min.css" integrity="sha512-LT9fy1J8pE4Cy6ijbg96UkExgOjCqcxAC7xsnv+mLJxSvftGVmmc236jlPTZXPcBRQcVOWoK1IJhb1dAjtb4lQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />

        <!-- DataTables CSS -->
        <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/jszip-2.5.0/dt-1.10.18/b-1.5.2/b-colvis-1.5.2/b-flash-1.5.2/b-html5-1.5.2/b-print-1.5.2/datatables.min.css"/>

        <!-- Google Font Desired Montserrat, Noto Serif, Roboto -->
        <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Noto+Serif&family=Roboto&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Abhaya+Libre&display=swap" rel="stylesheet">

        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200&display=swap" rel="stylesheet">

        <!-- GOOGLE ICONS CDN -->
        <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet">

        <!-- Flickity CSS CDN -->
        <!-- OUTDATED <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flickity/2.2.1/flickity.min.css"> -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flickity/2.2.2/flickity.min.css" integrity="sha512-BiFZ6oflftBIwm6lYCQtQ5DIRQ6tm02svznor2GYQOfAlT3pnVJ10xCrU3XuXnUrWQ4EG8GKxntXnYEdKY0Ugg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

        <!-- CDN For Font Awesome Icons AND Font Awesome Solid.css -->
        <!-- OUTDATED <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/solid.css">-->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/solid.min.css" integrity="sha512-jQqzj2vHVxA/yCojT8pVZjKGOe9UmoYvnOuM/2sQ110vxiajBU+4WkyRs1ODMmd4AfntwUEV4J+VfM6DkfjLRg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

        <!-- THESE CDNS DON'T CACHE AS WELL AS CDNJS.CLOUDFARE
        <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>-->

        <!-- jQuery, then jQuery-ui, then Popper.js, then Bootstrap JS -->
        <!-- OUTDATED <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script> -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <!-- OUTDATED <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>-->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" integrity="sha512-uto9mlQzrs59VwILcLiRYeLKPPbS/bT71da/OEBYEwcdNUk8jYIy+D176RYoop1Da+f9mvkYrmj5MCLZWEtQuA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <!-- OUTDATED <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"></script>-->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.9.2/umd/popper.min.js" integrity="sha512-2rNj2KJ+D8s1ceNasTIex6z4HWyOnEYLVC3FigGOmyQCZc2eBXKgOxQmo3oKLHyfcj53uz4QMsRCWNbLd32Q1g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <!-- OUTDATED <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.min.js" integrity="sha384-j0CNLUeiqtyaRmlzUHCPZ+Gy5fQu0dQ6eZ/xAww941Ai1SxSY+0EQqNXNE6DZiVc" crossorigin="anonymous"></script>

        <!-- JQuery-ui Time Picker Add On -->
        <!-- OUTDATED <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-ui-timepicker-addon/1.6.3/jquery-ui-timepicker-addon.min.js"></script> -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-ui-timepicker-addon/1.6.3/jquery-ui-timepicker-addon.min.js" integrity="sha512-s5u/JBtkPg+Ff2WEr49/cJsod95UgLHbC00N/GglqdQuLnYhALncz8ZHiW/LxDRGduijLKzeYb7Aal9h3codZA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <!-- DataTables JS to enable print to PDF and save to Excel and datetime formating  -->
        <!-- OUTDATED <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.4/moment.min.js"></script>-->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js" integrity="sha512-qTXRIMyZIFb8iQcfjXWCO8+M5Tbc38Qi5WzdPOYZHIlZpzBHG3L3by84BBBOiRGiEb7KKtAOAs5qYdUiZiQNNQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <!-- OUTDATED <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"></script> -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.71/pdfmake.min.js" integrity="sha512-q+jWnBtVH327w/3nlp2Th9Dtjmlfj3Mb4tXCGbYjYWUqtFyIhl1Ul8GXoMkzbWvdIRVlS0P1pyteYUzxArKYOg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <!-- OUTDATED <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"></script> -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.71/vfs_fonts.min.js" integrity="sha512-BDZ+kFMtxV2ljEa7OWUu0wuay/PAsJ2yeRsBegaSgdUhqIno33xmD9v3m+a2M3Bdn5xbtJtsJ9sSULmNBjCgYw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script type="text/javascript" src="https://cdn.datatables.net/v/bs4/jszip-2.5.0/dt-1.10.18/b-1.5.2/b-colvis-1.5.2/b-flash-1.5.2/b-html5-1.5.2/b-print-1.5.2/cr-1.5.0/r-2.2.2/datatables.min.js"></script>
        <script type="text/javascript" src="https:///cdn.datatables.net/plug-ins/1.10.19/sorting/datetime-moment.js"></script>

        <!-- Html2Canvas JS to screenshot downloads  -->
        <!-- OUTDATED <script  type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>-->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js" integrity="sha512-s/XK4vYVXTGeUSv4bRPOuxSDmDlTedEpMEcAQk0t/FMd9V6ft8iXdwSBxV0eD60c6w/tjotSlKu9J2AAW1ckTA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <!-- Flickity JavaScript CDN -->
        <!-- OUTDATED <script src="https://cdnjs.cloudflare.com/ajax/libs/flickity/2.2.1/flickity.pkgd.min.js"></script> -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flickity/2.2.2/flickity.pkgd.min.js" integrity="sha512-cA8gcgtYJ+JYqUe+j2JXl6J3jbamcMQfPe0JOmQGDescd+zqXwwgneDzniOd3k8PcO7EtTW6jA7L4Bhx03SXoA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <!-- Touch Punch Allow Touch Actions on jQuery-UI -->
        <!-- OUTDATED <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"></script> -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js" integrity="sha512-0bEtK0USNd96MnO4XhH8jhv3nyRF0eK87pJke6pkYf3cM0uDIhNJy9ltuzqgypoIFXw3JSuiy04tVk4AjpZdZw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <!-- CDN FOR CHART.JS -->
        <!-- OUTDATED <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0/dist/Chart.min.js"></script> -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.2.0/chart.min.js" integrity="sha512-VMsZqo0ar06BMtg0tPsdgRADvl0kDHpTbugCBBrL55KmucH6hP9zWdLIWY//OTfMnzz6xWQRxQqsUFefwHuHyg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <!-- CDN FOR EXIF -->
        <!-- OUTDATED <script src="https://cdnjs.cloudflare.com/ajax/libs/exif-js/2.3.0/exif.min.js"></script>-->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/exif-js/2.3.0/exif.min.js" integrity="sha512-xsoiisGNT6Dw2Le1Cocn5305Uje1pOYeSzrpO3RD9K+JTpVH9KqSXksXqur8cobTEKJcFz0COYq4723mzo88/Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

        <!-- CDN FOR ACCEPT.js -->
        <script type="text/javascript" src="https://jstest.authorize.net/v1/Accept.js" charset="utf-8"></script>

        <!-- CDN FOR MAPBOX --> 
        <script src='https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.js'></script>
        <link href='https://api.mapbox.com/mapbox-gl-js/v1.10.0/mapbox-gl.css' rel='stylesheet' />

        <!-- JS SCRIPTS --> 
        <script type="text/javascript" src="/GRIZZLY/scripts/navigation.js"></script>
        <script type="text/javascript" src="/GRIZZLY/scripts/generic.js"></script>

        <script type="text/javascript" src="/GRIZZLY/scripts/index.js"></script>


        <!-- CUSTOM CSS -->
        <link href="/GRIZZLY/style.css" rel="stylesheet">

        <title>GRIZZLY RAFTING</title>
    </head>
    <body>
        <?php 
            include('frame.php'); 
        ?>
    </body>
</html>