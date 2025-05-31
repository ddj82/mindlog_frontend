import {useEffect, useState} from 'react';
import EmotionSelector from './EmotionSelector';
import {EMOTIONS, EmotionType} from '../../constants/emotionList';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import weekday from 'dayjs/plugin/weekday';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.locale('ko'); // ✅ 한국어 설정
dayjs.extend(weekday); // ✅ 요일 계산
dayjs.extend(localizedFormat); // ✅ 요일 포맷

interface EmotionFormProps {
    onSubmit: (data: { emotionId: number; note: string; date: any }) => void;
}

const EmotionForm = ({ onSubmit }: EmotionFormProps) => {
    const [emotion, setEmotion] = useState<EmotionType>('joy');
    const [emotionId, setEmotionId] = useState(1);
    const emotionMeta = EMOTIONS.find((e) => e.key === emotion);

    const getTodayString = () => {
        return dayjs().format('YYYY년 M월 D일 (ddd)');
    };

    const getDefaultNote = () => {
        return `${getTodayString()}\n오늘의 감정: ${emotionMeta?.emoji} ${emotionMeta?.label}\n`;
    };

    const [note, setNote] = useState(getDefaultNote());

    useEffect(() => {
        setNote(getDefaultNote());
        if (emotionMeta) setEmotionId(emotionMeta.emotionId);
    }, [emotion]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const today = dayjs().format('YYYY-MM-DD');
        onSubmit({ emotionId, note, date: today });
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* 감정 선택 */}
            <div>
                <h3 className="text-lg font-semibold mb-2">오늘의 감정</h3>
                <EmotionSelector selected={emotion} onChange={setEmotion} />
            </div>

            {/* 일기 작성 */}
            <div>
                <h3 className="text-lg font-semibold mt-6 mb-2">간단한 일기</h3>
                <textarea
                    className={`
                        w-full border border-gray-300 p-3 rounded-lg focus:outline-none
                        bg-mindlog-light dark:bg-mindlog-dark focus:ring-2
                        ${emotionMeta?.ringClass ?? ''}
                    `}
                    rows={10}
                    placeholder="오늘 있었던 일을 간단히 기록해보세요..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </div>

            {/* 제출 버튼 */}
            <button
                type="submit"
                className="w-full mindlog-btn mindlog-btn-hover py-3 rounded-lg transition font-semibold"
            >
                기록 저장하기
            </button>
        </form>
    );
};

export default EmotionForm;
