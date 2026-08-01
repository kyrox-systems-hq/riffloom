/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

const continueButton = document.getElementById('continueButton');
const fullscreenButton = document.getElementById('fullscreenButton');
const orientationStatus = document.getElementById('orientationStatus');
const cards = [...document.querySelectorAll('[data-instrument]')];

function updateOrientation() {
  const portrait = window.matchMedia('(orientation: portrait)').matches;
  document.body.classList.toggle('portrait-warning', portrait);
  orientationStatus.textContent = portrait ? 'Rotate to landscape' : 'Landscape performance mode';
}

function restoreLastInstrument() {
  const lastHref = localStorage.getItem('riffloom:lastHref');
  const lastName = localStorage.getItem('riffloom:lastName');
  if (!lastHref || !lastName) return;
  continueButton.href = lastHref;
  continueButton.textContent = `Continue ${lastName}`;
  continueButton.classList.remove('hidden');
}

cards.forEach((card) => {
  card.addEventListener('click', () => {
    localStorage.setItem('riffloom:lastHref', card.getAttribute('href'));
    localStorage.setItem('riffloom:lastName', card.dataset.instrument);
  });
});

fullscreenButton.addEventListener('click', async () => {
  try {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
    await screen.orientation?.lock?.('landscape');
    fullscreenButton.textContent = 'Full screen active';
  } catch {
    fullscreenButton.textContent = 'Landscape app mode';
  }
});

window.addEventListener('orientationchange', updateOrientation);
window.addEventListener('resize', updateOrientation);
restoreLastInstrument();
updateOrientation();
