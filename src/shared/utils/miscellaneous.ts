import path from "path"
import { fileURLToPath } from "url"

export const getDirname = (meta: ImportMeta) => {
  const __filename = fileURLToPath(meta.url)
  return path.dirname(__filename)
}
