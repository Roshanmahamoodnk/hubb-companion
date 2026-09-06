(() => {
  'use strict';

  const formats = {
    sachet: {
      image: 'assets/01-sachet-master.png',
      alt: 'Four ivory HUBB sachet designs with brown brush calligraphy and painted flavour colour.',
      caption: 'The 30 g sachet — four flavours',
      kicker: 'A LITTLE MOMENT, ALL YOURS',
      name: 'Start with one sachet.',
      description: 'An individually sealed pack for a quick break, the next round or passing a favourite flavour to a friend.',
      inside: '1 sealed sachet',
      net: '30 g',
      flavours: 'Four single-flavour options',
      note: 'The ivory front leads with HUBB calligraphy and painted flavour colour. The weight stays clear and secondary. Shell bag not included with an individual sachet.'
    },
    cup: {
      image: 'assets/02-cup-system.png',
      alt: 'Four-flavour HUBB cup-and-sachet artwork lineup. One matching sachet is shown beside each cup to compare the designs; each cup is intended to contain five sachets of that same flavour.',
      caption: 'Cup-and-sachet artwork lineup — four flavour designs',
      kicker: 'FIVE LITTLE BREAKS TO TAKE ALONG',
      name: 'Your next-stop companion.',
      description: 'A popcorn-style cup holds five sealed sachets of one flavour. A separate paper shell bag gives the empty shells their own place.',
      inside: '5 sachets + 1 paper shell bag',
      net: '5 × 30 g · 150 g total',
      flavours: 'One flavour per cup',
      note: 'This lineup shows one matching sachet beside each cup for artwork comparison, not the full contents. Each cup contains five same-flavour sachets and one separate shell bag; see the unpacked concept below.'
    },
    family: {
      image: 'assets/03-family-system.png',
      alt: 'One HUBB family bucket concept containing twenty sealed sachets: five each of Classic Sea Salt, Garlic Salt, Pepper Lime and Fire Salt, with separate paper shell bags.',
      caption: 'The family bucket — 4 flavours × 5 sachets',
      kicker: 'EVERYONE GETS THEIR FAVOURITE',
      name: 'The whole gathering, in one.',
      description: 'An ivory family bucket shows the four sachet flavours on its front. Inside are twenty sealed packs: five of each flavour, ready to choose and share.',
      inside: '20 sachets + proposed 4 shell bags',
      net: '20 × 30 g · 600 g total',
      flavours: '4 flavours × 5 sachets each',
      note: 'One outer family bucket. Classic Sea Salt, Garlic Salt, Pepper Lime and Fire Salt are packed inside as individual 30 g sachets.'
    },
    display: {
      image: 'assets/04-retail-world.png',
      alt: 'Proposed HUBB retail world, including the branded sachet display and consistent Art of the Gathering packaging.',
      caption: 'Retail concept — single-flavour 24-sachet display',
      kicker: 'THE EVERYDAY STARTS HERE',
      name: 'A little HUBB on the counter.',
      description: 'A branded open-front display brings the same identity to traditional trade and supermarket counters. Shoppers pick their favourite sachet individually.',
      inside: '24 individually sold sachets',
      net: '24 × 30 g · 720 g total',
      flavours: 'One flavour per display',
      note: 'The display quantity is a retail packing count. Each consumer unit is one sealed 30 g sachet. Placements shown are proposed concepts.'
    }
  };

  const tabList = document.querySelector('.format-tabs');
  const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
  const panel = document.getElementById('format-panel');
  const image = document.getElementById('format-image');
  const zoomButton = document.getElementById('format-zoom');
  const download = document.getElementById('format-download');

  function selectFormat(key) {
    const selected = formats[key];
    if (!selected) return;
    tabs.forEach(tab => {
      const active = tab.dataset.format === key;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', `tab-${key}`);
    image.src = selected.image;
    image.alt = selected.alt;
    zoomButton.dataset.zoom = selected.image;
    zoomButton.dataset.caption = selected.caption;
    download.href = selected.image;
    ['kicker', 'name', 'description', 'inside', 'net', 'flavours', 'note'].forEach(field => {
      document.getElementById(`format-${field}`).textContent = selected[field];
    });
  }

  tabs.forEach(tab => tab.addEventListener('click', () => selectFormat(tab.dataset.format)));
  tabList.addEventListener('keydown', event => {
    const current = tabs.indexOf(document.activeElement);
    if (current < 0) return;
    let next;
    if (event.key === 'ArrowRight') next = (current + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    tabs[next].focus();
    selectFormat(tabs[next].dataset.format);
  });

  const dialog = document.getElementById('image-dialog');
  const dialogImage = document.getElementById('dialog-image');
  const dialogCaption = document.getElementById('dialog-caption');
  let lastZoomTrigger = null;

  document.querySelectorAll('[data-zoom]').forEach(button => {
    button.addEventListener('click', () => {
      if (typeof dialog.showModal !== 'function') {
        window.open(button.dataset.zoom, '_blank', 'noopener');
        return;
      }
      lastZoomTrigger = button;
      dialogImage.src = button.dataset.zoom;
      dialogImage.alt = button.querySelector('img').alt;
      dialogCaption.textContent = button.dataset.caption;
      dialog.showModal();
      document.body.classList.add('dialog-open');
      document.getElementById('dialog-close').focus();
    });
  });

  document.getElementById('dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    if (lastZoomTrigger) lastZoomTrigger.focus();
  });
})();
