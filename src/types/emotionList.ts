export interface Emotion {
    key: string,
    label: string,
    emoji: string,
    emotionId: number,
    bgClass: string,
    shadowClass: string,
    ringClass: string,
    borderColor: string,
}

export const EMOTIONS = [
    { key: 'joy', label: '기쁨', emoji: '😊', emotionId: 1,
        bgClass: 'bg-emotion-joy',
        shadowClass: 'shadow-emotion-joy',
        ringClass: 'focus:ring-[#FFD54F]',
        borderColor: 'border-emotion-joy',
    },
    { key: 'calm', label: '평온', emoji: '😌', emotionId: 2,
        bgClass: 'bg-emotion-calm',
        shadowClass: 'shadow-emotion-calm',
        ringClass: 'focus:ring-[#81C784]',
        borderColor: 'border-emotion-calm',
    },
    { key: 'sadness', label: '슬픔', emoji: '😢', emotionId: 3,
        bgClass: 'bg-emotion-sadness',
        shadowClass: 'shadow-emotion-sadness',
        ringClass: 'focus:ring-[#64B5F6]',
        borderColor: 'border-emotion-sadness',
    },
    { key: 'anger', label: '분노', emoji: '😠', emotionId: 4,
        bgClass: 'bg-emotion-anger',
        shadowClass: 'shadow-emotion-anger',
        ringClass: 'focus:ring-[#E57373]',
        borderColor: 'border-emotion-anger',
    },
    { key: 'anxiety', label: '불안', emoji: '😨', emotionId: 5,
        bgClass: 'bg-emotion-anxiety',
        shadowClass: 'shadow-emotion-anxiety',
        ringClass: 'focus:ring-[#BA68C8]',
        borderColor: 'border-emotion-anxiety',
    },
    { key: 'neutral', label: '무감정', emoji: '😶', emotionId: 6,
        bgClass: 'bg-emotion-neutral',
        shadowClass: 'shadow-emotion-neutral',
        ringClass: 'focus:ring-[#BDBDBD]',
        borderColor: 'border-emotion-neutral',
    },
];



export type EmotionType = (typeof EMOTIONS)[number]['key'];
export type EmotionIdType = (typeof EMOTIONS)[number]['emotionId'];
