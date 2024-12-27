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
                   let radius = 10;
                   let dx = 1;
                   let dy = 1;
                    function animate(){
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.fillStyle = 'white';
                        ctx.beginPath();
                        ctx.arc(x, y, 10, 0, Math.PI * 2);
                        ctx.fill();

                        x += dx;
                        y += dy;

                        if(x + radius > canvas.width || x - radius < 0){
                            dx = (Math.random() - 0.5)*2;
                            dx = -dx;
                        }

                        if(y + radius > canvas.height || y - radius < 0){
                            dy = (Math.random() - 0.5)*2;
                            dy = -dy;
                        }

                        requestAnimationFrame(animate);
                    }

                    animate();
                </script>
            </body>
            </html>
        `;
    }
}
