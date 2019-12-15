function calculatePrice(bodyParts: BodyPartConstant[]): number {
  return bodyParts
    .map((a: BodyPartConstant) => {
      return BODYPART_COST[a];
    })
    .reduce((a, b) => {
      return a + b;
    });
}

class RoleDefinition {
  private name: string;
  private bodyParts: BodyPartConstant[];
  private price: number;

  constructor(name: string, bodyParts: BodyPartConstant[]) {
    this.name = name;
    this.bodyParts = bodyParts;
    this.price = calculatePrice(bodyParts);
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
  [Role.HARVESTER, new RoleDefinition('harvester', [WORK, MOVE, CARRY])]
]);
