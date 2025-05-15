export type CharacterGroup = 'lowercase' | 'uppercase' | 'numsym';

export const STAGE_CONFIG = [
    {
        stage: 1,
        buckets: ['numsym', 'lowercase', 'uppercase', 'numsym', 'lowercase', 'uppercase', 'numsym', 'lowercase', 'uppercase', 'numsym'],
    },
    {
        stage: 2,
        buckets: {
            lowercase: ['a-c', 'd-f', 'g-i', 'j-l', 'm-o', 'p-r', 's-t', 'u-v', 'w-x', 'y-z'],
            uppercase: ['A-C', 'D-F', 'G-I', 'J-L', 'M-O', 'P-R', 'S-T', 'U-V', 'W-X', 'Y-Z'],
            numsym: ['0-1', '2-3', '4-5', '6-7', '8-9', '!-@', '#-$', '%-^', '&-*', '_-+']
        }
    },
    {
        stage: 3,
        buckets: Array(10).fill('')
    }
];

export const getStageBuckets = (stage: number, group?: CharacterGroup): string[] => {
    if (stage === 1) return STAGE_CONFIG[0].buckets as string[];
    if (stage === 2 && group) return (STAGE_CONFIG[1].buckets as Record<CharacterGroup, string[]>)[group] ?? [];
    return STAGE_CONFIG[2].buckets as string[];
};

const expandRange = (range: string): string[] => {
    const [start, end] = range.split('-');
    if (!start || !end) return [];

    const startCode = start.charCodeAt(0);
    const endCode = end.charCodeAt(0);

    const chars = [];
    for (let code = startCode; code <= endCode; code++) {
        chars.push(String.fromCharCode(code));
    }
    return chars;
};

export const generateStage3Buckets = (range: string): string[] => {
    const expanded = expandRange(range);
    if (expanded.length === 0) return Array(10).fill('');
    const result = [];
    for (let i = 0; i < 10; i++) {
        result.push(expanded[i % expanded.length]);
    }
    return result;
};