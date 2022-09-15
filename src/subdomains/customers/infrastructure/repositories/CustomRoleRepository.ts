import { client } from "../../../../shared/infrastructure/database/postgres";
import { RoleType } from "../../../../shared/types";
import { RoleRepository } from "./RoleRepository";

export class CustomRoleRepository implements RoleRepository {
  async getRoleById(roleId: number): Promise<RoleType> {
    const query = `SELECT * FROM roles WHERE role_id = '${roleId}';`
    const result = await client.query(query)
    // criar mapper aqui
    return {
      id: result.rows[0].role_id,
      description: result.rows[0].description,
    }
  }
  exists(_roleId: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  save(_role: RoleType): Promise<void> {
    throw new Error("Method not implemented.");
  }
  remove(_roleId: number): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}