package kr.or.kosa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@org.mybatis.spring.annotation.MapperScan("kr.or.kosa.mapper")
public class Kosa3SecurityJwt1Application {

	public static void main(String[] args) {
		SpringApplication.run(Kosa3SecurityJwt1Application.class, args);
	}

}
