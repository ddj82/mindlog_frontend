const Register = () => {
    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">회원가입</h2>
            {/* TODO: 회원가입 폼 구성 */}
            <div className="text-sm text-text-sub dark:text-text-sub-dark">
                이미 계정이 있으신가요? <a href="/login" className="mindlog-link">로그인</a>
            </div>
        </div>
    );
};

export default Register;
