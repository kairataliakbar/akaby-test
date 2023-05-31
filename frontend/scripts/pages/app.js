/**
 * Global methods and functions
 * @module app
 */
import IMask from 'imask';

import Modal from '../components/Modal/index.ts';
import Select from '../components/Select';
/**
 * Подключение файлов
 */
import './form'
import './main'
import '../old/pages/testview'


const modelExist = document.querySelector('#auth-modal')
let authModal

if (modelExist) {
  authModal = new Modal('#auth-modal');

  const profileButtons = document.querySelectorAll('#profile-btn');
  profileButtons.forEach((btn) => btn.addEventListener('click', () => {
    authModal.open();
  }));
}

const phoneInput = document.getElementById('phone');
const select = new Select('#country');

const patternPhoneMask = phoneInput && new IMask(phoneInput, { mask: '{+7} (000) 000-00-00' });

const selectCountry = document.getElementById('country');
if (selectCountry) {
  selectCountry.addEventListener('click', () => {
    select.mount();
    const phonePlaceholder = document.getElementById('input-country').value;
    if (phonePlaceholder && phoneInput) {
      phoneInput.placeholder = phonePlaceholder.replace('{', '').replace('}', '');
      patternPhoneMask.updateOptions({ mask: phonePlaceholder });
    }
  });
}

const byAccessModalExist = document.getElementById('by-access-modal');
let byAccessModal;

if (byAccessModalExist) {
  byAccessModal = new Modal('#by-access-modal');

  const byAccessBtn = document.querySelectorAll('#by-access');
  byAccessBtn.forEach((btn) => btn.addEventListener('click', () => {
    byAccessModal.open();
  }));
}

const navigationOnMain = document.getElementById('navigation-on-main');
if (navigationOnMain) {
  navigationOnMain.addEventListener('click', () => window.location.assign('main.html'));
}

const menu = document.getElementById('menu');
const openMenu = document.getElementById('open-menu');
const closeMenu = document.getElementById('close-menu');
const menuLinks = document.getElementById('menu-links');

if (menu) {
  if (openMenu) {
    openMenu.addEventListener('click', () => {
      const tabletOrPhone = window.matchMedia("(max-width: 1000px)");
      if (tabletOrPhone.matches) {
        menu.style.width = '100%';
        return;
      }
      menu.style.width = '50%';
    });
  }

  if (closeMenu) {
    closeMenu.addEventListener('click', () => {
      menu.style.width = '0';
    });
  }

  if (menuLinks) {
    menuLinks.addEventListener('click', () => {
      menu.style.width = '0';
    });
  }
}

const smsCode = document.getElementById('sms-code');
if (smsCode) {
  IMask(smsCode, {
    mask: [
      {
        mask: '0 0 0 0'
      },
      {
        mask: /^[0-9]{4}/
      }
    ]
  });
}

const authStep1 = document.getElementById('auth-step-1');
const authStep2 = document.getElementById('auth-step-2');

if (authStep1 && authStep2) {
  const nextStepAuthBtn = document.getElementById('next-step-auth');

  if (nextStepAuthBtn && authStep1.classList.contains('is-active')) {
    nextStepAuthBtn.addEventListener('click', () => {
      authStep1.classList.remove('is-active');
      authStep2.classList.add('is-active');
    });
  }
}

if (authStep2 && authStep1) {
  const prevStepAuthBtn = document.getElementById('prev-step-auth');
  const agreementCheckbox = document.getElementById('agreement');

  if (prevStepAuthBtn) {
    prevStepAuthBtn.addEventListener('click', () => {
      authStep2.classList.remove('is-active');
      authStep1.classList.add('is-active');
    });
  }

  if (agreementCheckbox) {
    const authActivationBtn = document.getElementById('auth-activation');

    if (authActivationBtn) {
      authActivationBtn.disabled = true;

      agreementCheckbox.addEventListener('change', () => {
        if (agreementCheckbox.checked) {
          authActivationBtn.disabled = false;
        } else {
          authActivationBtn.disabled = true;
        }
      });
    }
  }
}

/**
 * @function createVideoModal
 * @param {element} videoPlayer - video player element
 * @param {string} videoModalId - video modal id
 * @param {element} openVideoModalBtnId - id btn for open video modal
 * @return {object} - return video modal
 */
function createVideoModal(videoPlayer, videoModalId, openVideoModalBtnId) {
  const videoModal = new Modal(videoModalId);

  const video = videoPlayer.querySelector('#video');
  const openVideoModalBtn = document.querySelector(openVideoModalBtnId);
  const closeVideoModalBtns = videoPlayer.querySelectorAll('#video-modal-close');
  const lockedVideo = videoPlayer.querySelector('#locked-video');
  const isNoAccess = video.dataset.isNoAccess === 'true';
  let isFirstPlay = true;

  openVideoModalBtn.addEventListener('click', () => {
    videoModal.open();
    if (isFirstPlay && isNoAccess) {
      video.play();
      isFirstPlay = false;
    } else if (!isFirstPlay && isNoAccess) {
      lockedVideo.style.display = 'flex';
    }
  });

  video.controls = !isNoAccess;
  video.addEventListener('play', () => {
    if (isNoAccess) {
      setTimeout(() => {
        lockedVideo.style.display = 'flex';
        video.pause();
      }, 15000);
    }
  });

  closeVideoModalBtns.forEach((closeBtn) => closeBtn.addEventListener('click', () => {
    video.pause();
  }))

  return videoModal;
}

const videoOneModalExist = document.querySelector('#video-one-modal');
let videoOneModal;

if (videoOneModalExist) {
  videoOneModal = createVideoModal(videoOneModalExist, '#video-one-modal', '#play-video-one');
}

const videoTwoModalExist = document.querySelector('#video-two-modal');
let videoTwoModal;

if (videoTwoModalExist) {
  videoTwoModal = createVideoModal(videoTwoModalExist, '#video-two-modal', '#play-video-two');
}

const buyAccessBtnInVideoModals = document.querySelectorAll('#by-access-in-video-modal');
buyAccessBtnInVideoModals.forEach((btn) => btn.addEventListener('click', () => {
  if (videoOneModal) {
    videoOneModal.close();
  }
  if (videoTwoModal) {
    videoTwoModal.close();
  }
  byAccessModal.open();
}));
