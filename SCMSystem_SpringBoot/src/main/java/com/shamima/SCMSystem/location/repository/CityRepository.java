package com.shamima.SCMSystem.location.repository;
import com.shamima.SCMSystem.location.entity.City;
import com.shamima.SCMSystem.location.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CityRepository extends JpaRepository<City, Long> {

}
