package com.carrymate.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.lang.Nullable;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

/**
 * Handles Single Page Application (SPA) routing for the React frontend.
 * This configuration redirects any unknown paths (which are likely handled by React Router) 
 * back to the base index.html file.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, @Nullable Resource location) throws IOException {
                        if (location == null) {
                            return null;
                        }
                        
                        // We do NOT redirect API calls or common file extensions to index.html
                        if (resourcePath.startsWith("api") || resourcePath.contains(".")) {
                            return location.createRelative(resourcePath);
                        }

                        Resource requestedResource = location.createRelative(resourcePath);
                        if (requestedResource.exists() && requestedResource.isReadable()) {
                            return requestedResource;
                        } else {
                            // This is the key: if the resource does not exist (like /dashboard), 
                            // we return the index.html so React Router takes over.
                            return new ClassPathResource("/static/index.html");
                        }
                    }
                });
    }
}
