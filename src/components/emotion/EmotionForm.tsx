import {useEffect, useState} from 'react';
import EmotionSelector from './EmotionSelector';
import {EMOTIONS, EmotionType} from '../../types/emotionList.ts';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import weekday from 'dayjs/plugin/weekday';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import CommonAlert from "../../util/CommonAlert.tsx";
import {DiaryData, EmotionFormData} from "../../types/DiaryData.ts";

dayjs.locale('ko'); // ✅ 한국어 설정
dayjs.extend(weekday); // ✅ 요일 계산
dayjs.extend(localizedFormat); // ✅ 요일 포맷

interface EmotionFormProps {
    mode?: 'add' | 'edit';
    initialData?: DiaryData;
    onSubmit: (data: EmotionFormData) => void;
}

const EmotionForm = ({
                         mode = 'add',
                         initialData,
                         onSubmit,
}: EmotionFormProps) => {
    // edit 모드면 initialData, 아니면 기본(joy + 오늘 포맷)
    const initialEmotionKey = initialData
        ? EMOTIONS.find(e => e.emotionId === initialData.emotionId)?.key ?? 'joy' : 'joy';
    const [emotion, setEmotion] = useState<EmotionType>(initialEmotionKey);
    const [emotionId, setEmotionId] = useState(
        initialData?.emotionId ?? EMOTIONS.find(e => e.key === initialEmotionKey)!.emotionId
    );
    // 날짜도 edit 모드면 그대로, 아니면 오늘
    const date = initialData?.date ? dayjs(initialData.date).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD');
    const emotionMeta = EMOTIONS.find((e) => e.key === emotion);
    const [note, setNote] = useState(
        initialData?.note ?? `${dayjs().format('YYYY년 M월 D일 (ddd)')}\n오늘의 감정: ${emotionMeta?.emoji} ${emotionMeta?.label}\n`
    );
    const [confirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        // 추가 모드일 때만 기본 노트 갱신
        if (mode === 'add') {
            setNote(
                `${dayjs().format('YYYY년 M월 D일 (ddd)')}\n오늘의 감정: ${emotionMeta?.emoji} ${emotionMeta?.label}\n`
            );
        }
        if (emotionMeta) setEmotionId(emotionMeta.emotionId);
    }, [emotion]);

    const handleConfirm = (result: boolean) => {
        setConfirmOpen(false);
        if (result) handleSubmit();
    };

    const handleSubmit = () => {
        onSubmit({ emotionId, note, date });
    };

    return (
        <form>
            {/* 감정 선택 */}
            {mode === 'add' && (
                <div>
                    <h3 className="text-lg font-semibold mb-2">오늘의 감정</h3>
                    <EmotionSelector selected={emotion} onChange={setEmotion} />
                </div>
            )}

            {/* 일기 작성 */}
            <div>
                <h3
                    className={`
                    text-lg font-semibold 
                    ${mode === 'add' ? 'mt-6 mb-2' : 'mb-4'}
                    `}
                >

                    {mode === 'add' ? '간단한 일기' : '간단한 일기'}
                </h3>

                <textarea
                    className={`
                        w-full border border-gray-300 p-3 mb-2 rounded-lg focus:outline-none
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
                type="button"
                className="w-full mindlog-btn mindlog-btn-hover py-3 rounded-lg transition font-semibold"
                onClick={() => setConfirmOpen(true)}
            >
                {mode === 'add' ? '기록 저장하기' : '수정하기'}
            </button>

            {confirmOpen && (
                <CommonAlert
                    isOpen={confirmOpen}
                    onRequestClose={() => setConfirmOpen(false)}
                    confirm={true}
                    confirmResponse={handleConfirm}
                    content={mode === 'add' ? '저장 하시겠습니까?' : '수정 하시겠습니까?'}
                />
            )}
        </form>
    );
};

export default EmotionForm;
