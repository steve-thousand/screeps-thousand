function calculatePrice(bodyParts: BodyPartConstant[]): number {
  return bodyParts
    .map((a: BodyPartConstant) => {
      return BODYPART_COST[a];
    })
    .reduce((a, b) => {
      return a + b;
    });
}

export class RoleDefinition {
  private role: Role;
  private name: string;
  private bodyParts: BodyPartConstant[];
  private price: number;

  constructor(role: Role, name: string, bodyParts: BodyPartConstant[]) {
    this.role = role;
    this.name = name;
    this.bodyParts = bodyParts;
    this.price = calculatePrice(bodyParts);
  }

  getRole() {
    return this.role;
  }

  getName() {
    return this.name;
  }

  getBodyParts(): BodyPartConstant[] {
    return this.bodyParts;
  }

  getPrice() {
    return this.price;
  }

  static calculatePrice(roleDefinition: RoleDefinition): number {
    return roleDefinition.bodyParts
      .map((a: BodyPartConstant) => {
        return BODYPART_COST[a];
      })
      .reduce((a, b) => {
        return a + b;
      });
  }
}

export enum Role {
  HARVESTER,
  UPGRADER,
  BUILDER
}

export const RoleDefinitions = new Map<Role, RoleDefinition>([
  [
    Role.HARVESTER,
    new RoleDefinition(Role.HARVESTER, 'harvester', [WORK, MOVE, CARRY])
  ],
  [Role.UPGRADER, new RoleDefinition(Role.UPGRADER, 'upgrader', [MOVE, CLAIM])],
  [
    Role.BUILDER,
    new RoleDefinition(Role.BUILDER, 'builder', [MOVE, WORK, CARRY])
  ]
]);
