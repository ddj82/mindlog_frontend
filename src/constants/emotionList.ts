export const EMOTIONS = [
    { key: 'joy', label: '기쁨', emoji: '😊',
        bgClass: 'bg-emotion-joy',
        shadowClass: 'shadow-emotion-joy',
        ringClass: 'focus:ring-[#FFD54F]',
        borderColor: 'border-emotion-joy',
    },
    { key: 'calm', label: '평온', emoji: '😌',
        bgClass: 'bg-emotion-calm',
        shadowClass: 'shadow-emotion-calm',
        ringClass: 'focus:ring-[#81C784]',
        borderColor: 'border-emotion-calm',
    },
    { key: 'sadness', label: '슬픔', emoji: '😢',
        bgClass: 'bg-emotion-sadness',
        shadowClass: 'shadow-emotion-sadness',
        ringClass: 'focus:ring-[#64B5F6]',
        borderColor: 'border-emotion-sadness',
    },
    { key: 'anger', label: '분노', emoji: '😠',
        bgClass: 'bg-emotion-anger',
        shadowClass: 'shadow-emotion-anger',
        ringClass: 'focus:ring-[#E57373]',
        borderColor: 'border-emotion-anger',
    },
    { key: 'anxiety', label: '불안', emoji: '😨',
        bgClass: 'bg-emotion-anxiety',
        shadowClass: 'shadow-emotion-anxiety',
        ringClass: 'focus:ring-[#BA68C8]',
        borderColor: 'border-emotion-anxiety',
    },
    { key: 'neutral', label: '무감정', emoji: '😶',
        bgClass: 'bg-emotion-neutral',
        shadowClass: 'shadow-emotion-neutral',
        ringClass: 'focus:ring-[#BDBDBD]',
        borderColor: 'border-emotion-neutral',
    },
];



export type EmotionType = (typeof EMOTIONS)[number]['key'];
