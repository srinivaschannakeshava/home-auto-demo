package in.srini91.home.auto;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@EnableWebSecurity
public class HomeAutoApplication {

	public static void main(String[] args) {
		SpringApplication.run(HomeAutoApplication.class, args);
	}

}
