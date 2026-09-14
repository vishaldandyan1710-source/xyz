/* =====================================================
   AMOURA JAVASCRIPT
===================================================== */


/* =====================================================
   MOBILE MENU
===================================================== */

function openMenu() {
  const menu = document.getElementById("sideMenu");

  if (menu) {
    menu.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}


function closeMenu() {
  const menu = document.getElementById("sideMenu");

  if (menu) {
    menu.classList.remove("open");
    document.body.style.overflow = "";
  }
}


document.querySelectorAll(".side-menu a").forEach(function(link) {

  link.addEventListener("click", function() {

    closeMenu();

  });

});


/* =====================================================
   HEADER SCROLL
===================================================== */

window.addEventListener("scroll", function() {

  const header = document.querySelector(".site-header");

  if (!header) return;

  if (window.scrollY > 40) {

    header.classList.add("scrolled");

  } else {

    header.classList.remove("scrolled");

  }

});


/* =====================================================
   BOTANICAL FEMALE FACE LINE ART
===================================================== */

function createAmouraLineArt() {

  const containers = document.querySelectorAll(
    ".line-art, .about-art"
  );

  if (!containers.length) return;


  const svgNS = "http://www.w3.org/2000/svg";


  containers.forEach(function(container) {

    if (container.querySelector("svg")) return;


    const svg = document.createElementNS(
      svgNS,
      "svg"
    );

    svg.setAttribute(
      "viewBox",
      "0 0 600 760"
    );

    svg.setAttribute(
      "aria-label",
      "Amoura botanical female face line art"
    );


    /* =================================================
       MAIN FACE
    ================================================= */

    const face = document.createElementNS(
      svgNS,
      "path"
    );

    face.setAttribute(
      "class",
      "botanical-line"
    );

    face.setAttribute(
      "d",
      `
      M 214 560
      C 190 525 184 482 192 437
      C 197 407 209 385 226 365

      C 211 340 208 309 218 279
      C 231 242 259 218 294 209

      C 331 199 369 207 397 228

      C 421 246 435 273 437 302

      C 439 327 431 348 420 365

      C 435 374 449 383 462 389

      C 476 396 482 407 478 419

      C 474 431 461 437 449 437

      C 436 438 428 432 423 424

      C 421 456 412 486 397 512

      C 379 543 354 565 324 581

      C 289 600 248 596 214 560
      `
    );

    svg.appendChild(face);


    /* =================================================
       NOSE
    ================================================= */

    const nose = document.createElementNS(
      svgNS,
      "path"
    );

    nose.setAttribute(
      "class",
      "botanical-line"
    );

    nose.setAttribute(
      "d",
      `
      M 319 316
      C 309 338 302 356 304 370
      C 306 382 316 388 329 385
      C 336 383 341 379 345 374
      `
    );

    svg.appendChild(nose);


    /* =================================================
       EYE
    ================================================= */

    const eye = document.createElementNS(
      svgNS,
      "path"
    );

    eye.setAttribute(
      "class",
      "botanical-line"
    );

    eye.setAttribute(
      "d",
      `
      M 267 326
      C 280 317 295 317 308 326
      C 296 335 280 337 267 326
      `
    );

    svg.appendChild(eye);


    /* =================================================
       EYELASHES
    ================================================= */

    const lashes = document.createElementNS(
      svgNS,
      "path"
    );

    lashes.setAttribute(
      "class",
      "botanical-line"
    );

    lashes.setAttribute(
      "d",
      `
      M 268 324 C 260 318 254 313 249 307
      M 274 321 C 267 312 263 306 261 298
      M 282 319 C 278 310 276 303 276 295
      `
    );

    svg.appendChild(lashes);


    /* =================================================
       EYEBROW
    ================================================= */

    const eyebrow = document.createElementNS(
      svgNS,
      "path"
    );

    eyebrow.setAttribute(
      "class",
      "botanical-line"
    );

    eyebrow.setAttribute(
      "d",
      `
      M 263 300
      C 278 286 298 283 314 292
      `
    );

    svg.appendChild(eyebrow);


    /* =================================================
       LIPS
    ================================================= */

    const lips = document.createElementNS(
      svgNS,
      "path"
    );

    lips.setAttribute(
      "class",
      "botanical-line"
    );

    lips.setAttribute(
      "d",
      `
      M 280 425
      C 293 417 307 417 321 424
      C 308 432 294 434 280 425

      M 280 425
      C 293 438 307 439 321 424
      `
    );

    svg.appendChild(lips);


    /* =================================================
       NECK
    ================================================= */

    const neck = document.createElementNS(
      svgNS,
      "path"
    );

    neck.setAttribute(
      "class",
      "botanical-line"
    );

    neck.setAttribute(
      "d",
      `
      M 257 579
      C 258 618 262 655 270 701

      M 398 513
      C 389 557 377 606 355 653
      `
    );

    svg.appendChild(neck);


    /* =================================================
       FLOWER 1 — TOP LEFT
    ================================================= */

    const flower1 = document.createElementNS(
      svgNS,
      "path"
    );

    flower1.setAttribute(
      "class",
      "botanical-line"
    );

    flower1.setAttribute(
      "d",
      `
      M 214 278

      C 188 266 170 246 176 226
      C 182 207 202 204 218 218

      C 205 191 211 167 229 163
      C 247 159 258 177 253 198

      C 263 171 284 157 300 166
      C 316 176 309 199 291 215

      C 318 201 339 209 340 226
      C 341 244 319 253 295 251

      C 272 248 249 258 232 276
      `
    );

    svg.appendChild(flower1);


    /* =================================================
       FLOWER PETALS
    ================================================= */

    const petals = document.createElementNS(
      svgNS,
      "path"
    );

    petals.setAttribute(
      "class",
      "botanical-line"
    );

    petals.setAttribute(
      "d",
      `
      M 229 244
      C 225 224 230 207 244 194

      M 244 251
      C 252 225 266 207 284 194

      M 257 257
      C 275 239 291 228 310 222

      M 217 239
      C 202 229 192 217 189 205
      `
    );

    svg.appendChild(petals);


    /* =================================================
       LEAVES LEFT
    ================================================= */

    const leavesLeft = document.createElementNS(
      svgNS,
      "path"
    );

    leavesLeft.setAttribute(
      "class",
      "botanical-line"
    );

    leavesLeft.setAttribute(
      "d",
      `
      M 214 270
      C 190 280 168 276 151 260
      C 170 249 194 252 214 270

      M 207 287
      C 181 300 157 299 140 286
      C 158 273 184 274 207 287

      M 202 310
      C 179 327 156 331 136 322
      C 152 304 178 300 202 310

      M 208 330
      C 188 350 168 358 148 353
      C 158 333 182 324 208 330
      `
    );

    svg.appendChild(leavesLeft);


    /* =================================================
       FLOWER 2 — RIGHT SIDE
    ================================================= */

    const flower2 = document.createElementNS(
      svgNS,
      "path"
    );

    flower2.setAttribute(
      "class",
      "botanical-line"
    );

    flower2.setAttribute(
      "d",
      `
      M 406 264

      C 424 242 447 235 462 246
      C 476 257 468 278 446 287

      C 469 278 490 286 493 302
      C 496 318 479 328 457 322

      C 481 330 489 348 478 361
      C 466 375 445 363 434 344

      C 431 324 421 294 406 264
      `
    );

    svg.appendChild(flower2);


    /* =================================================
       RIGHT FLOWER STEM
    ================================================= */

    const stemRight = document.createElementNS(
      svgNS,
      "path"
    );

    stemRight.setAttribute(
      "class",
      "botanical-line"
    );

    stemRight.setAttribute(
      "d",
      `
      M 431 345
      C 463 371 489 393 516 425
      C 530 441 543 453 556 459
      `
    );

    svg.appendChild(stemRight);


    /* =================================================
       RIGHT LEAVES
    ================================================= */

    const leavesRight = document.createElementNS(
      svgNS,
      "path"
    );

    leavesRight.setAttribute(
      "class",
      "botanical-line"
    );

    leavesRight.setAttribute(
      "d",
      `
      M 476 388
      C 491 369 511 362 528 369
      C 519 388 499 397 476 388

      M 493 408
      C 513 391 535 390 551 401
      C 539 418 516 422 493 408

      M 513 430
      C 535 417 554 421 566 434
      C 549 447 529 445 513 430
      `
    );

    svg.appendChild(leavesRight);


    /* =================================================
       LARGE LOWER BOTANICAL STEM
    ================================================= */

    const lowerStem = document.createElementNS(
      svgNS,
      "path"
    );

    lowerStem.setAttribute(
      "class",
      "botanical-line"
    );

    lowerStem.setAttribute(
      "d",
      `
      M 355 653
      C 386 634 414 622 441 612
      C 471 600 498 581 518 556
      C 539 530 549 501 550 469
      `
    );

    svg.appendChild(lowerStem);


    /* =================================================
       LOWER LEAVES
    ================================================= */

    const lowerLeaves = document.createElementNS(
      svgNS,
      "path"
    );

    lowerLeaves.setAttribute(
      "class",
      "botanical-line"
    );

    lowerLeaves.setAttribute(
      "d",
      `
      M 412 621
      C 408 596 416 578 434 566
      C 443 588 435 607 412 621

      M 449 605
      C 455 579 471 563 491 560
      C 489 582 475 599 449 605

      M 487 578
      C 501 555 519 545 537 549
      C 528 568 511 580 487 578

      M 520 548
      C 537 528 555 523 571 531
      C 559 548 541 555 520 548
      `
    );

    svg.appendChild(lowerLeaves);


    /* =================================================
       SMALL FLOATING LEAVES
    ================================================= */

    const smallLeaves = document.createElementNS(
      svgNS,
      "path"
    );

    smallLeaves.setAttribute(
      "class",
      "botanical-line"
    );

    smallLeaves.setAttribute(
      "d",
      `
      M 178 205
      C 158 193 153 174 160 158
      C 177 166 184 184 178 205

      M 195 187
      C 180 170 181 151 193 138
      C 206 153 207 172 195 187

      M 453 234
      C 454 213 465 199 481 193
      C 483 211 472 228 453 234

      M 468 218
      C 474 197 488 186 504 186
      C 500 205 487 217 468 218
      `
    );

    svg.appendChild(smallLeaves);


    /* =================================================
       LITTLE CURVED STEMS
    ================================================= */

    const stems = document.createElementNS(
      svgNS,
      "path"
    );

    stems.setAttribute(
      "class",
      "botanical-line"
    );

    stems.setAttribute(
      "d",
      `
      M 188 252
      C 165 229 151 208 150 184

      M 226 164
      C 216 137 221 115 237 96

      M 443 246
      C 448 218 457 193 473 176

      M 530 457
      C 550 445 568 427 575 407
      `
    );

    svg.appendChild(stems);


    container.appendChild(svg);

  });

}


/* =====================================================
   REVEAL ANIMATIONS
===================================================== */

function startRevealAnimations() {

  const elements = document.querySelectorAll(
    ".reveal, .line-art, .about-art"
  );

  if (!elements.length) return;


  const observer = new IntersectionObserver(

    function(entries) {

      entries.forEach(function(entry) {

        if (entry.isIntersecting) {

          entry.target.classList.add("active");

          observer.unobserve(entry.target);

        }

      });

    },

    {
      threshold: 0.12
    }

  );


  elements.forEach(function(element) {

    observer.observe(element);

  });

}


/* =====================================================
   GALLERY STAGGER
===================================================== */

function galleryStagger() {

  const cards = document.querySelectorAll(
    ".gallery-card"
  );

  cards.forEach(function(card, index) {

    card.style.transitionDelay =
      (index * 0.09) + "s";

  });

}


/* =====================================================
   COUNTER ANIMATION
===================================================== */

function animateCounters() {

  const counters = document.querySelectorAll(
    ".stat-number[data-number]"
  );

  if (!counters.length) return;


  const observer = new IntersectionObserver(

    function(entries, observer) {

      entries.forEach(function(entry) {

        if (!entry.isIntersecting) return;


        const element = entry.target;

        const target = parseInt(
          element.dataset.number,
          10
        );

        let current = 0;

        const duration = 1600;

        const startTime = performance.now();


        function update(time) {

          const progress =
            Math.min(
              (time - startTime) / duration,
              1
            );


          current =
            Math.floor(
              progress * target
            );


          element.textContent =
            current + "+";


          if (progress < 1) {

            requestAnimationFrame(update);

          } else {

            element.textContent =
              target + "+";

          }

        }


        requestAnimationFrame(update);

        observer.unobserve(element);

      });

    },

    {
      threshold: .5
    }

  );


  counters.forEach(function(counter) {

    observer.observe(counter);

  });

}


/* =====================================================
   PARALLAX HERO
===================================================== */

function heroParallax() {

  const heroImage =
    document.querySelector(".hero-image");

  if (!heroImage) return;


  window.addEventListener(
    "scroll",
    function() {

      const scroll =
        window.scrollY;

      if (scroll < window.innerHeight) {

        heroImage.style.transform =
          "scale(1.04) translateY(" +
          (scroll * .12) +
          "px)";

      }

    }
  );

}


/* =====================================================
   ENQUIRY FORM
===================================================== */

function setupForm() {

  const form =
    document.querySelector(".enquiry-form");

  if (!form) return;


  form.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      const name =
        form.querySelector(
          'input[name="name"]'
        );


      if (name && name.value.trim()) {

        alert(
          "Thank you, " +
          name.value.trim() +
          ". Your enquiry has been received."
        );

      } else {

        alert(
          "Thank you. Your enquiry has been received."
        );

      }


      form.reset();

    }
  );

}


/* =====================================================
   INITIALISE
===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    createAmouraLineArt();

    galleryStagger();

    startRevealAnimations();

    animateCounters();

    heroParallax();

    setupForm();

  }
);
