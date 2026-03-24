package com.carrymate.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Controller to handle SPA (Single Page Application) routing.
 * Any request that is not an API call and not a file request (no dot in the path)
 * will be forwarded to index.html so that React Router can handle it.
 */
@Controller
public class SPAController {

    @RequestMapping(value = {
        "/",
        "/{path:[^\\.]*}",
        "/**/{path:[^\\.]*}"
    })
    public String forward() {
        return "forward:/index.html";
    }
}
