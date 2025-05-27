import {EmotionType} from "../constants/emotionList.ts";

export interface DiaryData {
    id: number,
    date: Date,
    emotion: EmotionType,
    emotionId: number,
    note: string,
}