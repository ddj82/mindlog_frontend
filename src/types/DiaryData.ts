import {EmotionType} from "./emotionList.ts";

export interface DiaryData {
    id: number,
    date: Date,
    emotion: EmotionType,
    emotionId: number,
    note: string,
}

export interface EmotionFormData {
    emotionId: number;
    note: string;
    date: string;
}