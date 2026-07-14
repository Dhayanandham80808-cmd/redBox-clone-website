// ==========================================
// COMBINED SCRIPT — index.html, collections.html, contact.html
// ==========================================

// ---- Offer Bar Close (index.html mattum) ----
var offerBar = document.querySelector(".offer-bar");
var offerCloseBtn = document.getElementById("offer-close");
if (offerCloseBtn) {
    offerCloseBtn.addEventListener("click", function () {
        offerBar.style.display = "none";
    });
}

// ---- Side Navbar Open (id illa class, edhavadhu use pannirukalam) ----
var sidenavbar = document.querySelector(".side-navbar");
var sideNavMenuById = document.getElementById("side-navbar-activate");
var sideNavMenuByClass = document.querySelector(".navbar-menu-toggle");

if (sideNavMenuById) {
    sideNavMenuById.addEventListener("click", function () {
        sidenavbar.style.marginLeft = "0px";
    });
} else if (sideNavMenuByClass) {
    sideNavMenuByClass.addEventListener("click", function () {
        sidenavbar.style.marginLeft = "0px";
    });
}

// ---- Side Navbar Close (ella pages layum) ----
var sideNavCloseBtn = document.getElementById("side-navbar-close");
if (sideNavCloseBtn) {
    sideNavCloseBtn.addEventListener("click", function () {
        sidenavbar.style.marginLeft = "-60%";
    });
}

// ---- Slider (index.html mattum) ----
var sliderleftbutton = document.getElementById("slider-left-activate");
var sliderrightbutton = document.getElementById("slider-right-activate");
var sliderimage = document.querySelector(".slider-image-container");

if (sliderleftbutton && sliderrightbutton && sliderimage) {
    var slidermargin = 0;

    sliderrightbutton.addEventListener("click", function () {
        slidermargin = slidermargin + 100;
        if (slidermargin > 200) {
            slidermargin = 0;
            sliderimage.style.marginLeft = 0;
        } else {
            sliderimage.style.marginLeft = "-" + slidermargin + "vw";
        }
    });

    sliderleftbutton.addEventListener("click", function () {
        if (slidermargin == 0) {
            slidermargin = 200;
            sliderimage.style.marginLeft = "-" + slidermargin + "vw";
        } else {
            slidermargin = slidermargin - 100;
            sliderimage.style.marginLeft = "-" + slidermargin + "vw";
        }
    });
}

// ---- Like Buttons (index.html mattum) ----
var likebuttons = document.querySelectorAll(".like-button");
likebuttons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        if (e.target.src.indexOf("blackheart") > 0) {
            e.target.src = "img/icons/redheart.png";
        } else {
            e.target.src = "img/icons/blackheart.png";
        }
    });
});

// ---- Scroll Animate (index.html mattum) ----
window.addEventListener("scroll", function () {
    var elements = document.querySelectorAll(".initial-scroll-animate");
    elements.forEach((el) => {
        var windowHeight = window.innerHeight;
        var elbound = el.getBoundingClientRect();
        if (windowHeight > elbound.top - 100) {
            el.classList.remove("reveal-scroll-animate");
        }
    });
});

// ---- Products + Filter (collections.html mattum) ----
var productContainer = document.querySelector(".products");
if (productContainer) {
    import("./products.js").then(({ products }) => {

        products.forEach((product) => {
            var createItem = document.createElement("div");
            createItem.classList.add("product");
            createItem.innerHTML = ` <img style="width: 20vw;" src="./images/${product.src}">
    <h1>${product.name}</h1>
    <p>₹${product.price}</p>
    <tags style="visibility:hidden;">${product.tags}</tags>`;
            productContainer.append(createItem);
        });

        var filterList = [];
        var tags = document.getElementsByName("tags");

        tags.forEach((tag) => {
            tag.addEventListener("change", (e) => {
                if (e.target.checked) {
                    filterList.push(e.target.value);
                } else {
                    filterList = filterList.filter((item) => item !== e.target.value);
                }
                update();
            });
        });

        function update() {
            var productList = document.querySelectorAll(".product");
            for (var i = 0; i < productList.length; i++) {
                var check = false;
                var product = productList[i];
                var temp = product.querySelector("tags").innerHTML;
                var tempFilterArray = temp.split(",");

                filterList.forEach((j) => {
                    tempFilterArray.forEach((k) => {
                        if (j == k) check = true;
                    });
                });

                product.style.display = (!check && filterList.length > 0) ? "none" : "block";
            }
        }
    });
}