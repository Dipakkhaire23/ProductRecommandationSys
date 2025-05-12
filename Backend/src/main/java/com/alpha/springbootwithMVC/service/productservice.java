package com.alpha.springbootwithMVC.service;

import com.alpha.springbootwithMVC.Repo.productrepo;
import com.alpha.springbootwithMVC.model.product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class productservice {

    @Autowired
    private productrepo productrepo;

    public List<product> getallproduct(){
        return productrepo.findAll();
    }

    public product getservice(int id) {
        return productrepo.findById(id).orElse(null);// new product()
    }

    public product addOrUpdateproduct(product product, MultipartFile image) throws IOException {
        product.setImagename(image.getOriginalFilename());
        product.setImagetype(image.getContentType());
        product.setImagtedata(image.getBytes());
         return  productrepo.save(product);
    }


    public product getbyid(int id) {
        return productrepo.findById(id).orElse(null);
    }

    public void delete(int id) {
        productrepo.deleteById(id);
    }

    public List<product> searchproduct(String keyword) {

        return productrepo.searchProducts(keyword);
    }

//    public product update(product pl, MultipartFile image) throws IOException {
//        pl.setImagename(image.getOriginalFilename());
//        pl.setImagetype(image.getContentType());
//        pl.setImagtedata(image.getBytes());
//        pl.setImagtedata(image.getBytes());
//         return  productrepo.save(pl);
//    }
}
