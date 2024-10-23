//READ MORE BUTTON EASY LOGIC CAN BE MODIFIED IF SOME1 WISHES

document.addEventListener('DOMContentLoaded', function() {
    
    const readMoreBtns = document.querySelectorAll('.ReadMoreBtn');

    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const description = this.closest('.EventD').querySelector('.Description');

            if (description.classList.contains('active')) {
                description.classList.remove('active');
                description.classList.add('deactive');
                this.textContent = 'Read More';
            } else {
                document.querySelectorAll('.Description').forEach(desc => {
                    desc.classList.remove('active');
                    desc.classList.add('deactive');
                });
                description.classList.remove('deactive');
                description.classList.add('active');
                readMoreBtns.forEach(button => button.textContent = 'Read More');
                this.textContent = 'Read Less';
            }
        });
    });
});

//CANVAS TEXT OPERATION ---COMPLEX EDIT AT YOUR OWN RISK :)

window.addEventListener('DOMContentLoaded', function() {
    const canvas = document.querySelector(".canvas");
    const ctx = canvas.getContext('2d',{
        willReadFrequently:true
    });
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    
    class Particle {
        constructor(effect, x, y, color) {
            this.effect = effect;
            if (Math.random() < 0.5) {
                this.x = this.effect.canvasWidth; 
                this.y = this.effect.canvasHeight; 
            } else {
                this.x = 0;
                this.y = this.effect.canvasHeight;
            }
            this.color = color;
            this.originX = x;
            this.originY = y;
            this.size = this.effect.gap+1;//All changes here have effect so mostly dont change unless wanna have fun
            this.dx = 0;
            this.dy = 0;
            this.vx = 0;
            this.vy = 0;
            this.force = 0;
            this.angle = 0;
            this.distance = 0;
            this.friction = Math.random() *0.3 + 0.15;
            this.ease = Math.random() *1 + 0.005;
        }
        draw() {
            this.effect.context.fillStyle = this.color;
            this.effect.context.fillRect(this.x, this.y, this.size, this.size);
        }
        update() {
            this.dx = this.effect.mouse.x - this.x;
            this.dy = this.effect.mouse.y - this.y;
            this.distance = this.dx * this.dx + this.dy * this.dy;
            this.force = -this.effect.mouse.radius / this.distance;
            if (this.distance < this.effect.mouse.radius) {
                this.angle = Math.atan2(this.dy, this.dx);
                this.vx += this.force * Math.cos(this.angle);
                this.vy += this.force * Math.sin(this.angle);
            }
            this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
            this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
        }
    }

    class Effect {
        constructor(context, canvasWidth, canvasHeight) {
            this.context = context;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.textX = this.canvasWidth / 2;//Position of texts
            this.textY = this.canvasHeight / 2;
            let baseSize = Math.min(this.canvasWidth, this.canvasHeight);
            this.fontSize = baseSize * .18;
            this.lineHeight = this.fontSize * 1.2;
            this.maxTextWidth = canvasWidth * 0.8;

            this.particles = [];
            this.gap = 1;//designer
            this.mouse = {
                radius: 2500,
                x: 0,
                y: 0,
            };
            //mouse aur touch,touch ko mouse bana ke use
            window.addEventListener("mousemove", (e) => {
                const rect = canvas.getBoundingClientRect();//TO GET CANVAS DIMENSION
            this.mouse.x = e.clientX - rect.left; 
            this.mouse.y = e.clientY - rect.top;  
            });

            // Touch event listeners
            window.addEventListener("touchmove", (e) => {
                e.preventDefault();
                const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            this.mouse.x = touch.clientX - rect.left;
            this.mouse.y = touch.clientY - rect.top;
            });

            window.addEventListener("touchstart", (e) => {
                e.preventDefault();
                const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            this.mouse.x = touch.clientX - rect.left;
            this.mouse.y = touch.clientY - rect.top;
            });
        }
//NAAM PE MAT JAO IT HANDLES ALL STUFF TBH
        wrapText(text) {
            const gradient = this.context.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight);
            gradient.addColorStop(0.3, 'rgba(255, 0, 0, 1)');
            gradient.addColorStop(0.5, 'rgba(0, 0, 255, 1)');
            gradient.addColorStop(0.7, 'rgba(128, 0, 128, 1)');

            

            this.context.textAlign = "center";
            this.context.textBaseline = "alphabetic";
            this.context.lineWidth = 1;
            this.context.strokeStyle = "#F2F2F2";
            this.context.fillStyle = gradient;
            this.context.font = this.fontSize + "px convergence";

            let linesArray = [];
            let words = text.split(" ");
            let lineCounter = 0;
            let line = '';
            for (let i = 0; i < words.length; i++) {
                let testLine = line + words[i] + " ";
                if (this.context.measureText(testLine).width > this.maxTextWidth) {
                    line = words[i] + " ";
                    lineCounter++;
                } else {
                    line = testLine;
                }
                linesArray[lineCounter] = line;
            }
            let textHeight = this.lineHeight * lineCounter;
            this.textY = this.canvasHeight / 2 - textHeight / 2;
            linesArray.forEach((el, index) => {
                this.context.fillText(el, this.textX, this.textY + (index * this.lineHeight));
                this.context.strokeText(el, this.textX, this.textY + (index * this.lineHeight));
            });
            this.convertToParticles();
        }

//Avoid any changes just a looper looping through a complex grid
        convertToParticles() {
            this.particles = [];
            const pixels = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            for (let y = 0; y < this.canvasHeight; y += this.gap) {
                for (let x = 0; x < this.canvasWidth; x += this.gap) {
                    const index = (y * this.canvasWidth + x) * 4;
                    const alpha = pixels[index + 3];
                    if (alpha > 0) {
                        const red = pixels[index];
                        const green = pixels[index + 1];
                        const blue = pixels[index + 2];
                        const color = 'rgb(' + red + ',' + green + ',' + blue + ')';
                        this.particles.push(new Particle(this, x, y, color));
                    }
                }
            }
        }

        render() {
            this.particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
        }

        resize(width, height) {
            this.canvasWidth = width;
            this.canvasHeight = height;
            this.textX = this.canvasWidth / 2;
            this.textY = this.canvasHeight / 2;
            let baseSize = Math.min(this.canvasWidth, this.canvasHeight);
            this.fontSize = baseSize * 0.19; 
            this.lineHeight = this.fontSize * 1.2; 
            this.maxTextWidth = this.canvasWidth * 0.8;
            
        }
    }

    const effect = new Effect(ctx, canvas.width, canvas.height);
    const displayText = "WELCOME TO FIESTRON EVENTS"; // Idhr text ayega
    effect.wrapText(displayText);
    effect.render();
    //Loops 
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        effect.render();
        requestAnimationFrame(animate);
    }
    animate();

    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        effect.wrapText(displayText); // Re-draw the text
    }, 10);
    
    let resizeTimeout;
    window.addEventListener("resize", function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;

            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
            effect.resize(canvas.width, canvas.height);
            effect.wrapText(displayText); // Re-draw the text
        }, 3000);
    });
});


//ANIMATIONS 
const hiddenElements=document.querySelectorAll(".hidden");
const observer0 = new IntersectionObserver((entries) => {
    entries.forEach((entry) =>{
        if(entry.isIntersecting){
            entry.target.classList.add('show');
            
        }
    })
});


hiddenElements.forEach((element) => {
    observer0.observe(element);
});

//CANVAS KE LIYE---VERY IMP OPMTIMIZED :)
const hidden0=document.querySelector(".hidden0");


const observer1 =new IntersectionObserver((entries) => {
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add('show0');

        }
    })
})
observer1.observe(hidden0);


//Repo KE Liye start ko hi use bhai dekho wan
const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        document.getElementById('resolution').innerHTML = `
            Screen Resolution: ${screenWidth} x ${screenHeight}<br>
            Viewport Size: ${viewportWidth} x ${viewportHeight}
        `;