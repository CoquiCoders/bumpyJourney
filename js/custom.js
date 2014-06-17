var isHovering = false;
var el = $(".elem").mouseover(function(){
    isHovering = true;
    spin();
}).mouseout(function(){
    isHovering = false;
});
var spin = function(){
    if(isHovering){
        el.removeClass("spin");

        setTimeout(function(){
            el.addClass("spin");

            setTimeout(spin, 1500);
        }, 0);
    }
};

$(document).ready(function() {
  spin();
});
