/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: "class", // 다크모드 클래스 방식
    theme: {
        extend: {
            colors: {
                // 메인 컬러 (로고, 버튼 등)
                mindlog: {
                    DEFAULT: "#c76b5d", // = mindlog-500
                    //밝은
                    100: "#fde8e4",
                    200: "#facfc8",
                    300: "#f3a69b",
                    400: "#e87d6d",

                    // 어두운
                    600: "#a5554c",
                    700: "#8b443e",
                    800: "#6f332f",
                    900: "#55241f",
                },

                "mindlog-light": "#fffaf0", // 라이트 모드 배경
                "mindlog-dark": "#1b1f24",  // 다크 모드 배경

                // 텍스트 (라이트)
                'text-main': '#4B5563',  // gray-700
                'text-sub': '#6B7280',   // gray-600

                // 텍스트 (다크)
                'text-main-dark': '#F3F4F6', // gray-100
                'text-sub-dark': '#9CA3AF',  // gray-400

                emotion: {
                    joy: '#FFD54F', // 기쁨
                    calm: '#81C784', // 평온
                    sadness: '#64B5F6', // 슬픔
                    anger: '#E57373', // 분노
                    anxiety: '#BA68C8', // 불안
                    neutral: '#BDBDBD', // 무감정
                },
            },
            boxShadow: {
                'emotion-joy': '0 2px 6px rgba(255, 213, 79, 0.25)',
                'emotion-calm': '0 2px 6px rgba(129, 199, 132, 0.25)',
                'emotion-sadness': '0 2px 6px rgba(100, 181, 246, 0.25)',
                'emotion-anger': '0 2px 6px rgba(229, 115, 115, 0.25)',
                'emotion-anxiety': '0 2px 6px rgba(186, 104, 200, 0.25)',
                'emotion-neutral': '0 2px 6px rgba(189, 189, 189, 0.25)',
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            addUtilities({
                '.scrollbar-hidden': {
                    /* 크로스 브라우저 스크롤바 숨기기 */
                    'scrollbar-width': 'none', /* Firefox */
                    '&::-webkit-scrollbar': {
                        display: 'none', /* Chrome, Safari */
                    },
                },
                '.flex-center': {
                    display: 'flex',
                    'align-items': 'center',
                    'justify-content': 'center',
                },
                '.font-title': {
                    fontWeight: 'bold',
                    fontSize: '1.125rem',
                    lineHeight: '1.75rem',
                },
                '.text-xxs': {
                    fontSize: '0.6rem',
                    lineHeight: '1rem',
                },
                '.text-xxxs': {
                    fontSize: '0.3rem',
                    lineHeight: '0.4rem',
                },
                '.text-xxl': {
                    fontSize: '1.5rem',
                    lineHeight: '2rem',
                },
                '.text-xxxl': {
                    fontSize: '2rem',
                    lineHeight: '2.5rem',
                },
            });
        },
    ],
}
