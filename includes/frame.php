<?php
# MICHAEL PORTER
# 10.14.2021

# Frame Template
?>
<!-- NAVIGATION -->
<div id="navigation"></div>

<!-- MAIN -->
<main id="page" class="bodyContent">
    <?php include('content/' . $page . '.php'); ?>
</main>

<!-- FOOTER -->
<div id="footer"></div>

<script>
    $(document).ready(function() {
        new footer({container: $(`#footer`)}).html;
        new navigation({container: $(`#navigation`)}).html;
    });
</script>