import {useEffect, useState} from "react";
import {getOverallStats} from "../api/api.ts";
import {OverallEmotionStateProps} from "../types/StatsType.ts";

const Stats = () => {
    const [OverallEmotionState, setOverallEmotionState] = useState<OverallEmotionStateProps>()
    
    useEffect(() => {
        getOverallStats().then((data: OverallEmotionStateProps) => {
            console.log(data);
            setOverallEmotionState(data);
        }).catch(err => console.error(err));
    }, []);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">감정 통계</h2>
            {/* TODO: 감정별 비율 차트, 추이 분석 */}
            <div>
                <div>요약</div>
                <div>상위 3개 감정</div>
                <div className="flex gap-4">
                    {OverallEmotionState?.top3Emotions?.map((item, index) => (
                        <div key={index}>
                            <div>{(index + 1)}등</div>
                            <div>{item.emoji}</div>
                            <div>{item.nameKo}</div>
                            <div>{item.percentage}</div>
                        </div>
                    ))}
                </div>
                <div>일기를 작성한 날짜 수</div>
                <div>총 {OverallEmotionState?.daysWithDiary}일</div>
                <div>총 일기 수</div>
                <div>총 {OverallEmotionState?.totalDiaryCount}개</div>
                <div>사용된 감정 수</div>
                <div>{OverallEmotionState?.distinctEmotionCount}개</div>
                <div>첫 작성일 ~ 마지막 작성일 까지 기간</div>
                <div>{OverallEmotionState?.totalDaysInPeriod}일</div>
            </div>
        </div>
    );
};

export default Stats;
