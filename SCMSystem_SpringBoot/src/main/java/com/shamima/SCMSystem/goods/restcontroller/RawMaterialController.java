package com.shamima.SCMSystem.goods.restcontroller;

import com.shamima.SCMSystem.goods.entity.RawMaterial;
import com.shamima.SCMSystem.goods.service.RawMaterialService;
import com.shamima.SCMSystem.util.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/rawmaterial")
public class RawMaterialController {

    @Autowired
    private RawMaterialService rawMaterialService;

    @PostMapping(value = "/save", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_OCTET_STREAM_VALUE })
    public ApiResponse save(@RequestPart RawMaterial rawMaterial,
                            @RequestPart(required = false) MultipartFile imageFile) {
        return rawMaterialService.saveRawMaterial(rawMaterial, imageFile);
    }

    @GetMapping("/list")
    public ApiResponse getRawMaterials() {
        return rawMaterialService.getAllRawMaterials();
    }

    @PutMapping("/update")
    public ApiResponse updateRawMaterial(@RequestPart RawMaterial rawMaterial,
                                         @RequestPart(required = false) MultipartFile imageFile) {
        return rawMaterialService.updateRawMaterial(rawMaterial, imageFile);
    }

    @GetMapping("/{id}")
    public ApiResponse findRawMaterialById(@PathVariable long id) {
        return rawMaterialService.findRawMaterialById(id);
    }
    

    @DeleteMapping("/delete/{id}")
    public ApiResponse deleteRawMaterialById(@PathVariable long id) {
        return rawMaterialService.deleteRawMaterialById(id);
    }
}

