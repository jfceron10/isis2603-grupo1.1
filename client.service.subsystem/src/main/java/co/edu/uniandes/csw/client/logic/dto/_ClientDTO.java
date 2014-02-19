
package co.edu.uniandes.csw.client.logic.dto;


import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement 
public abstract class _ClientDTO {

	private Long id;
	private String name;
        private String lastname;
	private String cc;
        private String birthDate;

	public Long getId() {
		return id;
	}
 
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
 
	public void setName(String name) {
		this.name = name;
	}
        
        public String getLastName() {
		return lastname;
	}
 
	public void setLastName(String lastname) {
		this.lastname = lastname;
	}
        
	public String getCc() {
		return cc;
	}
 
	public void setCc(String cc) {
		this.cc = cc;
	}
              
        
        public String getBirthDate() {
		return birthDate;
	}
 
	public void setBirthDate(String birthdate) {
		this.birthDate = birthdate;
	}
	
}