package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuración de CORS (Cross-Origin Resource Sharing) para la API.
 * Permite que el frontend (ejecutándose en http://localhost:5173) acceda a los recursos de la API.
 */
@Configuration
public class CorsConfig {

    /**
     * Crea y configura un bean WebMvcConfigurer para manejar CORS.
     *
     * @return WebMvcConfigurer configurado para permitir solicitudes CORS desde el origen especificado.
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            /**
             * Sobreescribe el método addCorsMappings para definir las reglas de CORS.
             * @param registry CorsRegistry utilizado para registrar las configuraciones de CORS.
             */
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Configura CORS para todas las rutas que comienzan con /api/.
                registry.addMapping("/api/**")
                        // Permite solicitudes desde el origen http://localhost:5173.
                        .allowedOrigins("http://localhost:5173")
                        // Permite todos los métodos HTTP (GET, POST, PUT, DELETE, etc.).
                        .allowedMethods("*")
                        // Permite todos los headers en las solicitudes.
                        .allowedHeaders("*")
                        // Permite el envío de cookies y credenciales.
                        .allowCredentials(true);
            }
        };
    }
}