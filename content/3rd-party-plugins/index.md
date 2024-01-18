+++
pre = "<i class='fas fa-puzzle-piece'></i> "
archetype = "default"
title = "3rd Party Plugins"
weight = 4
+++

<div style="position: relative; padding-bottom: 75%; height: 2000px; max-width: 100%; overflow: hidden;">
    <object type="text/html" data="plugins.html" id="embeddedObject" style="position: absolute; width: 100%; height: 2000px; border: 0; left: -15px;"></object>
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


  // Get the object element by ID
  const embeddedObject = document.getElementById('embeddedObject');
  const alternativeMessage = document.createElement('p');
  alternativeMessage.textContent = "This page is only supported on larger screens. Sorry :-)";
  alternativeMessage.style.display = 'none'; // Initially hide the alternative message

 
  // Function to check screen width and toggle between object and alternative message
  function checkScreenWidth() {
      const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

      if (screenWidth < 520) {
          embeddedObject.style.display = 'none'; // Hide the object on small screens
          alternativeMessage.style.display = 'block'; // Show the alternative message
      } else {
          embeddedObject.style.display = 'block'; // Show the object on larger screens
          alternativeMessage.style.display = 'none'; // Hide the alternative message
      }
  }

  // Insert the alternative message after the embedded object
  embeddedObject.parentNode.insertBefore(alternativeMessage, embeddedObject.nextSibling);

  // Initial check on page load
  checkScreenWidth();

  // Listen for window resize events and update accordingly
 window.addEventListener('resize', checkScreenWidth);

</script>


<style>

  p {
   text-align: center !important;
  }


  @media screen and (max-width: 560px) {
    * {
      padding: 0 !important;
      margin: 0 !important;
    }
  }


</style>




