package com.sabit.nexchain.restcontroller;


import com.sabit.nexchain.model.Procurement;
import com.sabit.nexchain.repository.ProcurementRepository;
import com.sabit.nexchain.repository.RawMaterialRepository;
import com.sabit.nexchain.repository.SupplierRepository;
import com.sabit.nexchain.service.ProcurementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/procurements")
public class ProcurementRestController {

    @Autowired
    private ProcurementRepository procurementRepository;

    @Autowired
    private ProcurementService procurementService;

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private RawMaterialRepository rawMaterialRepository;


    @GetMapping
    public ResponseEntity<List<Procurement>> getAllProcurements(){
        List<Procurement> procurements=procurementRepository.findAll();
        return ResponseEntity.ok(procurements);
    }


    @PostMapping
    public ResponseEntity<Procurement> saveProcurement(@RequestBody Procurement procurement){
        Procurement saveProcurement=procurementRepository.save(procurement);
        return ResponseEntity.status(HttpStatus.CREATED).body(saveProcurement);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Procurement> updateProcurement(@PathVariable Long id, @RequestBody Procurement procurement){
        procurement.setId(id);
        Procurement updateProcurement = procurementRepository.save(procurement);
        return ResponseEntity.ok(updateProcurement);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProcurement(@PathVariable Long id){
        procurementRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("{id}")
    public ResponseEntity<Procurement> showProcurementById(@PathVariable("id") Long procurementId){
        Procurement procurement=procurementService.getProcurementById(procurementId);

        if (procurement!=null){
            return ResponseEntity.ok(procurement);
        }

        return ResponseEntity.notFound().build();

    }
}
