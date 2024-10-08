// Source : https://www.youtube.com/watch?v=9HcxHDS2w1s&t=724s&ab_channel=WebDevSimplified / https://javascriptsimplified.com/ 
// Selectionne les boutons previous et next 
const buttons = document.querySelectorAll("[data-carousel-button]")

// Fait en sorte que chaque boutton fonctionne pour avancer ou reculer les images
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]")

    const activeSlide = slides.querySelector("[data-active]")
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    if (newIndex < 0) newIndex = slides.children.length - 1
    if (newIndex >= slides.children.length) newIndex = 0

    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active
  })
})

// Configure un autoloop des images du carrousel.
const autoloop = () => {
  const slides = document.querySelector("[data-carousel]").querySelector("[data-slides]")
  const activeSlide = slides.querySelector("[data-active]")

  let newIndex = [...slides.children].indexOf(activeSlide) + 1
    if (newIndex >= slides.children.length) newIndex = 0

    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active
}

// 
setInterval(autoloop, 4000)