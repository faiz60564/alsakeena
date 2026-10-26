
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn?.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });

    // 4. Animated Counters for Stats Grid
    const counters = document.querySelectorAll('.counter');
    let animated = false;

    window.addEventListener('scroll', () => {
      const epidemiologySec = document.getElementById('epidemiology');
      if (!epidemiologySec) return;

      const position = epidemiologySec.getBoundingClientRect();
      if (position.top < window.innerHeight && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const speed = Math.ceil(target / 40);

          const updateCount = () => {
            count += speed;
            if (count < target) {
              counter.innerText = count;
              setTimeout(updateCount, 40);
            } else {
              counter.innerText = target;
            }
          };
          updateCount();
        });
      }
    });
  

(function(){
 const form=document.getElementById('alsakeena-contact-form');
 if(!form)return;
 form.addEventListener('submit',function(event){
  event.preventDefault();
  if(!form.reportValidity())return;
  const d=new FormData(form);
  const subject='AlSakeena Contact: '+d.get('topic');
  const body='Name: '+d.get('name')+'\nEmail: '+d.get('email')+'\nTopic: '+d.get('topic')+'\n\nMessage:\n'+d.get('message');
  window.location.href='mailto:info@alsakeena.org?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
 });
})();
