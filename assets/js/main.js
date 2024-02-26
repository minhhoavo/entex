$(document).ready(function () {
  "use strict";
  $(".c-header__hamburger").click(function (e) {
      e.preventDefault();
      $("body").toggleClass("isShow-hamburger");
      $(this).toggleClass('active');
      $(".c-header__menu").toggleClass("opened");
      $('.home-backtotop').css("display", "none")
  });
});

let linkList = document.querySelectorAll('.c-header__link');
linkList.forEach(item =>{
  item.addEventListener('click',function(){
    $("body").removeClass("isShow-hamburger");
    document.querySelector('.c-header__menu').classList.remove('opened');
  })
})

//slider
$(".home-mainvisual__slider").slick({
  fade: true,
  speed: 1100,
  infinite: true,
  autoplay: true,
  arrows: false,
});

//tablink
function openTab(evt, pageName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("home-infor__tabcontent");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  document.getElementById(pageName).style.display = "block";

  tablinks = document.getElementsByClassName("home-infor__tablink");

  for (let item of tablinks) {
    item.classList.remove('active');
  }
  evt.currentTarget.className += ' active';
}
window.openTab = openTab;
document.getElementById("defaultOpen").click();

//album
let albumlistOpen = document.querySelectorAll('.home-album__openmodal');
let albumModal = document.querySelector('#albummodal');
let albummodalImg = document.querySelector('#home-albummodal__imgmodal');
let btnalbumClose = document.getElementsByClassName("home-albummodal__close")[0];
albumlistOpen.forEach(item => {
  item.addEventListener('click', function () {
    let source = item.getAttribute('data-src');
    albumModal.style.display = 'block';
    albummodalImg.src = source;
    disableScroll();
  })
})
btnalbumClose.onclick = function () {
  albumModal.style.display = "none";
  enableScroll();
}

//message
let messagelistOpen = document.querySelectorAll('.home-message__openmodal');
let messageModal = document.querySelectorAll('.home-messagemodal');
let btnmessageClose = document.querySelectorAll(".home-messagemodal__close");
messagelistOpen.forEach(item => {
  item.addEventListener('click', function () {
    let target = this.getAttribute('data-target');
    messageModal.forEach(item => {
      item.style.display = 'none';
      if(item.getAttribute('data-target') == target){
        item.style.display = 'block';
        disableScroll();
      }
    })
  })
})

btnmessageClose.forEach(btn => {
  btn.addEventListener('click',function () {
    messageModal.forEach(item => {
      item.style.display = "none";
      enableScroll();
    })
  })
})

window.onclick = function (event) {
  if (event.target == albumModal) {
    albumModal.style.display = "none";
    enableScroll();
  }
 
  if (event.target.classList.contains('home-messagemodal')){
    messageModal.forEach(item => {
      item.style.display = "none";
      enableScroll();
    })
  }
}

//active menu
let section = document.querySelectorAll("section");
let listsLink = document.querySelectorAll(".c-header__item");

listsLink[0].classList.add("is-active");
window.onscroll = function () {
  section.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset - 100 && top <= offset + height) {
      listsLink.forEach((item) => {
        item.classList.remove("is-active");
        if (item.querySelector("a").getAttribute("href").trim() == "#" + id) {
          item.classList.add("is-active");
        }
      });
    }
  });
};

// disable & enable scroll
function disableScroll() {
  $("body").css("overflow", "hidden")
}
function enableScroll() {
  $("body").css("overflow", "")
}

//scrollbox
var $animation_elements = $('.c-scrollbox');
var $window = $(window);

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);

  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);

    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
      (element_top_position <= window_bottom_position)) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
  });
  
}
$window.on('scroll', check_if_in_view);

//active_scroll_menu
$('.c-header__link').click(function () {
  var tag=$(this).attr("href");
  var top=tag.offsetTop;    
  if($(window).width() <= 1023){
    $('html, body').animate({ scrollTop: $(tag).position().top - 124}, 100);
  }
  else{
    $('html, body').animate({ scrollTop: $(tag).position().top}, 124);
  }
  return false;
});

  //back to top
  $(".home-backtotop").addClass("is-hidetop");
  $(window).scroll(function () {
    if ($(this).scrollTop() > 80) {
      $('.home-backtotop').removeClass("is-hidetop");
    } else {
      $('.home-backtotop').addClass("is-hidetop");
    }
  });
  $('.home-backtotop').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 100);
    return false;
  });

