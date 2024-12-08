
import * as vscode from 'vscode';
export function activate(context: vscode.ExtensionContext) {
	
	console.log('Congratulations, your extension "pet-pixel" is now active!');
	const disposable = vscode.commands.registerCommand('pet-pixel.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from pet pixel!');
	});
	const openPetCommand = vscode.commands.registerCommand('extension.openPet', () => {
        const panel = vscode.window.createWebviewPanel(
            'petPanel',
            'VS Code Pet',
            vscode.ViewColumn.One,
            { enableScripts: true }
        );

        panel.webview.html = getWebviewContent();
   
    });

    context.subscriptions.push(openPetCommand);

	context.subscriptions.push(disposable);
}
export function deactivate() {}
function getWebviewContent() {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: Arial, sans-serif; }
                .pet { font-size: 24px; }
            </style>
        </head>
        <body>
            <div class="pet">🐾 Meow!</div>
    
        </body>
        </html>
    `;
}