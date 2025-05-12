package com.alpha.springbootwithMVC.controller;

import com.alpha.springbootwithMVC.model.product;
import com.alpha.springbootwithMVC.service.productservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController

@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class productcontroller {

    @Autowired
    private productservice productservice;

    @GetMapping(value = "/products")
    public ResponseEntity<List<product>> product() {


        return new ResponseEntity<>(productservice.getallproduct(), HttpStatus.CREATED);
    }

    @GetMapping("product/{id}")
    public ResponseEntity<product> getproduct(@PathVariable("id") int id) {
        product pl = productservice.getservice(id);

        if (pl != null) {
            return new ResponseEntity<>(pl, HttpStatus.ACCEPTED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping("/product")
    public ResponseEntity<?> addproduct(@RequestPart product product, @RequestPart MultipartFile imageFile) {
        product savepr = null;
        try {
            savepr = productservice.addOrUpdateproduct(product, imageFile);
            return new ResponseEntity<>(savepr, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    @GetMapping("product/{id}/image")
    public ResponseEntity<byte[]> getbyid(@PathVariable int id) {
        product pl = productservice.getbyid(id);
        if (pl.getId() > 0) {
            return new ResponseEntity(pl.getImagtedata(), HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }


    }

    @PutMapping("/product/{id}")
    public ResponseEntity<String> update(@PathVariable int id, @RequestPart product product, @RequestPart MultipartFile imageFile) {
        product updatedproduct = null;
        try {
            updatedproduct = productservice.addOrUpdateproduct(product, imageFile);
            return new ResponseEntity<>("updated", HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_GATEWAY);
        }


    }

    @DeleteMapping("product/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        productservice.delete(id);
        return new ResponseEntity<>("deleted", HttpStatus.OK);

    }

    @GetMapping("products/search")
    public ResponseEntity<List<product>>  search(@RequestParam String keyword){
        List<product> pl=productservice.searchproduct(keyword);
        System.out.println(keyword);
        return new ResponseEntity<>(pl,HttpStatus.OK);


    }
}

