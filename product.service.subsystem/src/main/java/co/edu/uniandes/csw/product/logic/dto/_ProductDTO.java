
package co.edu.uniandes.csw.product.logic.dto;


import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement 
public abstract class _ProductDTO {

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