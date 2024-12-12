const canvas = document.getElementById('petCanvas');
const ctx = canvas.getContext('2d');

let x = 50;
let y = 100;
let dx = 2;
let dy = 0;
let petSize = 20;

function drawPet() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    ctx.beginPath();
    ctx.arc(x, y, petSize, 0, Math.PI * 2);
    ctx.fillStyle = '#FF6347';
    ctx.fill();
    ctx.closePath();

}

function animate() {
    drawPet();
    requestAnimationFrame(animate);
}

animate();
