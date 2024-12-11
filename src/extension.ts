import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const petProvider = new PetProvider();
    vscode.window.registerTreeDataProvider('petPixelPanelView', petProvider);

    console.log('Pet Pixel extension is active!');
}

export function deactivate() {}

class PetProvider implements vscode.TreeDataProvider<PetTreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<PetTreeItem | undefined | void> =
        new vscode.EventEmitter<PetTreeItem | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<PetTreeItem | undefined | void> =
        this._onDidChangeTreeData.event;

    getTreeItem(element: PetTreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: PetTreeItem): PetTreeItem[] {
        if (!element) {
            return [
                new PetTreeItem('🐾 Mew Mew Meooowww!', vscode.TreeItemCollapsibleState.None),
            ];
        }
        return [];
    }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }
}

class PetTreeItem extends vscode.TreeItem {
    constructor(label: string, collapsibleState: vscode.TreeItemCollapsibleState) {
        super(label, collapsibleState);
    }
}
