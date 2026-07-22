package kr.or.kosa.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//**** POSTMAM 테스트 CORS 문제 발생하지 않아요  *****
//react , vue  frontServer 
//react : localhost:5000   ,  web (boot) : localhost:8090
@Configuration
public class WebConfig {

  @Bean
  public WebMvcConfigurer corsConfigurer() {
      return new WebMvcConfigurer() {
          @Override
          public void addCorsMappings(CorsRegistry registry) {
              registry.addMapping("/**") // 모든 경로에 대해 CORS 적용
                      .allowedOrigins("http://localhost:5173") // React 개발 서버 주소
                      .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                      .allowedHeaders("*") // 모든 헤더 허용
                      .exposedHeaders("Authorization") // 클라이언트가 읽을 수 있게 함
                      .allowCredentials(true); // 쿠키/헤더 인증정보 허용
          }
      };
  }
}

/*
이 설정은 React(프론트엔드)와 Spring Boot(백엔드)가 서로 다른 서버에서 실행될 때 발생하는 CORS 문제를 해결하기 위한 설정입니다.
*/