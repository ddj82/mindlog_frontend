import {EmotionEmojiType, EmotionLabelType, EmotionType} from "./emotionList.ts";

export interface OverallEmotionStateProps {
    top3Emotions: TopEmotionItem[], //상위 3개 감정
    totalDiaryCount: number, // 기록된 총 일기 수
    distinctEmotionCount: number, // 실제 사용된 감정(고유) 개수
    totalDaysInPeriod: number, // 첫 작성일 ~ 마지막 작성일 까지 기간
    daysWithDiary: number, // 일기를 작성한 날짜 수
}

interface TopEmotionItem {
    emoji: EmotionEmojiType,
    nameEn: EmotionType,
    nameKo: EmotionLabelType,
    percentage: number, // ex: 45.0  (전체 대비 백분율)
}