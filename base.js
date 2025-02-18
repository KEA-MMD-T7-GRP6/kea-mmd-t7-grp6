// lytter efter at HTML-dokumentet er indlæst
document.addEventListener("DOMContentLoaded", function () {
  // finder elementet og gemmer i variabel
  const burger = document.querySelector(".burger");
  const overlay = document.getElementById("myNav");
  const closeBtn = document.querySelector(".closebtn");

  // tilføjer klik
  burger.addEventListener("click", function () {
    // skifter class til change
    burger.classList.toggle("change");
    overlay.style.width = overlay.style.width === "100%" ? "0" : "100%";
  });

  closeBtn.addEventListener("click", function () {
    overlay.style.width = "0";
    burger.classList.remove("change"); // Fjern farveændring, når menuen lukkes
  });
});
