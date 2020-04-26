import {TweenMax, TimelineMax, Linear, Quint, Expo, Quart, gsap} from "gsap"
import {CSSPlugin} from "gsap/CSSPlugin";
// import "./DrawSVGPlugin"
gsap.registerPlugin(CSSPlugin);
// gsap.registerPlugin(DrawSVGPlugin);

var firstAnimation = false,
    logoStatus = "",
    nflTransitionTL =  new TimelineMax({ paused: true }),
    nflNflTL =  new TimelineMax({ paused: true }),
    nflGenericTL =  new TimelineMax({ paused: true });

function setNfl() {
    // STROKES
    nflNflTL.staggerFromTo( "#nfl .outline .animate_stroke", 1, { stroke: "#FFFFFF" }, { stroke: "#000000", ease: Linear.easeNone }, 0.1, 0 );
    nflNflTL.staggerFromTo( "#nfl .outline .animate_stroke", 2, { drawSVG: "50% 50%" }, { drawSVG: "0% 100%", ease: Quint.easeInOut }, 0.1, 0 );
    nflNflTL.staggerFromTo( "#nfl .fill .animate_fill", 1, { opacity: 0 }, { opacity: 1, ease: Linear.easeNone }, 0.1, 1.25 );
    nflNflTL.fromTo( "#mask_nfl_shield circle", 2, { attr:{ r: 0 } }, { attr:{ r: 90 }, ease: Expo.easeInOut }, 0.75 );
    nflNflTL.staggerFromTo( "#nfl .outline .animate_star", 1, { stroke: "#FFFFFF" }, { stroke: "#000000", ease: Linear.easeNone }, 0.1, 0 );
    nflNflTL.staggerFromTo( "#nfl .outline .animate_star", 2, { drawSVG: "50% 50%" }, { drawSVG: "0% 100%", ease: Expo.easeInOut }, 0.1, 0 );
    nflNflTL.staggerFromTo( "#nfl .fill .animate_star", 1, { opacity: 0 }, { opacity: 1, ease: Linear.easeNone }, 0.1, 1.25 );
    nflNflTL.staggerTo( "#nfl .outline .animate_stroke", 1.5, { stroke: "#FFFFFF", immediateRender: false, ease: Linear.easeNone }, 0.1, 1.1 );

    nflNflTL.timeScale(1);
    nflNflTL.play(0);
}

function setGeneric(target) {
    // STROKES
    nflGenericTL.staggerFromTo( "#" + target + " .outline .animate_stroke", 1, { stroke: "#FFFFFF" }, { stroke: "#000000", ease: Linear.easeNone }, 0.1, 0 );
    nflGenericTL.staggerFromTo( "#" + target + " .outline .animate_stroke", 2, { drawSVG: "50% 50%" }, { drawSVG: "0% 100%", ease: Expo.easeInOut }, 0.1, 0 );
    nflGenericTL.staggerFromTo( "#" + target + " .fill .animate_fill", 1, { opacity: 0 }, { opacity: 1, ease: Linear.easeNone }, 0.1, 1.25 );
    nflGenericTL.staggerTo( "#" + target + " .outline .animate_stroke", 1.5, { stroke: "#FFFFFF", immediateRender: false, ease: Linear.easeNone }, 0.1, 1.1 );
    nflGenericTL.timeScale(1);
    nflGenericTL.play(0);
}

var nflLogosIntro =  new TimelineMax({ paused: true, onComplete: function() {
        changeLogo('nfl');
    }});
nflLogosIntro.fromTo( "#ui", 1, { autoAlpha: 0 }, { autoAlpha: 1, display: 'block' }, 0.5 );
nflLogosIntro.staggerFromTo( ".navicon", 1, { y: -100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: Expo.easeOut }, 0.1, 1 );
nflLogosIntro.play(0);

function changeLogo(type) {
    if (type === logoStatus) {
        // ALREADY DOING THE RIGHT THING
        //return;
    }
    resetScene();
    logoStatus = type;

    // $(".navitem").removeClass("activate");
    // $(".navicon").removeClass("activate");
    TweenMax.set( "#"+logoStatus, { display: 'block' });
    // var tempTitle = logoStatus.charAt(0).toUpperCase() + logoStatus.slice(1);
    // $("#nav" + tempTitle ).addClass("activate");

    if (type === "nfl") {
        setNfl();
    } else {
        setGeneric(logoStatus);
    }
    nflTransitionTL.to( "#ui, #morph", 0.5, { scale: 0.8, ease: Quart.easeOut }, 0 );
    nflTransitionTL.fromTo( "#ui, #morph", 2, { scale: 0.8 }, { scale: 1, ease: Quart.easeInOut, immediateRender: false }, 0.5 );
    if (firstAnimation) {
        nflTransitionTL.to( "#morphme", 0.5, { opacity: 1, ease: Linear.easeNone }, 0 );
        nflTransitionTL.fromTo( "#morphme", 0.75, { opacity: 1 }, { opacity: 0, immediateRender: false, ease: Linear.easeNone }, 0.5 );
    } else {
        firstAnimation = true;
    }
    TweenMax.to("#morph_target", 1.25, { morphSVG:"#morph_" + type, ease: Quart.easeOut }, 0 );
    nflTransitionTL.timeScale(1.25);
    nflTransitionTL.play(0);
}

function resetScene() {
    nflTransitionTL.pause(0);
    nflGenericTL.pause(0);
    nflNflTL.pause(0);
    TweenMax.set( ".logo", { display: 'none' });
}

console.log("CORE");
changeLogo('nfl');
// resetScene()