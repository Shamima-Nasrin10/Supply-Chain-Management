package com.shamima.SCMSystem.location.service;

import com.shamima.SCMSystem.location.entity.Country;
import com.shamima.SCMSystem.location.repository.CountryRepository;
import com.shamima.SCMSystem.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService {

    @Autowired
    private CountryRepository countryRepository;

    public ApiResponse getAllCountries() {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            List<Country> countries = countryRepository.findAll();
            apiResponse.setSuccess(true);
            apiResponse.setData("countries", countries);
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }


    public ApiResponse saveCountry(Country country) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            countryRepository.save(country);
            apiResponse.setSuccess(true);
            apiResponse.setMessage("Country saved successfully");
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }


    public ApiResponse updateCountry(Country country) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            Country existingCountry = countryRepository.findById(country.getId()).orElse(null);
            if (existingCountry == null) {
                apiResponse.setMessage("Country not found");
                return apiResponse;
            }
            countryRepository.save(country);
            apiResponse.setSuccess(true);
            apiResponse.setMessage("Country updated successfully");
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }


    public ApiResponse deleteCountry(Long id) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            Country country = countryRepository.findById(id).orElse(null);
            if (country == null) {
                apiResponse.setMessage("Country not found");
                return apiResponse;
            }
            countryRepository.deleteById(id);
            apiResponse.setSuccess(true);
            apiResponse.setMessage("Country deleted successfully");
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }


    public ApiResponse getCountryById(Long id) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            Country country = countryRepository.findById(id).orElse(null);
            if (country == null) {
                apiResponse.setMessage("Country not found");
                return apiResponse;
            }
            apiResponse.setSuccess(true);
            apiResponse.setData("country", country);
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }
}
