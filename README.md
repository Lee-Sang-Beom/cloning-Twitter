Project - Switter
======================

## 1. 프로젝트 계획 이유
[**Switter**](https://lee-sang-beom.github.io/switter/#/) : 기본적으로 익힌 HTML, CSS, JS을 기반으로, 높은 실사용률을 지닌 JS 프레임워크인 React를 활용하는 방법을 익히기 위해 해당 프로젝트를 계획하였습니다. 또한, Firebase를 이용해 인증, 사용자 프로필, 채팅 데이터 등을 관리하여 간단한 채팅 프로그램을 제작하였습니다.

### - 제공기능
	1. 회원가입, 로그인, 로그아웃 기능 (Firebase, Google, Github)
	2. 사용자 프로필 관리 기능
	3. 텍스트, 이미지 기반 채팅 기능
    4. 채팅 수정, 삭제 기능


## 2. 설치
 > 프로그램 실행을 위한 설치과정을 기술합니다.

### 2.1 Node.js 설치
 - React 실행을 위해, Node.js가 사전에 설치되어 있어야 합니다.

### 2.2 React 설치

 - Node.js 설치 후, React를 설치합니다.
```
npm install -g create-react-app
```

 - 설치 확인은 아래의 명령어를 사용하여 확인할 수 있습니다.
```
npm -v
```

 - 실행
```
npm start
```

### 2.3 Firebase 설치
 - 데이터 관리를 위해 사용하는 데이터베이스인 Firebase를 설치합니다.
```
npm install firebase
```

### 2.4 기타 사용 라이브러리 : font Awesome
 - 먼저 Font Awesome의 SVG 기반 아이콘을 활성화 시키기 위한 기본 패키지인 @fortawesome/fontawesome-svg-core를 설치합니다.
```
npm i @fortawesome/fontawesome-svg-core
```

 - Font Awesome을 React 컴포넌트 형태로 사용할 수 있도록 해주는 @fortawesome/react-fontawesome 이라는 패키지를 설치합니다.
```
npm i @fortawesome/react-fontawesome
```