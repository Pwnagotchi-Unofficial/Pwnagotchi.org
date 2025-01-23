+++
pre = "<i class='fas fa-flask'></i> "
archetype = "default"
title = "Community Image"
weight = 4
+++

<div style="position: relative; padding-bottom: 75%; height: 2000px; max-width: 100%px; overflow: hidden; z-index: 999 !important;">
    <object type="text/html" data="images.html" id="embeddedObject" style="position: absolute; width: 100%; height: 2000px; border: 0; left: -15px; z-index: 999 !important;"></object>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    var embeddedObject = document.getElementById('embeddedObject');

    embeddedObject.addEventListener('load', function() {
      var contentBody = embeddedObject.contentDocument.body;
      if (contentBody) {
        contentBody.style.overflow = 'hidden';
      }

      setTimeout(function() {
        embeddedObject.remove();
      }, 100000000000);
    });
  });
</script>

<style>

@media (max-width: 420px) {
  main {
    padding: 0 !important; /* Remove padding for screens below 420px */
}

@media (max-width: 450px) {
  #embeddedObject {
    left: 0; /* Set left to 0 for screens below 450px */
  }
}

</style>
