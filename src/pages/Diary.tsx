import EmotionForm from '../components/emotion/EmotionForm';
import {saveDiary} from "../api/api.ts";
import {useNavigate} from "react-router-dom";

const Diary = () => {
    const navigate = useNavigate();
    const handleEmotionSubmit = async (data: { emotionId: number; note: string; date: string; }) => {
        console.log('폼 제출 결과:', data);
        try {
            const res = await saveDiary(data.emotionId, data.note, data.date);
            // console.log(res);
            alert(res);
            navigate('/calendar');
        } catch (e) {
            console.error('일기 등록 API 실패', e);
            alert('일기 등록 실패');
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">감정 기록하기</h2>
            <EmotionForm onSubmit={handleEmotionSubmit} />
        </div>
    );
};

export default Diary;
