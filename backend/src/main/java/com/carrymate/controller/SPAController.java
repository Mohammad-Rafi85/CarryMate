package com.carrymate.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Custom error controller that redirects all 404 errors to index.html
 * This allows React Router to handle the URL correctly on page refresh.
 */
@Controller
public class SPAController implements ErrorController {

    @RequestMapping("/error")
    public String handleError() {
        // This will forward to the root / which serves index.html
        // The React Router will then see the original URL in the browser and route correctly.
        return "forward:/";
    }
}
