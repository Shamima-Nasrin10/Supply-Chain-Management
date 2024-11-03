package com.shamima.SCMSystem.location.restcontroller;

import com.shamima.SCMSystem.location.entity.Country;
import com.shamima.SCMSystem.location.service.CountryService;
import com.shamima.SCMSystem.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/country")
public class CountryController {

    @Autowired
    private CountryService countryService;
    @GetMapping("/list")
    public ApiResponse getAllCountries() {
        return countryService.getAllCountries();
    }

    @GetMapping("/{id}")
    public ApiResponse getCountryById(@PathVariable long id) {
        return countryService.getCountryById(id);
    }


    @PostMapping("/save")
    public ApiResponse saveCountry(@RequestBody Country country) {
        return countryService.saveCountry(country);
    }

    @PutMapping("/update")
    public ApiResponse updateCountry(@RequestBody Country country) {
        return countryService.updateCountry(country);
    }


    @DeleteMapping("/delete/{id}")
    public ApiResponse deleteCountry(@PathVariable long id) {
        return countryService.deleteCountry(id);
    }

}
