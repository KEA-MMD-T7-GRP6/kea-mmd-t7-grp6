// lytter efter at HTML-dokumentet er indlæst
document.addEventListener("DOMContentLoaded", function () {
  // finder elementet og gemmer i variabel
  const burger = document.querySelector(".burger");
  const overlay = document.getElementById("myNav");

  // tilføjer klik
  burger.addEventListener("click", function () {
    // skifter class til change
    burger.classList.toggle("change");

    // Tjekker om bredde er 100%
    if (overlay.style.width === "100%") {
      // skjuler overlay
      overlay.style.width = "0";
    } else {
      // viser overlay
      overlay.style.width = "100%";
    }
  });

  // lytter til klik til lukkeknappen
  document.querySelector(".closebtn").addEventListener("click", function () {
    overlay.style.width = "0";
  });
});
