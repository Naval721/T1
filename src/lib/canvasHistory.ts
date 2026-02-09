// Canvas history management for undo/redo functionality

export interface CanvasHistoryState {
    json: string;
    timestamp: number;
}

export class CanvasHistory {
    private history: CanvasHistoryState[] = [];
    private currentIndex: number = -1;
    private maxHistory: number = 50;
    private isUndoRedoing: boolean = false;

    // Save current canvas state
    saveState(canvasJson: string): void {
        if (this.isUndoRedoing) return;

        // Remove any states after current index (when new action is performed after undo)
        this.history = this.history.slice(0, this.currentIndex + 1);

        // Add new state
        const state: CanvasHistoryState = {
            json: canvasJson,
            timestamp: Date.now()
        };

        this.history.push(state);
        this.currentIndex++;

        // Limit history size
        if (this.history.length > this.maxHistory) {
            this.history.shift();
            this.currentIndex--;
        }
    }

    // Undo to previous state
    undo(): CanvasHistoryState | null {
        if (!this.canUndo()) return null;

        this.isUndoRedoing = true;
        this.currentIndex--;
        const state = this.history[this.currentIndex];
        this.isUndoRedoing = false;

        return state;
    }

    // Redo to next state
    redo(): CanvasHistoryState | null {
        if (!this.canRedo()) return null;

        this.isUndoRedoing = true;
        this.currentIndex++;
        const state = this.history[this.currentIndex];
        this.isUndoRedoing = false;

        return state;
    }

    // Check if undo is possible
    canUndo(): boolean {
        return this.currentIndex > 0;
    }

    // Check if redo is possible
    canRedo(): boolean {
        return this.currentIndex < this.history.length - 1;
    }

    // Clear all history
    clear(): void {
        this.history = [];
        this.currentIndex = -1;
    }

    // Get history stats
    getStats() {
        return {
            total: this.history.length,
            currentIndex: this.currentIndex,
            canUndo: this.canUndo(),
            canRedo: this.canRedo()
        };
    }
}
