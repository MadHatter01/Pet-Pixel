const canvas = document.getElementById('petCanvas');
const ctx = canvas.getContext('2d');
let x = 150;
let y = 150;
let mousex = x;
let mousey = y;
let radius = 10;
let dx = (Math.random() - 0.5)*4;
let dy = (Math.random() - 0.5)*4;
let isFollowing = false;
let mouseTimeout;
let angle = 0;
let isHovering = false;
canvas.addEventListener('mousemove', (event)=>{
    const rect = canvas.getBoundingClientRect();
    const canvasx = event.clientX - rect.left;
    const canvasy = event.clientY - rect.top;
    mousex = Math.max(0, Math.min(canvasx, canvas.width));
    mousey = Math.max(0, Math.min(canvasy, canvas.height));
    isHovering = true;
    isFollowing = true;
});

canvas.addEventListener('mouseleave', ()=>{
isHovering = false;

})
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

if (isHovering) {
   
        x = mousex + 30 * Math.cos(angle);
        y = mousey + 30 * Math.sin(angle);
        angle += 0.01; 
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
}
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
    requestAnimationFrame(animate);
}

animate();
