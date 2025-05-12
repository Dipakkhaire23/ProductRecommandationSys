package com.alpha.springbootwithMVC;

import com.alpha.springbootwithMVC.Repo.productrepo;
import com.alpha.springbootwithMVC.model.product;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.FluentQuery;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.*;
import java.util.function.Function;


import static org.springframework.boot.SpringApplication.run;

@SpringBootApplication
public class SpringbootwithMvcApplication  {

	public static void main(String[] args) {




		  ApplicationContext context= SpringApplication.run(SpringbootwithMvcApplication.class, args);
		productrepo rp=  context.getBean(productrepo.class);
		product p=context.getBean(product.class);
//		p.getId()



//		product product1 = new product(1,
//				"Smartphone",
//				"Latest model with 5G support",
//				"BrandX",
//				new BigDecimal("799.99"),
//				"Electronics",
////                 new Date(), // current date
//				true,
//				50
//		);
//		rp.save(product1);





}}
