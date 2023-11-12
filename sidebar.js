<script>
  // Get references to the button, body element, and overlay div
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const body = document.body;
  const overlay = document.getElementById("overlay");

  // Add a click event listener to the button
  sidebarToggle.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default link behavior

    // Add the "sidebar-hidden" class to the body element
    body.classList.add("sidebar-hidden");
  });

  // Add a click event listener to the overlay div
  overlay.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default link behavior

    // Remove the "sidebar-hidden" class from the body element
    body.classList.remove("sidebar-hidden");
  });
</script>