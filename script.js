$(document).ready(function() {
  // Add smooth scrolling to all links
  $("a").on("click", function(event) {
    // Check if the link has a hash
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store the hash value
      var hash = this.hash;

      // Use jQuery's animate() method to add smooth page scroll
      $("html, body").animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        // Add hash to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });

  // Animate project card on hover
  $(".project-card").hover(
    function() {
      $(this).animate({
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)"
      }, 300);
    }, 
    function() {
      $(this).animate({
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
      }, 300);
    }
  );
});

document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("radar-chart").getContext("2d");

  new Chart(ctx, {
    type: "radar",
    data: {
      labels: ["TensorFlow", "PyTorch", "JavaScript", "OpenCV", "Matplotlib", "Pandas"],
      datasets: [
        {
          label: "Skills Proficiency",
          data: [10, 9, 8, 9, 9, 8], // Custom skill values
          backgroundColor: "rgba(255, 69, 0, 0.2)",
          borderColor: "#ff4500",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        r: {
          min: 0, // Start the scale at 0
          max: 10, // End the scale at 10
          ticks: {
            display: false, // Hide tick numbers
            stepSize: 1, // Ensure there are 10 points
            showLabelBackdrop: false, // Remove the backdrop behind tick labels
          },
          grid: { color: "#ddd" }, // Customize grid lines
          angleLines: { color: "#bbb" }, // Customize angle lines
        },
      },
      plugins: {
        legend: {
          position: "top", // Place the legend at the top
        },
      },
    },
  });
});

