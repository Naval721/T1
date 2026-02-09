// Global template system for jersey design positions
// Once set, positions apply to ALL players

export interface TextTemplate {
    text?: string; // Template doesn't store actual text, only position/style
    left: number;
    top: number;
    fontSize: number;
    fontFamily: string;
    fill: string;
    stroke: string;
    strokeWidth: number;
    angle: number;
    textAlign: string;
    width?: number;
    height?: number;
    originX: 'center';
    originY: 'center';
}

export interface LogoTemplate {
    src?: string; // Template doesn't store actual src, only position/style  
    left: number;
    top: number;
    scaleX: number;
    scaleY: number;
    angle: number;
    originX: 'center';
    originY: 'center';
}

export interface ViewTemplate {
    name?: TextTemplate;
    number?: TextTemplate;
    customTexts?: TextTemplate[];
    customLogos?: LogoTemplate[];
}

export interface DesignTemplate {
    front?: ViewTemplate;
    back?: ViewTemplate;
    leftSleeve?: ViewTemplate;
    rightSleeve?: ViewTemplate;
    collar?: ViewTemplate;
    lastModified?: number;
}

const TEMPLATE_STORAGE_KEY = 'jerseyDesigner:globalTemplate';

export const saveGlobalTemplate = (template: DesignTemplate): void => {
    try {
        const dataToSave = {
            ...template,
            lastModified: Date.now()
        };
        localStorage.setItem(TEMPLATE_STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (error) {
        console.error('Failed to save global template:', error);
    }
};

export const loadGlobalTemplate = (): DesignTemplate | null => {
    try {
        const raw = localStorage.getItem(TEMPLATE_STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (error) {
        console.error('Failed to load global template:', error);
        return null;
    }
};

export const clearGlobalTemplate = (): void => {
    try {
        localStorage.removeItem(TEMPLATE_STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear global template:', error);
    }
};

export const hasGlobalTemplate = (): boolean => {
    try {
        return localStorage.getItem(TEMPLATE_STORAGE_KEY) !== null;
    } catch {
        return false;
    }
};

export const getTemplateLastModified = (): Date | null => {
    const template = loadGlobalTemplate();
    if (!template?.lastModified) return null;
    return new Date(template.lastModified);
};
