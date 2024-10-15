package com.tushar.SpringEcom.repo;

import com.tushar.SpringEcom.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product ,Integer> {

}
