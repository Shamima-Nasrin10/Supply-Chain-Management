package com.sabit.nexchain.repository;

import com.sabit.nexchain.model.RawMaterial;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RawMaterialRepository extends JpaRepository<RawMaterial, Long> {

    RawMaterial findByMaterialName(String materialName);
}
