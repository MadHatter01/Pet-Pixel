import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const petPixelViewProvider = new PetPixelViewProvider(context);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('petPixelPanelView', petPixelViewProvider)
    );

    console.log('Pet Pixel extension is active!');
}

export function deactivate() {}

class PetPixelViewProvider implements vscode.WebviewViewProvider {
    private _context: vscode.ExtensionContext;

    constructor(context: vscode.ExtensionContext) {
        this._context = context;
    }

    resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        token: vscode.CancellationToken
    ) {
        webviewView.webview.options = { enableScripts: true };
        webviewView.webview.html = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        background-color: #1e1e1e;
                        overflow:hidden;
                    }
                    canvas {
                        border: 1px solid #555;
                    }
                </style>
            </head>
            <body>
                <canvas id="petCanvas" width="150" height="150"></canvas>
                <script>

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
                         mousex = event.clientX - rect.left;
                         mousey = event.clientY - rect.top;
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
                            angle += 0.05; 
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
                </script>
            </body>
            </html>
        `;
    }
}
