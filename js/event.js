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


//Repo KE Liye start ko hi use bhai dekho wan
// const screenWidth = window.screen.width;
//         const screenHeight = window.screen.height;

//         const viewportWidth = window.innerWidth;
//         const viewportHeight = window.innerHeight;

//         document.getElementById('resolution').innerHTML = `
//             Screen Resolution: ${screenWidth} x ${screenHeight}<br>
//             Viewport Size: ${viewportWidth} x ${viewportHeight}
//         `;