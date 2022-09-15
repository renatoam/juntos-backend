import { RoleType } from "../../../../shared/types"

// deixar o Repository base mais genérico, pra poder usar com qualquer interface
// aqui, não pude usar porque os tipos dos args eram diferentes
export interface RoleRepository {
  exists(roleId: number): Promise<boolean>
  save(role: RoleType): Promise<void>
  remove(roleId: number): Promise<boolean>
  getRoleById(roleId: number): Promise<RoleType>
}