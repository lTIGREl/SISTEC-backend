import {Audit} from '../entities/audit/Audit';
import {myDataSource} from '../app-data-source';

class AuditService {
  async createAudit(audit: Audit): Promise<Audit | undefined> {
    const auditCreated = await myDataSource.getRepository(Audit).create(audit);
    const results = await myDataSource.getRepository(Audit).save(auditCreated);
    return results || undefined;
  }
}
export default AuditService;