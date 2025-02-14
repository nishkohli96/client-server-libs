import {
  validate as uuidValidate,
  version as uuidVersion
} from 'uuid';

/**
 * Sequelize's isUUID validator does not support UUID v6 natively.
 * The isUUID validator only supports v1, v3, v4, and v5.
 * Eg: validate: { isUUID: 4 }
 */
export function isUUIDv6(value: string, version: number = 6) {
  return uuidValidate(value) && uuidVersion(value) === version;
}
