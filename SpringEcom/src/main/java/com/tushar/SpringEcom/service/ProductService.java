package com.tushar.SpringEcom.service;

import com.tushar.SpringEcom.model.Product;
import com.tushar.SpringEcom.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {
@Autowired
private ProductRepo productRepo;
    public List<Product> getAllProducts() {

        return productRepo.findAll();
    }
    public  Product getProductByid(int id)
    {
        return productRepo.findById(id).get();
     }

    public Product addProduct(Product product, MultipartFile image) throws IOException {

        product.setImageName(image.getOriginalFilename());
        product.setImageType(image.getContentType());
        product.setImageData(image.getBytes());
        return productRepo.save(product);

    }
}
