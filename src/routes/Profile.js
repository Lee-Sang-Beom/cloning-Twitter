import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router-dom/";
import { Profiler } from "react/cjs/react.production.min";

// 해당 페이지에는 로그아웃 버튼이 있음
export default function Profile() {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }
    return (
    <>
        <button onClick={onLogOutClick}>
            Log Out
        </button>
    </>
    )
}

