const checkTrigger = document.querySelector('.checkbox-trigger');

function Reverter() {
  checkTrigger.checked = false;
}

checkTrigger.addEventListener('change', () => {
  if (checkTrigger.checked) {
    window.addEventListener('scroll', Reverter);
  } else {
    window.removeEventListener('scroll', Reverter);
  }
});
