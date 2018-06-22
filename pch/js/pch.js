window.onload = function() {

    const pyramid = document.getElementById("pyro");
    const arrow = document.getElementById('arrow');
    const tip = document.getElementById('tip');
    const copyBlock = document.getElementById('copyBlock');
    const redCopy = document.querySelector('.pch-pyro-copy-red');
    const greenCopy = document.querySelector('.pch-pyro-copy-green');
    const right1 = document.getElementById('right1');
    const right2 = document.getElementById('right2');
    const right3 = document.getElementById('right3');
    const btn = document.getElementById('btn');

    const tl = new TimelineMax();
    tl.to(pyramid, 1, {opacity:1});
    tl.to(arrow, 1, {height:275, ease:Linear.easeNone});
    tl.to(arrow, 0.25, {height:270, ease:Linear.easeNone, yoyo:true, repeat:-1});
    tl.to(tip, 0.25, {opacity:1, ease:Linear.easeNone, yoyo:true, repeat:-1}, '-=0.5');
    tl.to(copyBlock, 0.25, {textShadow:" 0 0 10px #feecc4", color:"#feecc4", ease:Linear.easeNone, yoyo:true, repeat:-1}, '-=0.5');
    tl.to(redCopy, 0.5, {opacity:0});
    tl.to(greenCopy, 0.5, {opacity:1},'-=0.5');
    tl.to(right1, 0.5, {opacity:1});
    tl.to(right2, 0.5, {opacity:1});
    tl.to(right3, 0.5, {opacity:1});
    tl.to(btn, 0.5, {opacity:1, right:15});


}
