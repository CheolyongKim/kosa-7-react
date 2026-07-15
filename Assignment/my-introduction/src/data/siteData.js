const SITE_DATA = {

  nav: {
    logo: "CHEOLYONG",
    links: [
      { label: "Tech", id: "tech" },
      { label: "Projects", id: "projects" },
      { label: "Timeline", id: "timeline" }
    ],
    ctaLabel: "Contact",
    ctaId: "contact"
  },

  hero: {
    titleTop: "본질을 고민하는,",
    titleBottom: "개발자 김철용.",
    rotatingPrefix: "저는",
    rotatingWords: ["C/C++", "Java", "Python", "Oracle", "AI"],
    rotatingSuffix: "을 다루며 성장 중입니다."
  },

  stickyText: {
    words: "일상 속에서 창의적인 아이디어를 발견하고 구체화합니다. 언어, 프레임워크, 인공지능, 쏟아지는 기술 속에서 변하지 않는 본질에 대해 생각합니다. 배움에 있어 발산 - 수렴 Two Track의 유연한 사고를 갖추고 있습니다.".split(" ")
  },

  tech: {
    label: "Core Tech Stack",
    items: [
      {
        name: "Java",
        desc: "안정적인 백엔드 아키텍처 및 객체지향 설계를 다집니다.",
        icon: "fa-brands fa-java"
      },
      {
        name: "Python",
        desc: "컴퓨터 그래픽스, 인공지능 프레임워크 활용 및 데이터 사이언스 분석 모델 구축에 활용하고 있습니다.",
        icon: "fa-brands fa-python"
      },
      {
        name: "C",
        desc: "컴퓨터 구조, 운영체제 등 시스템 저수준을 다룬 경험이 있습니다.",
        icon: "fa-solid fa-microchip"
      },
      {
        name: "C++",
        desc: "코딩테스트 대응에 주력으로 사용 중입니다.",
        icon: "fa-solid fa-code"
      }
    ]
  },

  projects: {
    label: "Project Highlight",
    items: [
      { id: "linetracer", title: "마이크로프로세서응용 LineTracer", desc: "Ti-RSLK embedded C 코딩으로 트랙 완주", tag: "Embedded", icon: "fa-solid fa-microchip", image: "assets/images/linetracer.png" },
      { id: "interop", title: "컴퓨터네트워크 Interoperability Test", desc: "HTTP Server&Client Java로 구현 후 GET, POST", tag: "Network", icon: "fa-solid fa-network-wired", image: "assets/images/interop.png" },
      { id: "capstone", title: "졸업프로젝트 YachtDice", desc: "Yacht 주사위와 로그라이크 덱빌딩 요소를 결합한 게임 프로토타입", tag: "Gamedev", icon: "fa-solid fa-graduation-cap", image: "assets/images/capstone.png" },
      { id: "dutyflow", title: "KOSA 1차 프로젝트: HD_DutyFlow", desc: "현대백화점면세점 공항 인도장 픽업 예약관리 시스템", tag: "Backend", icon: "fa-solid fa-diagram-project", image: "assets/images/dutyflow.jpg" }
    ]
  },

  timeline: {
    heading: "경력 및 학력",
    subtext: "주요 이력을 확인하세요.",
    items: [
      {
        q: "2020.03 ~ 2026.02  |  학사 - 한양대학교 컴퓨터소프트웨어학부",
        a: "컴퓨터구조, 컴퓨터네트워크, 운영체제, 데이터베이스시스템, 인공지능 등 핵심 전공을 이수했습니다."
      },
      {
        q: "2020.08 ~ 2022.02  |  군 복무",
        a: "대한민국 육군에서 통신병으로 복무, 병장 만기제대했습니다."
      },
      {
        q: "2026.04 ~ 현재  |  KOSA MSA 기반 풀스택 양성과정",
        a: "한국소프트웨어산업협회(KOSA) 주관 교육과정 수강 중. Microservice Architecture(MSA) 이론, Java/Spring 기반 백엔드, 분산 환경 인프라 구축 등 엔터프라이즈급 실무 역량을 강화하고 있습니다."
      }
    ]
  },

  contact: {
    heading: "연락처",
    items: [
      { label: "Email", value: "cheolyongkim.kr@gmail.com", href: "mailto:cheolyongkim.kr@gmail.com" },
      { label: "Tel", value: "010-3533-2198", href: "tel:010-3533-2198" },
      { label: "GitHub", value: "github.com/CheolyongKim", href: "https://github.com/CheolyongKim" }
    ]
  },

  footer: {
    copy: "\u00A9 2026 Kim Cheolyong. All Rights Reserved."
  }
};

export default SITE_DATA;
