import { EMOTIONS, EmotionType } from '../../constants/emotionList';

interface EmotionSelectorProps {
    selected: EmotionType;
    onChange: (emotion: EmotionType) => void;
}

const EmotionSelector = ({ selected, onChange }: EmotionSelectorProps) => {

    return (
        <div className="grid grid-cols-3 gap-4">
            {EMOTIONS.map((emotion) => {
                const isSelected = selected === emotion.key;
                return (
                    <button
                        type="button"
                        key={emotion.key}
                        onClick={() => onChange(emotion.key)}
                        className={`
                            flex-center flex-col
                            px-4 py-3 rounded-xl
                            text-white font-semibold
                            ${emotion.bgClass}
                            ${isSelected ? emotion.shadowClass : ''}
                            ${isSelected ? 'scale-105' : ''}
                            hover:brightness-110
                            transition duration-200
                        `}
                    >
                        <div className="text-2xl">{emotion.emoji}</div>
                        <div className="text-sm mt-1">{emotion.label}</div>
                    </button>
                );
            })}
        </div>
    );
}
export default EmotionSelector;
