window.addEventListener('load', function () {
  const library = {
    hora: {
      theme: 'hora', video: 'I8d-tjcRXtM', role: 'Post-Production Manager',
      twoLabel: 'Format', two: '82-minute feature film', threeLabel: 'Result', three: 'MYR 2.7M+ box office',
      summary: 'Led post-production delivery for an 82-minute Didi & Friends feature film, from edit coordination through final mastering and release-ready assets.',
      challenge: 'My first feature-length project meant learning how to manage a much longer and more technically demanding delivery process than short-form content—while protecting cinematic quality across every final stage.',
      responsibility: 'Managed the end-to-end post-production pipeline; coordinated editors, colourists, and sound designers; kept work moving toward key delivery dates; and prepared final masters for multiple distribution platforms.',
      context: 'A 2018 feature-film post-production workflow involving editorial, colour, sound, mastering, festival submission, and theatrical-release requirements.',
      deliverables: 'Final edit coordination, colour and sound handover, final mastering, festival-submission materials, theatrical delivery, and multi-platform release assets.',
      outcome: 'Cinema-ready delivery for an 82-minute feature.',
      note: 'Delivered on time for festival submission and theatrical release. The Didi & Friends feature film achieved more than MYR 2.7 million at the box office.'
    },
    sspn: {
      theme: 'sspn', video: '0Nzwnw4sLF8', role: 'Creative Producer',
      twoLabel: 'Scope', two: '3 min film + 15 sec TVC', threeLabel: 'Value', three: 'MYR 200K campaign',
      summary: 'Reworked a time-sensitive production plan to secure FINAS approval and deliver a campaign film and TVC cutdown on time.',
      challenge: 'The campaign was tied to a live event, leaving a tight three-month production window. Alongside the full three-minute collaboration video, we needed a 15-second TVC cutdown approved by FINAS—a process that could add around three weeks before launch.',
      responsibility: 'Managed client expectations, maintained clear communication across stakeholders, and helped reshape the workflow so TVC material was completed and submitted for approval first while production continued on the full campaign video.',
      context: 'A MYR 200K collaboration delivered within three months, involving a three-minute Didi & Friends campaign video, a 15-second TVC cutdown, FINAS approval, and a time-sensitive live-event launch.',
      deliverables: 'Three-minute collaboration video, 15-second TVC cutdown, client communication and progress reporting, FINAS submission coordination, and delivery planning.',
      outcome: 'FINAS approval and TVC release on schedule.',
      note: 'The client was satisfied with progress and final delivery, while the full campaign remained on track.'
    },
    genki: {
      theme: 'genki', video: 'rZQuAW49cAY', role: 'Creative Producer',
      twoLabel: 'Focus', two: 'Client + final edit', threeLabel: 'Result', three: '937K views',
      summary: 'Supported an international brand collaboration from client communication through final edit, on-time delivery, and post-launch reporting.',
      challenge: 'The focus was on maintaining a smooth, reliable production process across an international brand partnership while keeping communication clear and delivery on schedule.',
      responsibility: 'Acted as the main contact between the client and internal creative team; managed updates and expectations; edited final video deliverables; supported production through completion; and monitored campaign performance after release.',
      context: 'A 2021 international branded-content collaboration delivered across client, creative, and post-production teams.',
      deliverables: 'Client communication, production support, final video editing, delivery coordination, and post-launch performance reporting.',
      outcome: '937,000 views after release.',
      note: 'The project strengthened my confidence in working with international brands and balancing client communication with practical creative delivery.'
    },
    sirah: {
      theme: 'sirah', video: 'GW6OpWRKFds', role: 'Line Producer',
      twoLabel: 'Scope', two: 'Original 2D series', threeLabel: 'Platform', three: 'Leading Durioo+ series',
      summary: 'Built a 2D animated series from the ground up, creating its production blueprint, visual direction, and repeatable workflow for Durioo+.',
      challenge: 'The project needed to evolve through audience feedback while maintaining a clear story formula, consistent visual direction, and an efficient production system for a new 2D animation pipeline.',
      responsibility: 'Managed the project from development through final delivery; created and documented the production blueprint, workflows, pipelines, and guidelines; defined the project look and feel; and continuously improved the process as new audience feedback emerged.',
      context: 'A 2024 original 2D animated series developed from scratch for Durioo+. It became one of the platform’s leading Sirah animated series.',
      deliverables: 'Project blueprint, 2D animation pipeline, production workflows and guidelines, visual direction, story-development support, and final episode delivery.',
      outcome: 'A repeatable foundation for a new 2D series.',
      note: 'Developed from scratch and refined through audience feedback to improve both production quality and efficiency.'
    }
  };

  Object.keys(library).forEach(function (key) {
    const data = library[key];
    Object.assign(archiveCases[key], { c: data.challenge, r: data.responsibility, x: data.context, d: data.deliverables, o: data.outcome, q: data.note });
    const summary = document.querySelector('.archive-card[data-case="' + key + '"] p');
    if (summary) summary.textContent = data.summary;
  });

  const dialog = document.getElementById('case-dialog');
  const media = document.getElementById('case-media');
  const track = document.getElementById('case-gallery-track');
  const play = document.getElementById('case-play');
  let active = null;
  let selected = 0;

  function showItem(next) {
    selected = (next + 2) % 2;
    track.querySelectorAll('.gallery-item').forEach(function (item, position) {
      item.classList.toggle('is-selected', position === selected);
    });
    const count = String(selected + 1).padStart(2, '0') + ' / 02';
    const headerCount = document.querySelector('.case-header-counter');
    if (headerCount) headerCount.textContent = count;
    const galleryCount = document.getElementById('case-gallery-count');
    if (galleryCount) galleryCount.textContent = count;
    const oldFrame = media.querySelector('iframe');
    if (oldFrame) oldFrame.remove();
    if (selected === 1) {
      media.classList.add('is-playing');
      media.insertAdjacentHTML('beforeend', '<iframe title="' + document.getElementById('case-title').textContent + ' trailer" src="https://www.youtube-nocookie.com/embed/' + active.video + '?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>');
    } else {
      media.classList.remove('is-playing');
      play.style.display = 'inline-flex';
    }
  }

  function renderLibraryCase() {
    const title = document.getElementById('case-title').textContent.trim();
    const key = Object.keys(library).find(function (item) { return archiveCases[item].n === title; });
    if (!key) return;
    active = library[key];
    selected = 0;
    dialog.dataset.caseTheme = active.theme;
    document.getElementById('case-role-short').textContent = active.role;
    document.getElementById('case-fact-two-label').textContent = active.twoLabel;
    document.getElementById('case-fact-two').textContent = active.two;
    document.getElementById('case-fact-three-label').textContent = active.threeLabel;
    document.getElementById('case-fact-three').textContent = active.three;
    const image = document.getElementById('case-image');
    const trailerThumbnail = 'https://i.ytimg.com/vi/' + active.video + '/hqdefault.jpg';
    track.innerHTML = '<button type="button" class="gallery-item is-selected" data-library-index="0" aria-label="Project visual"><img src="' + image.src + '" alt="' + image.alt + '"></button><button type="button" class="gallery-item gallery-video-thumb" data-library-index="1" aria-label="Watch trailer"><img src="' + trailerThumbnail + '" alt="Watch trailer on YouTube"></button>';
    track.querySelectorAll('[data-library-index]').forEach(function (item) {
      item.addEventListener('click', function () { showItem(Number(item.dataset.libraryIndex)); });
    });
    play.style.display = 'inline-flex';
    play.onclick = function () { showItem(1); };
    showItem(0);
  }

  new MutationObserver(function () {
    if (dialog.open) setTimeout(renderLibraryCase, 380);
  }).observe(dialog, { attributes: true, attributeFilter: ['open'] });

  dialog.addEventListener('close', function () {
    active = null;
    delete dialog.dataset.caseTheme;
  });

  document.addEventListener('click', function (event) {
    if (!active || !dialog.open) return;
    const control = event.target.closest('[data-header-nav],[data-gallery]');
    if (!control) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const direction = control.dataset.headerNav || control.dataset.gallery;
    showItem(direction === 'next' ? selected + 1 : selected - 1);
  }, true);

  const videos = {
    'A Night With Aina Abdul 3.0': '2iyb5nZwtAY',
    'Little Ammar': 'PGPhWPqjm6o',
    'Didi & Friends × Darlie': 'yawTjEBhQFU',
    'Konsert Hora Horey': 'I8d-tjcRXtM',
    'Didi & Friends × SSPN': '0Nzwnw4sLF8',
    'Didi & Friends × Genki': 'rZQuAW49cAY',
    'Sirah Nabawiyah': 'GW6OpWRKFds'
  };

  function setTrailerThumbnail() {
    const video = videos[document.getElementById('case-title').textContent.trim()];
    const thumbnail = track.querySelector('.gallery-video-thumb img');
    if (video && thumbnail) thumbnail.src = 'https://i.ytimg.com/vi/' + video + '/hqdefault.jpg';
  }

  new MutationObserver(function () {
    if (dialog.open) setTimeout(setTrailerThumbnail, 560);
  }).observe(dialog, { attributes: true, attributeFilter: ['open'] });

  const featureHeading = document.querySelector('.featured .section-heading h2');
  if (featureHeading) featureHeading.textContent = 'Feature projects';
  document.querySelector('.featured .section-summary')?.remove();
  document.querySelector('.links a[href="#work"]')?.replaceChildren('Feature projects');
});
