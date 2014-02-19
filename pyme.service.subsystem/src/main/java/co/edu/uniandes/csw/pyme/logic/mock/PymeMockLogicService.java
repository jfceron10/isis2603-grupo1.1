
package co.edu.uniandes.csw.pyme.logic.mock;
import javax.enterprise.inject.Alternative;
import javax.inject.Singleton;

import co.edu.uniandes.csw.pyme.logic.api.IPymeLogicService;
import co.edu.uniandes.csw.pyme.logic.dto.PymeDTO;
import java.util.List;

@Alternative
@Singleton
public class PymeMockLogicService extends _PymeMockLogicService implements IPymeLogicService {
	
}