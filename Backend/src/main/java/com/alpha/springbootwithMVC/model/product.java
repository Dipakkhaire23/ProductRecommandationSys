package com.alpha.springbootwithMVC.model;

import jakarta.persistence.*;
//import lombok.*;
import lombok.*;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.sql.Date;

@Component
@Scope("prototype")
@Entity
@Setter
@Getter

@NoArgsConstructor
@AllArgsConstructor
public class product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String description;
    private  String brand;
    private BigDecimal price;
    private  String category;
    private Date releasedate;
    private  Boolean productavailable;
    private int Qantity;
    private String imagename;
    private String imagetype;
    @Lob
    private byte[] imagtedata;


//    public product() {
//    }
//
//    public product(int id, String smartphone, String description, String brandX, BigDecimal price, String electronics, Date date, boolean productavailable, int qantity) {
//    }
//
//    public int getId() {
//        return id;
//    }
//
//    public void setId(int id) {
//        this.id = id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getDescription() {
//        return description;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }
//
//    public BigDecimal getPrice() {
//        return price;
//    }
//
//    public void setPrice(BigDecimal price) {
//        this.price = price;
//    }
//
//    public String getBrand() {
//        return brand;
//    }
//
//    public void setBrand(String brand) {
//        this.brand = brand;
//    }
//
//    public String getCategory() {
//        return category;
//    }
//
//    public void setCategory(String category) {
//        this.category = category;
//    }
//
//    public Date getReleasedate() {
//        return releasedate;
//    }
//
//    public void setReleasedate(Date releasedate) {
//        this.releasedate = releasedate;
//    }
//
//    public Boolean getProductavailable() {
//        return productavailable;
//    }
//
//    public void setProductavailable(Boolean productavailable) {
//        this.productavailable = productavailable;
//    }
//
//    public int getQantity() {
//        return Qantity;
//    }
//
//    public void setQantity(int qantity) {
//        Qantity = qantity;
//    }
//
//    public product(int id, String name, String description, String brand, BigDecimal price, String category, Date releasedate, Boolean productavailable, int qantity) {
//        this.id = id;
//        this.name = name;
//        this.description = description;
//        this.brand = brand;
//        this.price = price;
//        this.category = category;
//        this.releasedate = releasedate;
//        this.productavailable = productavailable;
//        Qantity = qantity;
//    }
//
//    public String getImagename() {
//        return imagename;
//    }
//
//    public void setImagename(String imagename) {
//        this.imagename = imagename;
//    }
//
//    public String getImagetype() {
//        return imagetype;
//    }
//
//    public void setImagetype(String imagetype) {
//        this.imagetype = imagetype;
//    }
//
//    public byte[] getImagtedata() {
//        return imagtedata;
//    }
//
//    public void setImagtedata(byte[] imagtedata) {
//        this.imagtedata = imagtedata;
//    }
}
