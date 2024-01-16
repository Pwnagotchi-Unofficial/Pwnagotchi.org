+++
pre = "<i class='fas fa-globe'></i> "
archetype = "default"
title = "opwngrid"
weight = 7
+++


<div style="position: relative; padding-bottom: 75%; height: 2000px; max-width: 100%; overflow: hidden;">
    <iframe src="https://opwngrid.xyz/" id="embeddedIframe" style="position: absolute; width: 100%; height: 2000px; border: 0;"></iframe>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    var embeddedIframe = document.getElementById('embeddedIframe');

    embeddedIframe.addEventListener('load', function() {
      var contentBody = embeddedIframe.contentDocument.body;
      if (contentBody) {
        contentBody.style.overflow = 'hidden';
      }

      setTimeout(function() {
        embeddedIframe.remove();
      }, 100000000000);
    });
  });
</script>