import React, {useEffect, useState} from "react";
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import {EMOTIONS, EmotionType} from '../types/emotionList.ts';
import '../css/EmotionCalendar.css';
import {DiaryData, EmotionFormData} from "../types/DiaryData.ts";
import dayjs from 'dayjs';
import {deleteDiary, fetchMonthlyDiaries, updateDiary} from "../api/api.ts";
import CommonAlert from "../util/CommonAlert.tsx";
import CommonModal from "../util/CommonModal.tsx";
import EmotionForm from "../components/emotion/EmotionForm.tsx";

const getEmotionMeta = (key: EmotionType) => EMOTIONS.find(e => e.key === key)!;
const EmotionCalendar: React.FC = () => {
    // 기존: value는 '선택된 날짜' 용도
    const [value, setValue] = useState<Date>(new Date());
    // 추가: 현재 보여지는 달의 시작일
    const [activeStartDate, setActiveStartDate] = useState<Date | undefined>(new Date());

    // 월별 조회된 다이어리 원본 데이터
    const [monthData, setMonthData] = useState<Record<string, DiaryData[]>>({});
    // 선택된 날짜 및 해당 일기 리스트
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedEntries, setSelectedEntries] = useState<DiaryData[]>([]);

    const todayKey = dayjs().format('YYYY-MM-DD');

    // 모달 오픈/닫기 및 내용 저장용 state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContentDiary, setModalContentDiary] = useState<DiaryData>({
        date: new Date(),
        emotion: "",
        id: 0,
        emotionId: 0,
        note: ""
    });

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertContent, setAlertContent] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedDiaryId, setSelectedDiaryId] = useState(0);
    const [updateModal, setUpdateModal] = useState(false);

    useEffect(() => {
        if (!selectedDate) {
            setSelectedDate(todayKey);
            return;
        }

        // monthData가 준비된 후에 selectedEntries 세팅
        if (monthData[selectedDate]) {
            setSelectedEntries(monthData[selectedDate]);
        } else {
            setSelectedEntries([]);
        }
    }, [monthData, selectedDate]);

    // (달) 변경 시 API 호출
    useEffect(() => {
        if (!activeStartDate) return;  // null일 땐 API 호출하지 않음
        const year = activeStartDate.getFullYear();
        const month = activeStartDate.getMonth() + 1;
        fetchMonthlyDiaries(year, month)
            .then((data: DiaryData[]) => {
                const map: Record<string, DiaryData[]> = {};
                data.forEach(item => {
                    const key = dayjs(item.date).format('YYYY-MM-DD');
                    if (!map[key]) map[key] = [];
                    map[key].push(item);
                });
                setMonthData(map);
                console.log("api 리스폰스", map);
                // (선택일이 새 달에 포함되어 있으면 엔트리 초기화)
                setSelectedEntries(map[selectedDate] || []);
            })
            .catch(err => console.error(err));
    }, [activeStartDate]);

    // ——— 미리보기용 boolean 계산 ———
    const isSameMonth = React.useMemo(() => {
        if (!activeStartDate || !selectedDate) return false;
        return dayjs(selectedDate).isSame(activeStartDate, 'month');
    }, [activeStartDate, selectedDate]);

    // 날짜 클릭 시 해당 날짜 일기 조회
    const onDateClick = (date: Date) => {
        const key = dayjs(date).format('YYYY-MM-DD');
        setSelectedDate(key);
        setSelectedEntries(monthData[key] || []);
    };

    // 날짜 타일 클래스
    const tileClassName = ({ view }: { view: string }) => {
        if (view !== 'month') return '';
        return 'rounded-xl transition-all focus:outline-none';
    };

    // 날짜 타일 콘텐츠
    const tileContent = ({ date, view }: { date: Date; view: string }) => {
        if (view !== 'month') return null;
        const key = dayjs(date).format('YYYY-MM-DD');
        const entries = monthData[key];
        if (entries && entries.length > 0) {
            const { emoji } = getEmotionMeta(entries[entries.length - 1].emotion);
            return <span className="emoji md:text-lg inline-block mt-1">{emoji}</span>;
        }
        if (key === todayKey) {
            return <span className="text-xs block mt-1">today</span>;
        }
        return null;
    };

    // const diaryUpdate1 = async (modalDiary: DiaryData) => {
    //     const emotions = ['기쁨', '평온', '슬픔', '분노', '불안', '무감정'];
    //     const originalNote = modalDiary.note;
    //     console.log(modalDiary);
    //
    //     // 감정 단어 중 가장 먼저 나오는 위치를 찾음
    //     const emotionMatch = emotions
    //         .map(emotion => ({ emotion, index: originalNote.indexOf(emotion) }))
    //         .filter(({ index }) => index !== -1)
    //         .sort((a, b) => a.index - b.index)[0];
    //
    //     if (!emotionMatch) {
    //         console.error("감정 단어를 찾을 수 없습니다.");
    //         return;
    //     }
    //
    //     const noteHeaderEndIndex = originalNote.indexOf(emotionMatch.emotion) + emotionMatch.emotion.length;
    //     const noteHeader = originalNote.substring(0, noteHeaderEndIndex).trimEnd();
    //     const currentNote = originalNote.substring(noteHeaderEndIndex).trimStart();
    //
    //     // 여기서 사용자로부터 새 본문 내용 입력 받는다고 가정
    //     const newNote = prompt("일기 내용을 수정하세요:", currentNote);
    //
    //     // 사용자가 취소한 경우
    //     if (newNote === null) return;
    //
    //     modalDiary.note = `${noteHeader}\n${newNote}`;
    //
    //     // 수정 api호출
    //     try {
    //         // const res = await updateDiary(modalDiary);
    //         // handleAlert(res);
    //         window.location.reload();
    //     } catch (e) {
    //         console.error('일기 수정 API 실패', e);
    //         // handleAlert('일기 수정 실패');
    //     }
    // };

    const diaryUpdate = (id: number) => {
        setUpdateModal(true);
        setSelectedDiaryId(id);
    }

    const handleDelete = (id: number) => {
        setConfirmOpen(true);
        setSelectedDiaryId(id);
    }

    const handleConfirm = async (result: boolean) => {
        setConfirmOpen(false);
        if (result) {
            try {
                const res = await deleteDiary(selectedDiaryId);
                handleAlert(res);
            } catch (e) {
                console.error('일기 삭제 API 실패', e);
                handleAlert('일기 삭제 실패');
            }
        }
    };

    const handleAlert = (content: string) => {
        setAlertOpen(true);
        setAlertContent(content);
    }

    const handleAlertResponse = (result: boolean) => {
        if (result) window.location.reload();
    }


    const handleUpdate = async (data: EmotionFormData) => {
        console.log('폼 제출 결과:', data);
        try {
            const res = await updateDiary(selectedDiaryId, data);
            handleAlert(res);
        } catch (e) {
            console.error('일기 수정 API 실패', e);
            handleAlert('일기 수정 실패');
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">감정 캘린더</h2>
            <Calendar
                calendarType="gregory" // iso8601 - 월요일 부터
                // 날짜 클릭(일기 목록만 바꿔줌)
                onClickDay={onDateClick}
                value={value}
                // 날짜 선택시 포커스 이동도 원하시면 아래 onChange로 value 갱신
                onChange={d => setValue(d as Date)}

                // ← → 또는 << >> 눌러서 달이 바뀔 때
                onActiveStartDateChange={({ activeStartDate }) => {
                    // activeStartDate는 Date|null 이지만 null이 들어오면 undefined로 분기 처리
                    setActiveStartDate(activeStartDate ?? undefined);
                }}
                // Calendar에게 보여줄 달 지정
                activeStartDate={activeStartDate}
                tileClassName={tileClassName}
                tileContent={tileContent}
                className="w-fit md:mx-14 p-4 rounded-lg shadow-md"
                prevLabel="‹"
                nextLabel="›"
                formatMonthYear={(_, date) => date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
            />

            {selectedEntries.length > 0 ? (
                <div className="mt-6">
                    <h3 className="text-xl text-text-main dark:text-text-main-dark font-semibold mb-2">
                        {isSameMonth ? `${selectedDate} 일기` : '날짜를 선택해주세요'}
                    </h3>
                    <ul className="space-y-2">
                        {selectedEntries.map(entry => {
                            const { shadowClass, borderColor } = getEmotionMeta(entry.emotion);
                            return (
                                <li
                                    key={entry.id}
                                    className={`flex items-center p-3 rounded-lg border-2 ${borderColor} ${shadowClass} focus:outline-none cursor-pointer transition hover:brightness-110 hover:scale-105`}
                                    onClick={() => {
                                        setModalContentDiary(entry);
                                        setIsModalOpen(true);
                                    }}
                                >
                                    <p className="text-text-main dark:text-text-main-dark">{entry.note}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ) : (
                <div className="mt-6">
                    <h3 className="text-xl text-text-main dark:text-text-main-dark font-semibold mb-2">
                        {isSameMonth ? `${selectedDate} 일기` : '날짜를 선택해주세요'}
                    </h3>
                </div>
            )}
            {/* 모달 */}
            {isModalOpen && (
                <CommonModal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    title={"일기"}
                    widthClassName={"md:w-[40%] w-[90%]"}
                    heightClassName={"h-[50%]"}
                    customClassName={"rounded-xl px-4"}
                    contentClassName={"md:!w-full md:h-[74%] h-[76%] flex flex-col justify-between"}
                >
                    <div className="bg-mindlog-light dark:bg-mindlog-dark"
                         onClick={(e) => e.stopPropagation()}
                    >
                        <p className="mb-6 whitespace-pre-wrap">{modalContentDiary.note}</p>
                    </div>
                    <div className="flex gap-2 justify-end">
                        {dayjs(modalContentDiary.date).format('YYYY-MM-DD') === todayKey && (
                            <>
                                <button
                                    type="button"
                                    className="p-2 px-3 mindlog-btn mindlog-btn-hover text-white text-sm rounded transition"
                                    onClick={() => handleDelete(modalContentDiary.id)}
                                >
                                    삭제
                                </button>
                                <button
                                    type="button"
                                    className="p-2 px-3 mindlog-btn mindlog-btn-hover text-white text-sm rounded transition"
                                    onClick={() => diaryUpdate(modalContentDiary.id)}
                                >
                                    수정
                                </button>
                            </>
                        )}
                    </div>
                </CommonModal>
            )}

            {updateModal && (
                <CommonModal
                    isOpen={updateModal}
                    onRequestClose={() => setUpdateModal(false)}
                    title={"수정"}
                    widthClassName={"md:w-[40%] w-[90%]"}
                    heightClassName={"h-fit"}
                    customClassName={"rounded-xl px-4"}
                    contentClassName={"md:!w-full md:h-[74%] h-[76%] flex flex-col justify-between pb-8"}
                >
                    <EmotionForm
                        mode="edit"
                        initialData={modalContentDiary}
                        onSubmit={handleUpdate}
                    />
                </CommonModal>
            )}

            {confirmOpen && (
                <CommonAlert
                    isOpen={confirmOpen}
                    onRequestClose={() => setConfirmOpen(false)}
                    content={'정말 삭제할까요? \n 삭제하면 다시 복원할 수 없습니다!'}
                    confirm={true}
                    confirmResponse={handleConfirm}
                />
            )}

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

export default EmotionCalendar;
