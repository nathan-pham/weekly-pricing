import "https://cdn.jsdelivr.net/npm/ionicons/dist/ionicons/ionicons.esm.js"
import { jsh } from "https://esm.sh/stateful-components"
import { gsap, Expo } from "https://esm.sh/gsap"

const buttons = [...document.querySelectorAll(".action")]
const app = document.getElementById("app")

let pending = false

for(const button of buttons) {
    button.addEventListener("click", async () => {
        if(!pending) {
            const element = payment()

            app.appendChild(element)
            animate(element)

            pending = true
        }
    })
}

const animate = (element) => {
    const progress = element.querySelector(".progress")

    gsap.from(element, {
        duration: 1,
        opacity: 0,
        y: "10rem",
        ease: Expo.easeInOut
    })

    const timeline = gsap.timeline({ delay: progress ? 0.5 : 4 })

    if(progress) {
        timeline.from(progress, {
            duration: 6,
            width: 0,
            delay: 1,
            ease: Expo.easeOut
        })
    }

    timeline.to(element, {
        duration: 1,
        opacity: 0,
        y: "10rem",
        ease: Expo.easeInOut,
        onComplete: () => {
            element.remove()

            if(progress) {
                const celement = complete()
                app.appendChild(celement)
                animate(celement)
            } else {
                pending = false
            }
        }
    })
}

const payment = () => {
    const { div, h1, p } = jsh
    const icon = jsh.wrap("ion-icon")

    return (
        div({ class: "payment" },
            icon({ name: "card-outline" }),
            h1({}, "Please wait"),
            p({}, "We're receiving your payment."),
            div({ class: "payment_progress" },
                div({ class: "progress" })
            )
        )
    )
}

const complete = () => {
    const { div, h1, p } = jsh
    const icon = jsh.wrap("ion-icon")

    return (
        div({ class: "payment" },
            icon({ name: "card-outline" }),
            h1({}, "Success!"),
            p({}, "Payment received!")
        )
    )
}
