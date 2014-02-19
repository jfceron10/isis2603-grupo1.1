
package co.edu.uniandes.csw.pyme.persistence;

import co.edu.uniandes.csw.pyme.logic.dto.PymeDTO;
import javax.ejb.Stateless;
import javax.enterprise.inject.Default;

import co.edu.uniandes.csw.pyme.persistence.api.IPymePersistence;
import co.edu.uniandes.csw.pyme.persistence.converter.PymeConverter;
import java.util.List;
import javax.ejb.LocalBean;
import javax.persistence.Query;

@Default
@Stateless 
@LocalBean
public class PymePersistence extends _PymePersistence  implements IPymePersistence {
    
    

}