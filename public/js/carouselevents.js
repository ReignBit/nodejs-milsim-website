let myCarousel = $('#carouselExampleControls');
let titleEl = $('#carousel-title');
let subEl = $('#carousel-sub');

let active = 0;
let captions = [
    {
        title: "Join Today",
        sub: "We want you"
    },
    {
        title: "In the midst of battle",
        sub: "Take a couple of photos to show the family back home"
    },
    {
        title: "Enjoy the shenanigans",
        sub: "With a new group of friends"
    }
]


myCarousel.on('slide.bs.carousel', function () {
    active += 1;
    if (active > captions.length - 1) { active = 0; }
    titleEl.text(captions[active].title);
    subEl.text(captions[active].sub);
})


let status_ = $('#server-status');
status_.text(status_.hasClass("milsim-active") ? "Active Duty" : "On Leave");