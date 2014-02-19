
package co.edu.uniandes.csw.product.persistence.entity;

import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class _ProductEntity {

	@Id
	@GeneratedValue(generator = "Product")
	private Long id;
	private String name;
	private Long valor;
        private String brand;
        private String buyDate;

	public Long getId(){
		return id;
	}
	
	public void setId(Long id){
		this.id = id;
	}
	public String getName(){
		return name;
	}
	
	public void setName(String name){
		this.name = name;
	}
	public Long getValue(){
		return valor;
	}
	
	public void setValue(Long value){
		this.valor = value;
	}
        
        public String getBrand(){
		return brand;
	}
	
	public void setBrand(String brand){
		this.brand = brand;
	}
        
        public String getBuyDate(){
		return buyDate;
	}
	
	public void setBuyDate(String buyDate){
		this.buyDate = buyDate;
	}
}