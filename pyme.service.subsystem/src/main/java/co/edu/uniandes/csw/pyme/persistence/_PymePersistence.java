
package co.edu.uniandes.csw.pyme.persistence;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import co.edu.uniandes.csw.pyme.logic.dto.PymeDTO;
import co.edu.uniandes.csw.pyme.persistence.api._IPymePersistence;
import co.edu.uniandes.csw.pyme.persistence.converter.PymeConverter;
import co.edu.uniandes.csw.pyme.persistence.entity.PymeEntity;
import java.awt.BorderLayout;

public abstract class _PymePersistence implements _IPymePersistence {

	@PersistenceContext(unitName="PymePU")
	protected EntityManager entityManager;
	
	public PymeDTO createPyme(PymeDTO pyme) {
		PymeEntity entity=PymeConverter.persistenceDTO2Entity(pyme);
		entityManager.persist(entity);
		return PymeConverter.entity2PersistenceDTO(entity);
	}

	@SuppressWarnings("unchecked")
	public List<PymeDTO> getPymes() {
		Query q = entityManager.createQuery("select u from PymeEntity u");
		return PymeConverter.entity2PersistenceDTOList(q.getResultList());
	}

	public PymeDTO getPyme(Long id) {
		return PymeConverter.entity2PersistenceDTO(entityManager.find(PymeEntity.class, id));
	}

	public void deletePyme(Long id) {
		PymeEntity entity=entityManager.find(PymeEntity.class, id);
		entityManager.remove(entity);
	}

	public void updatePyme(PymeDTO detail) {
		PymeEntity entity=entityManager.merge(PymeConverter.persistenceDTO2Entity(detail));
		PymeConverter.entity2PersistenceDTO(entity);
	}
        
        public List<PymeDTO> searchPyme(String descr) {
        
        descr = descr.split("\"description\":\"")[1];
        descr = descr.split("\"")[0];
        System.out.println("Param: " + descr);
        Query q = entityManager.createQuery("select u from PymeEntity u where u.name like '%" + descr + "%'");
        
        List list = q.getResultList();
        if (list.size() != 0) {
            return PymeConverter.entity2PersistenceDTOList(list);
        }
        return null;
    }

}