# 🚀 전지전능: 삼성 SDI 기언연계 RMA 프로젝트 🚀

<img src="./assets/images/main_logo.png" width="600">

<br/>

## 전지전능 서비스 화면

### 📝 로그인

관리자에게 인증받은 아이디로만 로그인할 수 있습니다.

<img src="./assets/images/login.png" width="600">

### 📹 반송 신청

온라인으로 무선 BMS을 이용해 반송을 신청할 수 있습니다.

<img src="./assets/images/request.png" width="600">

### 👤 반송 결과 확인

자신이 신청한 결과를 간편하게 확인할 수 있습니다.

<img src="./assets/images/result.png" width="600">

### 🍱 데이터 분석

삼성SDI의 연구원은 반송 신청된 배터리의 BMS 데이터, VIT 데이터, EKF로 계산한 SOC 데이터를 한눈에 볼 수 있습니다.<br>
또한 AI를 이용한 1차 분석도 볼 수 있습니다.

<img src="./assets/images/main.png" width="600">

### 🎉 반송 처리

이렇게 처리된 데이터를 보고 귀책을 판단해서 반송를 처리할 수 있습니다.

<img src="./assets/images/main2.png" width="600">

### 📝 결과 문서화 자동화, 이메일 전송 자동화

처리된 반송신청은 데이터와 결과를 자동적으로 보고서화, 그리고 고객 이메일로 전송되게 됩니다.

<img src="./assets/images/word.png" width="600">

<br />

## 주요 기능

### 프로젝트 기능

- BMS 데이터 처리 및 계산
  - EKF 알고리즘을 활용해 SOC를 처리 했습니다. 또한 BMS데이터를 시각화되어있습니다.
- RMA 시스템 구축
  - 고객의 반송처리를 관리자가 확인 후 처리할 수 있습니다.
- 일 처리 간편화
  - 데이터 시각화 자동화, 문서화 자동화, 이메일 전송 자동화 등 기존에 비해 일처리가 매우 간편하게 되었습니다.

### 개발환경

- OS
  - Local : Windows
  - AWS : Ubuntu
- IDE
  - IntelliJ IDE
  - Visual Studio Code
- UI / UX
  - Figma
- DataBase
  - MySQL workbench
  - MySQL
  - Redis
  - MongoDB
  - Firebase
- CI/CD
  - Docker
  - nginx
  - Jenkins

### 상세 스택

- BackEnd
  - JAVA 11
  - Gradle
  - SpringBoot 2.7.16, Quarydsl-JPA 5.0.0, Lombok, Swagger3, CertBot
- FrontEnd
  - HTML5, CSS3, JavaScript(ES6)
  - React 18.2.0, React-redux 8.1.1, React-router-dom 6.14.1
  - axios 1.4.0, Material-UI, bootstrap 5.3.0
  - Node.js , npm, env-cmd 10.1.0
  - Web RTC, openvidu-browser
- ETC
  - nginx 1.25.1
  - redix:latest
  - docker

### 협업 툴

- 이슈 관리 : Jira
- 형상 관리 : Gitlab, Git
- 커뮤니케이션 : Notion, MatterMost

### 서비스 아키텍처

<img src="./assets/images/architecture.png" width="600">


### 화면 설계서

<img src="./assets/images/figma.png" width="600">

### Git 컨벤션

### 1. 커밋 유형 지정

- 커밋 유형은 영어 대문자로 작성하기
    
    
    | 커밋 유형 | 아이콘 | 코드 | 의미 |
    | --- | --- | --- | --- |
    | Feat | ➕ | :heavy_plus_sign: | 새로운 기능 추가 |
    | Fix | 🐛 | :bug: | 버그 수정 |
    | Docs | 📝 | :memo: | 문서 수정 ex) .gitignore, swagger, README |
    | Style | ✨ | :sparkles: | 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우 |
    | Test | ✅ | :white_check_mark: | 테스트 코드, 리팩토링 테스트 코드 추가 |
    | Design | 🎨 | :art: | CSS 등 사용자 UI 디자인 변경 |
    | !HOTFIX | 🔥 | :fire: | 급하게 치명적인 버그를 고쳐야 하는 경우 |
    | Merge | 🔀 | :twisted_rightwards_arrows: | 브랜치 합병하는 경우 |
    | Infra | 🌐 | :globe_with_meridians: | 배포 |


### ERD

<img src="./assets/images/erd.png" width="600">

### EC2 포트 정리

| 포트 | 내용 |
| ---- | -------------------- |
| 80   | nginx HTTP 기본 포트  |
| 443  | nginx HTTPS          |

