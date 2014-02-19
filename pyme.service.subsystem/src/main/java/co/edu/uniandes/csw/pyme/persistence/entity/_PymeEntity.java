
package co.edu.uniandes.csw.pyme.persistence.entity;

import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class _PymeEntity {

	private String name;
	@Id
	@GeneratedValue(generator = "Pyme")
	private Long id;
	private String description;
        private String address;
        private String telephone;

	public String getName() {
		return name;
	}
 
	public void setName(String name) {
		this.name = name;
	}
	public Long getId() {
		return id;
	}
 
	public void setId(Long id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
 
	public void setDescription(String description) {
		this.description = description;
	}
        
        public String getAddress() {
		return address;
	}
 
	public void setAddress(String address) {
		this.address = address;
	}
        
        public String getTelephone() {
		return telephone;
	}
 
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
}