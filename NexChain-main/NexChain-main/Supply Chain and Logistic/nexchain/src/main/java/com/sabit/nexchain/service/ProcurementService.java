package com.sabit.nexchain.service;


import com.sabit.nexchain.model.Procurement;
import com.sabit.nexchain.repository.ProcurementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProcurementService {

    @Autowired
    private ProcurementRepository procurementRepository;

    public Procurement getProcurementById(Long id){
        return procurementRepository.findById(id).orElse(null);
    }

}
