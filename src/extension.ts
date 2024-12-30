import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

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

        const scriptPath = vscode.Uri.file(
            path.join(this._context.extensionPath, 'media', 'script.js')
        );
        const scriptUri = webviewView.webview.asWebviewUri(scriptPath);
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
                            <script src="${scriptUri}"></script>

            </body>
            </html>
        `;
    }
}
