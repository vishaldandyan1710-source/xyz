const h = document.querySelector('.hamb');
const d = document.querySelector('.drawer');

if (h && d) {

  h.addEventListener('click', () => {

    h.classList.toggle('open');
    d.classList.toggle('open');

  });

}


document.querySelectorAll('.drawer a').forEach(a => {

  a.addEventListener('click', () => {

    h?.classList.remove('open');
    d?.classList.remove('open');

  });

});


/* SCROLL ANIMATIONS */

const obs = new IntersectionObserver(
  entries => {

    entries.forEach(e => {

      if (e.isIntersecting) {

        e.target.classList.add('show');

        obs.unobserve(e.target);

      }

    });

  },
  {
    threshold:0.1
  }
);


document.querySelectorAll('.reveal').forEach(e => {

  obs.observe(e);

});


/* ANIMATED NUMBERS */

document.querySelectorAll('[data-count]').forEach(el => {

  let done = false;

  const io = new IntersectionObserver(es => {

    if (es[0].isIntersecting && !done) {

      done = true;

      let target = Number(el.dataset.count);
      let number = 0;

      const step = Math.max(
        1,
        Math.ceil(target / 40)
      );

      const animate = () => {

        number = Math.min(
          target,
          number + step
        );

        el.textContent =
          number +
          (el.dataset.suffix || '');

        if (number < target) {

          requestAnimationFrame(animate);

        } else {

          io.disconnect();

        }

      };

      animate();

    }

  });

  io.observe(el);

});


/* ENQUIRY FORM */

document.querySelectorAll('form').forEach(form => {

  form.addEventListener('submit', e => {

    e.preventDefault();

    alert(
      'Thank you. Amoura will contact you shortly.'
    );

    form.reset();

  });

});
