<?php ?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
        <title>Tarot Card App Demo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800,900">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css?v=1.3">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.9/mediaelementplayer.min.css">
        <link rel="stylesheet" href="styles.min.css">
</head>
<body class="">

  <header id="app-header">
    <nav class="navbar navbar-expand-xl navbar-dark bg-primary fixed-top text-uppercase">
      <a class="navbar-brand" href="#/">Tarot App</a>
      <button id="toggle" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-xl-end" id="navbarTogglerDemo03">

      </div>
    </nav>
  </header>
  <div class="">

  </div>
  <div id="app" class="main-wrapper">
    <div class="possible-container mb-5">
      <div class="possible-row">
        <main id="primary" class="main" style=""></main>
        <aside id="secondary" class="container"></aside>
      </div>
    </div>
  </div>
  <aside id="app-callout" class=""></aside>
  <aside id="audio-player" class="">
    <audio id="mr_audio" controls class="mejs__player" title="W3 Schools Horses MP3">
      <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg" title="W3 Schools Horses MP3">
    </audio>
  </aside>
<footer id="app-footer" class="bg-primary"></footer>

  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap.native/2.0.15/bootstrap-native-v4.min.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mediaelement/4.2.9/mediaelement-and-player.min.js"></script>
  <script type="text/javascript" src="app.min.js?v=1.5" charset="utf-8"></script>

</body>
</html>
