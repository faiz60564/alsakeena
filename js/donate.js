    // 2. Interactive Donation Calculator Logic
    const slider = document.getElementById('donation-slider');
    const amountDisplay = document.getElementById('donation-amount-display');
    const btnAmountDisplay = document.getElementById('btn-amount-display');
    const impactTitle = document.getElementById('impact-title');
    const impactDesc = document.getElementById('impact-desc');
    const impactIcon = document.getElementById('impact-icon');
    const modalAmountText = document.getElementById('modal-amount-text');

    const pillarImpact = {
      all: {title: 'Your Potential Impact', desc: 'Support coordinated assistance across legal advocacy, treatment access, peer support, and economic recovery.', icon: 'fa-hand-holding-heart'},
      advocacy: {title: 'Advocacy & Stability', desc: 'Help individuals navigate disability benefits and access legal guidance.', icon: 'fa-scale-balanced'},
      treatment: {title: 'Treatment Access', desc: 'Help reduce barriers to appropriate mental health treatment and recovery services.', icon: 'fa-heart-pulse'},
      community: {title: 'Community & Connection', desc: 'Support peer groups, connection, and ongoing emotional encouragement.', icon: 'fa-people-group'},
      opportunity: {title: 'Economic Opportunity', desc: 'Help individuals rebuild confidence, skills, and pathways toward financial independence.', icon: 'fa-seedling'}
    };
    let selectedPillar = 'all';
    const pillarButtons = document.querySelectorAll('.pillar-choice');
    const allPillarsButton = document.getElementById('all-pillars');
    const paypalDonate = document.getElementById('paypal-donate');
    function paypalDonationUrl(value) {
      const amount = Number(value);
      const valid = Number.isFinite(amount) && amount >= Number(slider.min) && amount <= Number(slider.max);
      return 'https://www.paypal.com/donate/?business=46HLF5UU29M9E&currency_code=USD' +
        (valid ? '&amount=' + encodeURIComponent(amount.toFixed(2)) : '');
    }
    function updateCalculator(val) {
      const formatted = `$${Number(val).toLocaleString('en-US')}`;
      amountDisplay.textContent = formatted;
      if (paypalDonate) paypalDonate.href = paypalDonationUrl(val);
      if (btnAmountDisplay) btnAmountDisplay.textContent = formatted;
      if (modalAmountText) modalAmountText.textContent = formatted;
      const impact = pillarImpact[selectedPillar];
      impactTitle.textContent = impact.title;
      impactDesc.textContent = impact.desc;
      impactIcon.innerHTML = `<i class="fa-solid ${impact.icon}"></i>`;
      pillarButtons.forEach(button => {
        const active = button.dataset.pillar === selectedPillar;
        button.setAttribute('aria-pressed', String(active));
        button.classList.toggle('border-brand-gold', active);
        button.classList.toggle('bg-white/20', active);
        button.classList.toggle('border-white/25', !active);
      });
      allPillarsButton.setAttribute('aria-pressed', String(selectedPillar === 'all'));
    }
    slider.addEventListener('input', e => updateCalculator(e.target.value));
    pillarButtons.forEach(button => button.addEventListener('click', () => {
      selectedPillar = button.dataset.pillar === selectedPillar ? 'all' : button.dataset.pillar;
      updateCalculator(slider.value);
    }));
    allPillarsButton.addEventListener('click', () => { selectedPillar = 'all'; updateCalculator(slider.value); });
    updateCalculator(slider.value);
    paypalDonate?.addEventListener('click', () => {
      paypalDonate.href = paypalDonationUrl(slider.value);
    });

    function showToast(msg) {
      const toast = document.getElementById('toast');
      const toastMsg = document.getElementById('toast-message');
      toastMsg.textContent = msg;
      toast.classList.remove('hidden');
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 4000);
    }

