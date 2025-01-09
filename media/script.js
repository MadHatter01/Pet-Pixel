const canvas = document.getElementById('petCanvas');
const ctx = canvas.getContext('2d');
let x = 150;
let y = 150;
let mousex = x;
let mousey = y;
let radius = 15;
let dx = (Math.random() - 0.5)*4;
let dy = (Math.random() - 0.5)*4;
let isFollowing = false;
let mouseTimeout;
let angle = 0;
let isHovering = false;
let isPatting = false;
canvas.addEventListener('mousemove', (event)=>{
    const rect = canvas.getBoundingClientRect();
    const canvasx = event.clientX - rect.left;
    const canvasy = event.clientY - rect.top;
    mousex = Math.max(0, Math.min(canvasx, canvas.width));
    mousey = Math.max(0, Math.min(canvasy, canvas.height));
    isHovering = true;
    isFollowing = true;


    const distance = Math.hypot(mousex-x, mousey-y);
    isPatting = distance < radius +20;
});

canvas.addEventListener('mouseleave', ()=>{
isHovering = false;
isPatting = false;

})
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

if(isPatting){
    ctx.fillStyle = 'yellow';
    radius = 20;
}
else if (isHovering) {
   
        x = mousex + 30 * Math.cos(angle);
        y = mousey + 30 * Math.sin(angle);
        angle += 0.025; 
        ctx.fillStyle = 'white';
        radius = 10;
    }
else{
    x += dx ;
    y+= dy;

    if(x + radius > canvas.width || x - radius < 0){
        dx = -dx
    }

    if(y + radius > canvas.height || y - radius < 0){
        dy = -dy;
    }
    ctx.fillStyle = 'white';
    radius = 15;
}
    
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
    requestAnimationFrame(animate);
}

animate();
