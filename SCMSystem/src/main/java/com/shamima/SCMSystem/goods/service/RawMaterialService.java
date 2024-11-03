package com.shamima.SCMSystem.goods.service;

import com.shamima.SCMSystem.goods.entity.RawMaterial;
import com.shamima.SCMSystem.goods.entity.RawMaterialSupplier;
import com.shamima.SCMSystem.goods.repository.RawMaterialRepository;
import com.shamima.SCMSystem.goods.repository.RawMaterialSupplierRepository;
import com.shamima.SCMSystem.util.ApiResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class RawMaterialService {

    @Autowired
    private RawMaterialRepository rawMaterialRepository;

    @Autowired
    private RawMaterialSupplierRepository rawMaterialSupplierRepository;

    @Value("src/main/resources/static/images")
    private String uploadDir;

    public ApiResponse getAllRawMaterials() {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            List<RawMaterial> rawMaterials = rawMaterialRepository.findAll();
            apiResponse.setSuccess(true);
            apiResponse.setData("rawMaterials", rawMaterials);
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

    @Transactional
    public ApiResponse saveRawMaterial(RawMaterial rm, MultipartFile imageFile) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            RawMaterialSupplier rawMaterialSupplier = rawMaterialSupplierRepository.findById(rm.getSupplier().getId()).orElse(null);
            if (rawMaterialSupplier == null) {
                apiResponse.setMessage("Supplier not found");
                return apiResponse;
            }

            if (imageFile != null && !imageFile.isEmpty()) {
                String imageFileName = saveImage(imageFile, rm);
                rm.setImage(imageFileName);
            }
            rm.setSupplier(rawMaterialSupplier);
            rawMaterialRepository.save(rm);

            apiResponse.setSuccess(true);
            apiResponse.setMessage("Raw Material saved successfully");
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

    public ApiResponse deleteRawMaterialById(long id) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            RawMaterial rawMaterial = rawMaterialRepository.findById(id).orElse(null);
            if (rawMaterial == null) {
                apiResponse.setMessage("Raw Material not found");
                return apiResponse;
            }
            rawMaterialRepository.deleteById(id);
            apiResponse.setSuccess(true);
            apiResponse.setMessage("Raw Material deleted successfully");
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

    public ApiResponse findRawMaterialById(long id) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            RawMaterial rawMaterial = rawMaterialRepository.findById(id).orElse(null);
            if (rawMaterial == null) {
                apiResponse.setMessage("Raw Material not found");
                return apiResponse;
            }
            apiResponse.setSuccess(true);
            apiResponse.setData("rawMaterial", rawMaterial);
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

    @Transactional
    public ApiResponse updateRawMaterial(RawMaterial updatedRM, MultipartFile imageFile) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            RawMaterial existingRM = rawMaterialRepository.findById(updatedRM.getId()).orElse(null);
            if (existingRM == null) {
                apiResponse.setMessage("Raw Material not found");
                return apiResponse;
            }

            RawMaterialSupplier rmSupplier = rawMaterialSupplierRepository.findById(updatedRM.getSupplier().getId()).orElse(null);
            if (rmSupplier == null) {
                apiResponse.setMessage("Supplier not found");
                return apiResponse;
            }

            // Update Raw Material details
            existingRM.setName(updatedRM.getName());
            existingRM.setPrice(updatedRM.getPrice());
            existingRM.setQuantity(updatedRM.getQuantity());
            existingRM.setUnit(updatedRM.getUnit());

            // Update Supplier
            existingRM.setSupplier(rmSupplier);

            // Update image if provided
            if (imageFile != null && !imageFile.isEmpty()) {
                String imageFilename = saveImage(imageFile, existingRM);
                existingRM.setImage(imageFilename);
            }

            rawMaterialRepository.save(existingRM);
            apiResponse.setSuccess(true);
            apiResponse.setMessage("Raw Material updated successfully");
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

    public ApiResponse findRawMaterialsBySupplierId(long supplierId) {
        ApiResponse apiResponse = new ApiResponse(false);
        try {
            List<RawMaterial> rawMaterials = rawMaterialRepository.findRawMaterialsBySupplierId(supplierId);
            apiResponse.setSuccess(true);
            apiResponse.setData("rawMaterials", rawMaterials);
        } catch (Exception e) {
            apiResponse.setMessage(e.getMessage());
        }
        return apiResponse;
    }

    private String saveImage(MultipartFile file, RawMaterial rm) throws IOException {
        Path uploadPath = Paths.get(uploadDir + "/rawmaterial");
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String originalFilename = file.getOriginalFilename();
        String fileExtension = originalFilename != null ?
                originalFilename.substring(originalFilename.lastIndexOf('.')) : "";

        // Generate a unique filename
        String filename = rm.getName() + "_" + UUID.randomUUID() + fileExtension;
        Path filePath = uploadPath.resolve(filename);

        // Save the file
        Files.copy(file.getInputStream(), filePath);

        return filename; // Return the filename for storing in the database
    }
}

