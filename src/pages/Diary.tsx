import EmotionForm from '../components/emotion/EmotionForm';
import {saveDiary} from "../api/api.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import CommonAlert from "../util/CommonAlert.tsx";
import {EmotionFormData} from "../types/DiaryData.ts";

const Diary = () => {
    const navigate = useNavigate();
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertContent, setAlertContent] = useState("");

    const handleEmotionSubmit = async (data: EmotionFormData) => {
        console.log('폼 제출 결과:', data);
        try {
            const res = await saveDiary(data);
            handleAlert(res);
        } catch (e) {
            console.error('일기 등록 API 실패', e);
            handleAlert('일기 등록 실패');
        }
    };

    const handleAlert = (content: string) => {
        setAlertOpen(true);
        setAlertContent(content);
    }

    const handleAlertResponse = (result: boolean) => {
        if (result) navigate('/calendar');
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">감정 기록하기</h2>
            <EmotionForm onSubmit={handleEmotionSubmit} />
            {alertOpen && (
                <CommonAlert
                    isOpen={alertOpen}
                    onRequestClose={() => setAlertOpen(false)}
                    content={alertContent}
                    alertResponse={handleAlertResponse}
                />
            )}
        </div>
    );
};

export default Diary;
