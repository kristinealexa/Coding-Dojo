//variables rider must have to ride rollercoaster
var minimumAge = 10
var minimumHeight = 42

// rider must be 42 inches or 10 years old
if (minimumHeight >= 42) {
    console.log("Get on that ride,kiddo!")
} else {
    console.log("Sorry kiddo. Maybe next year.")
}
// rider must have both height and age 
if (minimumHeight >= 42 && minimumAge >= 10) {
    console.log ("Get on that ride, kiddo!")
    } else {
        console.log("Sorry kiddo. Maybe next year.")
    }
// either riders height or age 
if (minimumHeight >= 42 || minimumAge >= 10) {
    console.log("Get on that ride, kiddo!")
} else {
    console.log("Sorry kiddo. Maybe next year.")
}