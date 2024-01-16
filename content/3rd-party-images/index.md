+++
pre = "<i class='fas fa-flask'></i> "
archetype = "default"
title = "3rd-party images"
weight = 3
+++

<div style="position: relative; padding-bottom: 75%; height: 2000px; max-width: 100%px; overflow: hidden;">
    <object type="text/html" data="images.html" id="embeddedObject" style="position: absolute; width: 100%; height: 2000px; border: 0; left: -15px;"></object>
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