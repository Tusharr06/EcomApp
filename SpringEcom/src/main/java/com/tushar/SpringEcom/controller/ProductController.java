package com.tushar.SpringEcom.controller;

import com.tushar.SpringEcom.model.Product;
import com.tushar.SpringEcom.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService productservice;

    @GetMapping("/products")
    public List<Product> getProducts()
    {
       return productservice.getAllProducts();

    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProductsbyid(@PathVariable int id)
    {
        Product product = productservice.getProductByid(id);
        if(product != null)
        {
            return new ResponseEntity<>(product, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
    @PostMapping("/product")
    public ResponseEntity<?> addProduct(@RequestPart Product product, @RequestPart MultipartFile imageFile) throws IOException {

        Product save = productservice.addProduct(product,imageFile);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/product/{id}/image")
            public ResponseEntity<byte[]> image(@PathVariable int id)
    {
        Product product = productservice.getProductByid(id);
        return new ResponseEntity<>(product.getImageData(),HttpStatus.OK);

    }
    @PutMapping("/product/{id}")
    public ResponseEntity<?>updateproduct(@RequestPart Product product, @RequestPart MultipartFile imageFile) throws IOException {

        Product update = productservice.updateProduct(product,imageFile);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/product/{id}")
      public ResponseEntity<?> delete(@PathVariable int id)

    {
      productservice.deletebyid(id);
      return new ResponseEntity(HttpStatus.OK);
    }

}
