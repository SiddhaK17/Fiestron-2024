class Value {
  constructor({ el, num }) {
    this.el = el;
    this.num = num;
  }

  // Function to animate the number from 0 to the target num
  animateNumber() {
    const target = this.num;
    let current = 0;
    const increment = Math.ceil(target / 100); // Increment step for smooth transition
    const duration = 2000; // Duration for the animation in milliseconds
    const stepTime = Math.abs(Math.floor(duration / target)); // Time between each step

    const animate = () => {
      current += increment;
      if (current < target) {
        this.el.textContent = current;
        requestAnimationFrame(animate);
      } else {
        this.el.textContent = target;
      }
    };

    animate();
  }

  update(num) {
    // Start the animation
    this.num = num;
    this.animateNumber();
  }
}

const createValue = (el, num) => {
  const value = new Value({
    el: el,
    num: num,
  });

  let hasRun = false;

  const options = {
    threshold: [0, 0.9],
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasRun) {
        value.update(num);
        hasRun = true;
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  observer.observe(el);
};

document.addEventListener("DOMContentLoaded", () => {
  const memberValue = document.querySelector(".member-value");
  createValue(memberValue, 150);

  const prizesValue = document.querySelector(".prizes-value");
  createValue(prizesValue, 50);

  const footfallValue = document.querySelector(".footfall-value");
  createValue(footfallValue, 200);
});
