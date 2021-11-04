<?php
    session_start(); //must be the first thing on every page

    //set lifespan of the session
    @ini_set('session.gc_maxlifetime', 28800);
    
    require $_SERVER['DOCUMENT_ROOT']."/GRIZZLY/includes/dataConnection.php";
    $data = new dataConnection;

    //PROCESS INDEX
    $page = $data->processURI();
    // Header file
    require $_SERVER['DOCUMENT_ROOT']."/GRIZZLY/includes/headers.php";

?>